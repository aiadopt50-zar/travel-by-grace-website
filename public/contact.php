<?php
// Travel By Grace contact form handler.
// Uses the hosting account's PHP mail service. Never commit passwords or mail credentials here.

declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /#contact', true, 303);
    exit;
}

function clean_line(string $value, int $maxLength = 160): string {
    $value = trim(strip_tags($value));
    $value = preg_replace('/[\r\n]+/', ' ', $value) ?? '';
    return mb_substr($value, 0, $maxLength);
}

function clean_text(string $value, int $maxLength = 3000): string {
    $value = trim(strip_tags($value));
    $value = preg_replace("/\r\n|\r/", "\n", $value) ?? '';
    return mb_substr($value, 0, $maxLength);
}

if (!empty($_POST['website'] ?? '')) {
    header('Location: /thank-you.html', true, 303);
    exit;
}

$name = clean_line((string)($_POST['name'] ?? ''), 100);
$phone = clean_line((string)($_POST['phone'] ?? ''), 40);
$emailRaw = trim((string)($_POST['email'] ?? ''));
$email = filter_var($emailRaw, FILTER_VALIDATE_EMAIL) ? $emailRaw : '';
$date = clean_line((string)($_POST['travel_date'] ?? ''), 20);
$passengers = clean_line((string)($_POST['passengers'] ?? ''), 10);
$type = clean_line((string)($_POST['journey_type'] ?? ''), 100);
$message = clean_text((string)($_POST['message'] ?? ''), 3000);
$consent = (string)($_POST['consent'] ?? '');

if ($name === '' || $phone === '' || $type === '' || $message === '' || $consent !== 'yes') {
    http_response_code(422);
    echo '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Please check the form</title><link rel="stylesheet" href="/assets/css/styles.css"></head><body class="thank-you-page"><main class="thank-you-card"><h1>Please check your details.</h1><p>Name, phone number, journey type, message and consent are required.</p><a class="button" href="/#contact">Return to the form</a></main></body></html>';
    exit;
}

$to = 'lucy@travelbygrace.co.za';
$subject = 'New Travel By Grace enquiry from ' . $name;
$body = "New website enquiry\n\n"
      . "Name: {$name}\n"
      . "Phone: {$phone}\n"
      . "Email: " . ($email !== '' ? $email : 'Not supplied') . "\n"
      . "Preferred date: " . ($date !== '' ? $date : 'Not supplied') . "\n"
      . "Passengers: " . ($passengers !== '' ? $passengers : 'Not supplied') . "\n"
      . "Journey type: {$type}\n\n"
      . "Message:\n{$message}\n\n"
      . "Consent confirmed: Yes\n"
      . "Submitted from: travelbygrace.co.za\n";

$headers = [
    'From: Travel By Grace Website <website@travelbygrace.co.za>',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];
if ($email !== '') {
    $headers[] = 'Reply-To: ' . $email;
}

$sent = @mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    header('Location: /thank-you.html', true, 303);
    exit;
}

http_response_code(500);
echo '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Message could not be sent</title><link rel="stylesheet" href="/assets/css/styles.css"></head><body class="thank-you-page"><main class="thank-you-card"><h1>The form could not send your message.</h1><p>Please WhatsApp Lucille on <a href="https://wa.me/27845620309">084 562 0309</a> or email <a href="mailto:lucy@travelbygrace.co.za">lucy@travelbygrace.co.za</a>.</p><a class="button" href="/#contact">Return to the website</a></main></body></html>';
