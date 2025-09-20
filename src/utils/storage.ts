// Ma'lumotlarni faqat public/students.json faylga saqlash va o'qish
// localStorage dan foydalanish to'liq olib tashlandi

// CSRF token olish
async function getCsrfToken(): Promise<string> {
  try {
    const response = await fetch('/get-csrf-token.php');
    if (!response.ok) {
      throw new Error('Token olishda xatolik');
    }
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('CSRF token olishda xatolik:', error);
    // Fallback token (kunlik token)
    const today = new Date().toISOString().split('T')[0];
    return btoa(`iqbolshoh_academy_2025_${today}`);
  }
}

export interface StudentData {
  id: string;
  personalInfo: {
    lastName: string;
    firstName: string;
    fatherName: string;
    age: string;
    phone: string;
    currentCourse: string;
    direction: string;
    programmingLevel: string;
    languageLevel: string;
    desiredCourse: string;
    hasNotebook: string;
  };
  testResult: {
    percentage: number;
    score: number;
    totalQuestions: number;
    completedAt: string;
  };
  submittedAt: string;
}

// public/students.json fayldan ma'lumotlarni o'qish
export async function getStoredStudents(): Promise<StudentData[]> {
  try {
    const response = await fetch('/students.json?' + Date.now()); // Cache busting
    if (!response.ok) {
      console.log('students.json fayli mavjud emas');
      return [];
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.log('students.json faylini o\'qishda xatolik:', error);
    return [];
  }
}

// Yangi talaba ma'lumotlarini saqlash
export async function saveStudentData(personalInfo: any, testResult: any): Promise<StudentData> {
  const studentData: StudentData = {
    id: '', // PHP tomonida yaratiladi
    personalInfo: {
      lastName: personalInfo.lastName,
      firstName: personalInfo.firstName,
      fatherName: personalInfo.fatherName,
      age: personalInfo.age,
      phone: personalInfo.phone,
      currentCourse: personalInfo.currentCourse,
      direction: personalInfo.direction,
      programmingLevel: personalInfo.programmingLevel,
      languageLevel: personalInfo.languageLevel,
      desiredCourse: personalInfo.desiredCourse,
      hasNotebook: personalInfo.hasNotebook,
    },
    testResult: {
      percentage: testResult.percentage || 0,
      score: testResult.score || 0,
      totalQuestions: testResult.totalQuestions || 0,
      completedAt: testResult.completedAt,
    },
    submittedAt: '', // PHP tomonida yaratiladi
  };

  try {
    // CSRF token olish
    const csrfToken = await getCsrfToken();
    
    // PHP API orqali saqlash
    const response = await fetch('/save-student.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify({
        personalInfo: studentData.personalInfo,
        testResult: studentData.testResult,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Server xatosi');
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Ma\'lumotlarni saqlashda xatolik');
    }
    
    // ID ni yangilash
    studentData.id = result.studentId;
    studentData.submittedAt = new Date().toISOString();
    
    console.log('Ma\'lumotlar muvaffaqiyatli saqlandi');
  } catch (error) {
    console.error('Ma\'lumotlarni saqlashda xatolik:', error);
    
    // Fallback: Browser da faylni yuklab olish
    const dataBlob = new Blob([JSON.stringify(studentData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `student_backup_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('Ma\'lumotlar backup fayl sifatida yuklab olindi');
  }

  return studentData;
}

// Ma'lumotlarni JSON fayl sifatida yuklab olish (admin uchun)
export async function downloadStudentsData(): Promise<void> {
  try {
    const students = await getStoredStudents();
    
    if (students.length === 0) {
      alert('Hech qanday ma\'lumot topilmadi');
      return;
    }

    const dataStr = JSON.stringify(students, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `students_${new Date().toISOString().split('T')[0]}.json`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    console.log('Ma\'lumotlar yuklab olindi');
  } catch (error) {
    console.error('Yuklab olishda xatolik:', error);
    alert('Yuklab olishda xatolik yuz berdi');
  }
}

// Bitta talabani o'chirish (admin uchun)
export async function deleteStudentData(studentId: string): Promise<void> {
  try {
    // CSRF token olish
    const csrfToken = await getCsrfToken();
    
    // PHP API orqali o'chirish
    const response = await fetch('/delete-student.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify({ studentId }),
    });
    
    if (!response.ok) {
      throw new Error('Server xatosi');
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Talabani o\'chirishda xatolik');
    }
    
    console.log('Talaba ma\'lumotlari o\'chirildi');
  } catch (error) {
    console.error('Talaba ma\'lumotlarini o\'chirishda xatolik:', error);
    alert('Talabani o\'chirishda xatolik yuz berdi');
  }
}