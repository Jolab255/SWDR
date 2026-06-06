<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/config.php';

// Get posted data
$data = json_decode(file_get_contents("php://input"));

if (
    empty($data->amount) ||
    empty($data->currency) ||
    empty($data->phone) ||
    empty($data->name) ||
    empty($data->email) ||
    empty($data->paymentMethod)
) {
    http_response_code(400);
    echo json_encode(array("status" => "ERROR", "message" => "Incomplete donation data."));
    exit;
}

$db = init_database();
$reference = 'SWDR-' . strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 9));

$amount = (int)$data->amount;
$currency = $data->currency;
$phone = $data->phone;
$name = $data->name;
$email = $data->email;
$paymentMethod = $data->paymentMethod;
$carrier = isset($data->mobileCarrier) ? $data->mobileCarrier : '';

$success = false;
$paymentUrl = '';
$selcomRef = '';

// If real credentials are set, execute cURL request to Selcom
if (SELCOM_API_KEY !== 'sandbox-api-key' && SELCOM_API_SECRET !== 'sandbox-api-secret') {
    $timestamp = gmdate('Y-m-d\TH:i:s\Z');
    
    // Build Selcom payload matching their create order API specs
    $payload = array(
        "vendor" => SELCOM_API_KEY,
        "order_id" => $reference,
        "amount" => $amount,
        "currency" => $currency,
        "buyer_name" => $name,
        "buyer_phone" => $phone,
        "buyer_email" => $email,
        "payment_methods" => $paymentMethod === 'card' ? 'CARD' : 'MOBILE',
        "redirect_url" => "https://" . $_SERVER['HTTP_HOST'] . "/about", 
        "webhook_url" => "https://" . $_SERVER['HTTP_HOST'] . "/api/webhook.php"
    );
    
    $jsonData = json_encode($payload);
    
    // Generate HMAC-SHA256 signature digest
    $signatureString = "timestamp={$timestamp}&apiKey=" . SELCOM_API_KEY . "&body={$jsonData}";
    $signature = base64_encode(hash_hmac('sha256', $signatureString, SELCOM_API_SECRET));
    
    $ch = curl_init(SELCOM_BASE_URL . "checkout/create-order");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Authorization: Selcom ' . $signature,
        'Timestamp: ' . $timestamp,
        'API-Key: ' . SELCOM_API_KEY
    ));
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200 && $response) {
        $resObj = json_decode($response);
        if (isset($resObj->result) && $resObj->result === 'SUCCESS') {
            $success = true;
            $selcomRef = isset($resObj->reference) ? $resObj->reference : '';
            if (isset($resObj->payment_url)) {
                $paymentUrl = $resObj->payment_url;
            }
        }
    }
} else {
    // Sandbox / Mock simulation mode
    $success = true;
    $selcomRef = 'SEL-' . rand(100000, 999999);
    if ($paymentMethod === 'card') {
        $paymentUrl = "https://" . $_SERVER['HTTP_HOST'] . "/card-pay-simulated?ref=" . $reference;
    }
}

if ($success) {
    if ($db) {
        try {
            $stmt = $db->prepare("INSERT INTO transactions (reference, amount, currency, buyer_name, buyer_phone, buyer_email, status, payment_method) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$reference, $amount, $currency, $name, $phone, $email, 'PENDING', $paymentMethod]);
        } catch (PDOException $e) {
            error_log("Failed to insert transaction: " . $e->getMessage());
        }
    }
    
    http_response_code(200);
    echo json_encode(array(
        "status" => "SUCCESS",
        "reference" => $reference,
        "selcom_ref" => $selcomRef,
        "payment_url" => $paymentUrl,
        "message" => "Payment order created successfully."
    ));
} else {
    http_response_code(500);
    echo json_encode(array("status" => "ERROR", "message" => "Failed to create order on Selcom gateway. Check API logs."));
}
