<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

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
    // POST ma'lumotlarini olish
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data || !isset($data['studentId'])) {
        throw new Exception('Student ID ko\'rsatilmagan');
    }
    
    $studentId = $data['studentId'];
    $studentsFile = __DIR__ . '/students.json';
    $students = [];
    
    // Mavjud ma'lumotlarni o'qish
    if (file_exists($studentsFile)) {
        $fileContent = file_get_contents($studentsFile);
        if ($fileContent) {
            $students = json_decode($fileContent, true);
            if (!is_array($students)) {
                $students = [];
            }
        }
    }
    
    // Talabani topish va o'chirish
    $found = false;
    $students = array_filter($students, function($student) use ($studentId, &$found) {
        if ($student['id'] === $studentId) {
            $found = true;
            return false; // O'chirish
        }
        return true; // Saqlash
    });
    
    if (!$found) {
        throw new Exception('Talaba topilmadi');
    }
    
    // Faylga saqlash (array_values ishlatib indekslarni qayta tartibga solish)
    $result = file_put_contents($studentsFile, json_encode(array_values($students), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    
    if ($result === false) {
        throw new Exception('Faylga yozishda xatolik');
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Talaba ma\'lumotlari o\'chirildi'
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Xatolik: ' . $e->getMessage()
    ]);
}
?>