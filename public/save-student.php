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
    // POST ma'lumotlarini olish
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        throw new Exception('Noto\'g\'ri JSON format');
    }
    
    // CSRF token tekshirish
    $providedToken = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    $expectedToken = hash('sha256', 'iqbolshoh_academy_2025_' . date('Y-m-d'));
    
    if (!hash_equals($expectedToken, $providedToken)) {
        http_response_code(403);
        echo json_encode(['error' => 'Xavfsizlik xatosi: Noto\'g\'ri token']);
        exit();
    }
    
    // students.json faylini o'qish
    $studentsFile = __DIR__ . '/students.json';
    $students = [];
    
    if (file_exists($studentsFile)) {
        $fileContent = file_get_contents($studentsFile);
        if ($fileContent) {
            $students = json_decode($fileContent, true);
            if (!is_array($students)) {
                $students = [];
            }
        }
    }
    
    // Yangi talaba ma'lumotlarini qo'shish
    $newStudent = [
        'id' => (string)time() . rand(1000, 9999),
        'personalInfo' => [
            'lastName' => htmlspecialchars($data['personalInfo']['lastName'] ?? ''),
            'firstName' => htmlspecialchars($data['personalInfo']['firstName'] ?? ''),
            'fatherName' => htmlspecialchars($data['personalInfo']['fatherName'] ?? ''),
            'age' => htmlspecialchars($data['personalInfo']['age'] ?? ''),
            'phone' => htmlspecialchars($data['personalInfo']['phone'] ?? ''),
            'currentCourse' => htmlspecialchars($data['personalInfo']['currentCourse'] ?? ''),
            'direction' => htmlspecialchars($data['personalInfo']['direction'] ?? ''),
            'programmingLevel' => htmlspecialchars($data['personalInfo']['programmingLevel'] ?? ''),
            'languageLevel' => htmlspecialchars($data['personalInfo']['languageLevel'] ?? ''),
            'desiredCourse' => htmlspecialchars($data['personalInfo']['desiredCourse'] ?? ''),
            'hasNotebook' => htmlspecialchars($data['personalInfo']['hasNotebook'] ?? ''),
        ],
        'testResult' => [
            'percentage' => (int)($data['testResult']['percentage'] ?? 0),
            'score' => (int)($data['testResult']['score'] ?? 0),
            'totalQuestions' => (int)($data['testResult']['totalQuestions'] ?? 0),
            'completedAt' => $data['testResult']['completedAt'] ?? date('c'),
        ],
        'submittedAt' => date('c'),
        'ipAddress' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'userAgent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
    ];
    
    // Yangi talabani ro'yxatga qo'shish
    $students[] = $newStudent;
    
    // Faylga saqlash
    $result = file_put_contents($studentsFile, json_encode($students, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    
    if ($result === false) {
        throw new Exception('Faylga yozishda xatolik');
    }
    
    // Muvaffaqiyatli javob
    echo json_encode([
        'success' => true,
        'message' => 'Ma\'lumotlar muvaffaqiyatli saqlandi',
        'studentId' => $newStudent['id']
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Xatolik: ' . $e->getMessage()
    ]);
}
?>