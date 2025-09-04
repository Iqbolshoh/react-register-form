<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// OPTIONS so'rovini qaytarish
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// CSRF token yaratish
$token = hash('sha256', 'iqbolshoh_academy_2025_' . date('Y-m-d'));

echo json_encode([
    'success' => true,
    'token' => $token,
    'expires' => date('Y-m-d 23:59:59')
]);
?>