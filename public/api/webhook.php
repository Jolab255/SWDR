<?php
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . '/config.php';

// Get webhook content
$payload = file_get_contents("php://input");
$headers = getallheaders();

// Log webhook payload for audit and debug purposes
file_put_contents(__DIR__ . '/webhook_log.json', $payload . PHP_EOL, FILE_APPEND);

$data = json_decode($payload);

if (!$data || empty($data->order_id) || empty($data->status)) {
    http_response_code(400);
    echo json_encode(array("status" => "ERROR", "message" => "Invalid webhook payload."));
    exit;
}

$orderId = $data->order_id;
$status = strtoupper($data->status); // SUCCESS / FAILED

$db = init_database();
if ($db) {
    try {
        $stmt = $db->prepare("UPDATE transactions SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE reference = ?");
        $stmt->execute([$status, $orderId]);
        
        http_response_code(200);
        echo json_encode(array("status" => "SUCCESS", "message" => "Transaction status updated."));
        exit;
    } catch (PDOException $e) {
        error_log("Webhook database update failed: " . $e->getMessage());
    }
}

http_response_code(500);
echo json_encode(array("status" => "ERROR", "message" => "Internal database update error."));
