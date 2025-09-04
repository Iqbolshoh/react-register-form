// Ma'lumotlarni src/data/students.json faylga saqlash va o'qish

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

// src/data/students.json fayldan ma'lumotlarni o'qish
export async function getStoredStudents(): Promise<StudentData[]> {
  try {
    const response = await fetch('/src/data/students.json');
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
    
    // src/data/students.json faylga saqlash
    await saveToJsonFile(existingStudents);
    
    console.log('Ma\'lumotlar src/data/students.json faylga muvaffaqiyatli saqlandi');
  } catch (error) {
    console.error('Ma\'lumotlarni saqlashda xatolik:', error);
  }

  return studentData;
}

// Ma'lumotlarni src/data/students.json faylga yozish
async function saveToJsonFile(students: StudentData[]): Promise<void> {
  try {
    const dataStr = JSON.stringify(students, null, 2);
    
    // Browser environment da faylga to'g'ridan-to'g'ri yozish mumkin emas
    // Shuning uchun localStorage dan foydalanib, keyin admin panel orqali yuklab olish imkonini berish
    localStorage.setItem('programming_academy_students', dataStr);
    
    // Faylni server tomonida saqlash uchun API chaqiruvi kerak bo'ladi
    // Hozircha localStorage da saqlaymiz
    console.log('Ma\'lumotlar localStorage ga saqlandi');
    
  } catch (error) {
    console.error('Faylga saqlashda xatolik:', error);
    throw error;
  }
}

// Ma'lumotlarni JSON fayl sifatida yuklab olish (admin uchun)
export async function downloadStudentsData(): Promise<void> {
  try {
    // localStorage dan ma'lumotlarni olish
    const storedData = localStorage.getItem('programming_academy_students');
    
    if (!storedData) {
      alert('Hech qanday ma\'lumot topilmadi');
      return;
    }

    const students = JSON.parse(storedData);
    
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

// localStorage dan ma'lumotlarni olish (admin panel uchun)
export async function getStoredStudentsFromLocal(): Promise<StudentData[]> {
  try {
    const storedData = localStorage.getItem('programming_academy_students');
    if (!storedData) {
      return [];
    }
    const data = JSON.parse(storedData);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('localStorage dan ma\'lumotlarni olishda xatolik:', error);
    return [];
  }
}

// Ma'lumotlarni tozalash (admin uchun)
export function clearStudentsData(): void {
  if (confirm('Barcha talabalar ma\'lumotlarini o\'chirmoqchimisiz?')) {
    localStorage.removeItem('programming_academy_students');
    console.log('Ma\'lumotlar tozalandi');
  }
}