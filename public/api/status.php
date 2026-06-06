<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

require_once __DIR__ . '/config.php';

if (empty($_GET['ref'])) {
    http_response_code(400);
    echo json_encode(array("status" => "ERROR", "message" => "Missing transaction reference parameter."));
    exit;
}

$reference = $_GET['ref'];
$db = init_database();

if ($db) {
    try {
        $stmt = $db->prepare("SELECT status, amount, currency, created_at FROM transactions WHERE reference = ?");
        $stmt->execute([$reference]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($row) {
            $status = $row['status'];
            
            // For Sandbox simulation mode, automatically approve the order after 10 seconds
            if (ENV_MODE === 'sandbox' && $status === 'PENDING') {
                $createdAt = strtotime($row['created_at']);
                if (time() - $createdAt > 10) { 
                    $status = 'SUCCESS';
                    $upd = $db->prepare("UPDATE transactions SET status = 'SUCCESS', updated_at = CURRENT_TIMESTAMP WHERE reference = ?");
                    $upd->execute([$reference]);
                }
            }
            
            http_response_code(200);
            echo json_encode(array(
                "status" => "SUCCESS",
                "reference" => $reference,
                "payment_status" => $status
            ));
            exit;
        } else {
            http_response_code(404);
            echo json_encode(array("status" => "ERROR", "message" => "Transaction reference not found."));
            exit;
        }
    } catch (PDOException $e) {
        error_log("Status database fetch failed: " . $e->getMessage());
    }
}

http_response_code(500);
echo json_encode(array("status" => "ERROR", "message" => "Database connection unavailable."));
