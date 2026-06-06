<?php
// Prevent direct access
if (basename($_SERVER['PHP_SELF']) == 'config.php') {
    header('HTTP/1.0 403 Forbidden');
    exit;
}

// Enable errors in development, disable in production
define('ENV_MODE', 'sandbox'); // Set to 'live' for production
if (ENV_MODE === 'sandbox') {
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
} else {
    ini_set('display_errors', 0);
}

// Selcom API Keys (Replace with your actual merchant keys)
define('SELCOM_API_KEY', 'sandbox-api-key');
define('SELCOM_API_SECRET', 'sandbox-api-secret');
define('SELCOM_BASE_URL', ENV_MODE === 'live' ? 'https://api.selcom.co.tz/v1/' : 'https://sandbox.selcom.co.tz/v1/');

// Webhook Config
define('WEBHOOK_SECRET', 'your-webhook-secret-token');

// Database Configuration (SQLite)
define('DB_FILE', __DIR__ . '/../data/transactions.db');

// Autocreate transactions table if SQLite is available
function init_database() {
    $dbDir = dirname(DB_FILE);
    if (!file_exists($dbDir)) {
        mkdir($dbDir, 0755, true);
    }
    
    try {
        $db = new PDO('sqlite:' . DB_FILE);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $db->exec("CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            reference TEXT UNIQUE,
            amount INTEGER,
            currency TEXT,
            buyer_name TEXT,
            buyer_phone TEXT,
            buyer_email TEXT,
            status TEXT,
            payment_method TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )");
        return $db;
    } catch (PDOException $e) {
        error_log("Database initialization failed: " . $e->getMessage());
        return null;
    }
}
