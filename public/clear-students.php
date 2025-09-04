<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token');

// OPTIONS so'rovini qaytarish
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Faqat POST so'rovlarini qabul qilish
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Faqat POST so\'rov qabul qilinadi']);
    exit();
}

try {
    // CSRF token tekshirish
    $providedToken = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    $expectedToken = hash('sha256', 'iqbolshoh_academy_2025_' . date('Y-m-d'));
    
    if (!hash_equals($expectedToken, $providedToken)) {
        http_response_code(403);
        echo json_encode(['error' => 'Xavfsizlik xatosi: Noto\'g\'ri token']);
        exit();
    }
    
    $studentsFile = __DIR__ . '/students.json';
    
    // Bo'sh array yozish
    $result = file_put_contents($studentsFile, json_encode([], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    
    if ($result === false) {
        throw new Exception('Faylni tozalashda xatolik');
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Barcha ma\'lumotlar tozalandi'
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Xatolik: ' . $e->getMessage()
    ]);
}
?>