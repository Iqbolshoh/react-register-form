// Ma'lumotlarni students.json faylga saqlash va o'qish

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

// students.json fayldan ma'lumotlarni o'qish
export async function getStoredStudents(): Promise<StudentData[]> {
  try {
    const response = await fetch('/students.json');
    if (!response.ok) {
      // Fayl mavjud bo'lmasa, bo'sh array qaytarish
      return [];
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.log('students.json fayli mavjud emas yoki bo\'sh, yangi fayl yaratiladi');
    return [];
  }
}

// Yangi talaba ma'lumotlarini saqlash
export async function saveStudentData(personalInfo: any, testResult: any): Promise<StudentData> {
  const studentData: StudentData = {
    id: Date.now().toString(),
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
      percentage: testResult.percentage,
      score: testResult.score,
      totalQuestions: testResult.totalQuestions,
      completedAt: testResult.completedAt,
    },
    submittedAt: new Date().toISOString(),
  };

  try {
    // Mavjud ma'lumotlarni olish
    const existingStudents = await getStoredStudents();
    
    // Yangi ma'lumotni qo'shish
    existingStudents.push(studentData);
    
    // students.json faylga saqlash
    await saveToJsonFile(existingStudents);
    
    console.log('Ma\'lumotlar students.json faylga muvaffaqiyatli saqlandi');
  } catch (error) {
    console.error('Ma\'lumotlarni saqlashda xatolik:', error);
  }

  return studentData;
}

// Ma'lumotlarni students.json faylga yozish
async function saveToJsonFile(students: StudentData[]): Promise<void> {
  try {
    const dataStr = JSON.stringify(students, null, 2);
    
    // Faylni yuklab olish orqali saqlash (brauzer cheklovi tufayli)
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'students.json';
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    // Brauzer xotirasida ham saqlash (backup uchun)
    localStorage.setItem('programming_academy_students', dataStr);
    
  } catch (error) {
    console.error('Faylga saqlashda xatolik:', error);
    throw error;
  }
}

// Ma'lumotlarni JSON fayl sifatida yuklab olish
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
  } catch (error) {
    console.error('Yuklab olishda xatolik:', error);
  }
}

// Ma'lumotlarni tozalash (admin uchun)
export function clearStudentsData(): void {
  if (confirm('Barcha talabalar ma\'lumotlarini o\'chirmoqchimisiz?')) {
    localStorage.removeItem('programming_academy_students');
    console.log('Ma\'lumotlar tozalandi');
  }
}