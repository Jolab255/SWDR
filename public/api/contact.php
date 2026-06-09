<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "ERROR", "message" => "Method not allowed"]);
    exit;
}

$raw_input = file_get_contents("php://input");
$input = json_decode($raw_input, true);

if (!$input) {
    http_response_code(400);
    echo json_encode(["status" => "ERROR", "message" => "Invalid JSON payload"]);
    exit;
}

$name = isset($input['name']) ? strip_tags(trim($input['name'])) : '';
$email = isset($input['email']) ? filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL) : '';
$subject_key = isset($input['subject']) ? strip_tags(trim($input['subject'])) : 'general';
$message = isset($input['message']) ? htmlspecialchars(trim($input['message'])) : '';

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(["status" => "ERROR", "message" => "Please fill in all required fields"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "ERROR", "message" => "Invalid email address"]);
    exit;
}

// Map subject keys to clean labels
$subjects = [
    "general" => "General NGO Inquiry",
    "volunteer" => "Volunteer Practitioner Registration",
    "partnership" => "Corporate Sponsorship / Partnerships",
    "donation" => "Donation Receipt / Selcom Issue"
];
$subject_label = isset($subjects[$subject_key]) ? $subjects[$subject_key] : "General Inquiry";

// Recipient email
$to = "donations@smilewithdrrome.org";
$email_subject = "SWDR Contact Form: " . $subject_label . " from " . $name;

// Build the beautiful HTML email template
$html_message = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>' . htmlspecialchars($email_subject) . '</title>
</head>
<body style="font-family: \'Inter\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 40px 20px; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); border-top: 6px solid #be185d;">
        <!-- Header with logo -->
        <div style="background-color: #ffffff; padding: 30px; text-align: center; border-bottom: 1px solid #f1f5f9;">
            <a href="https://smilewithdrrome.org" target="_blank" style="text-decoration: none;">
                <img src="https://smilewithdrrome.org/logo.png" alt="Smile with Doctor Rome Clinic Logo" style="max-height: 80px; width: auto; display: inline-block; border: none; outline: none;" />
            </a>
        </div>
        
        <!-- Content Area -->
        <div style="padding: 40px 30px; color: #334155; line-height: 1.6;">
            <h2 style="margin-top: 0; margin-bottom: 20px; font-family: \'Outfit\', Arial, sans-serif; font-size: 20px; font-weight: 800; color: #1e293b; text-transform: uppercase; letter-spacing: -0.5px; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">
                New Website Inquiry
            </h2>
            
            <p style="font-size: 15px; color: #64748b; margin-bottom: 25px;">
                You have received a new message from the contact form on the <strong>Smile with Doctor Rome</strong> website. Details are listed below:
            </p>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 14px;">
                <tr>
                    <td style="padding: 10px 0; font-weight: 700; color: #475569; width: 120px; border-bottom: 1px solid #f1f5f9; vertical-align: top;">Name:</td>
                    <td style="padding: 10px 0; color: #1e293b; border-bottom: 1px solid #f1f5f9; vertical-align: top;">' . htmlspecialchars($name) . '</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: 700; color: #475569; border-bottom: 1px solid #f1f5f9; vertical-align: top;">Email:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; vertical-align: top;">
                        <a href="mailto:' . htmlspecialchars($email) . '" style="color: #be185d; text-decoration: none; font-weight: 600;">' . htmlspecialchars($email) . '</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: 700; color: #475569; border-bottom: 1px solid #f1f5f9; vertical-align: top;">Inquiry Type:</td>
                    <td style="padding: 10px 0; color: #1e293b; border-bottom: 1px solid #f1f5f9; font-weight: 600; vertical-align: top;">' . htmlspecialchars($subject_label) . '</td>
                </tr>
            </table>
            
            <h3 style="margin-top: 0; margin-bottom: 12px; font-size: 14px; font-weight: 800; text-transform: uppercase; color: #be185d; letter-spacing: 0.5px;">
                Message Content:
            </h3>
            
            <div style="background-color: #f8fafc; padding: 25px; border-left: 4px solid #be185d; border-radius: 6px; font-style: italic; color: #334155; font-size: 15px; white-space: pre-wrap; margin-bottom: 10px; line-height: 1.7; box-shadow: inset 0 1px 3px rgba(0,0,0,0.02);">
                "' . $message . '"
            </div>
        </div>
        
        <!-- Footer Info -->
        <div style="background-color: #f8fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8; line-height: 1.5;">
            <p style="margin: 0 0 10px 0;">This email was securely delivered from the SWDR contact form.</p>
            <p style="margin: 0;">&copy; ' . date("Y") . ' Smile with Doctor Rome Dental Clinic. All Rights Reserved.</p>
        </div>
    </div>
</body>
</html>
';

// Setup email headers
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: SWDR Contact Form <noreply@smilewithdrrome.org>" . "\r\n";
$headers .= "Reply-To: " . $name . " <" . $email . ">" . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
if (mail($to, $email_subject, $html_message, $headers)) {
    echo json_encode(["status" => "SUCCESS", "message" => "Message sent successfully."]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "ERROR", "message" => "Failed to send email. Please try again later."]);
}
?>
