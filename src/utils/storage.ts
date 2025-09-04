// Ma'lumotlarni localStorage da saqlash va JSON fayl sifatida yuklab olish

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

const STORAGE_KEY = 'programming_academy_students';

// Ma'lumotlarni localStorage dan olish
export function getStoredStudents(): StudentData[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Ma\'lumotlarni o\'qishda xatolik:', error);
    return [];
  }
}

// Yangi talaba ma'lumotlarini saqlash
export function saveStudentData(personalInfo: any, testResult: any): StudentData {
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

  // Mavjud ma'lumotlarni olish
  const existingStudents = getStoredStudents();
  
  // Yangi ma'lumotni qo'shish
  existingStudents.push(studentData);
  
  // localStorage ga saqlash
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingStudents));
    console.log('Ma\'lumotlar muvaffaqiyatli saqlandi');
  } catch (error) {
    console.error('Ma\'lumotlarni saqlashda xatolik:', error);
  }

  return studentData;
}

// Ma'lumotlarni JSON fayl sifatida yuklab olish
export function downloadStudentsData(): void {
  const students = getStoredStudents();
  
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
}

// Ma'lumotlarni tozalash (admin uchun)
export function clearStudentsData(): void {
  if (confirm('Barcha talabalar ma\'lumotlarini o\'chirmoqchimisiz?')) {
    localStorage.removeItem(STORAGE_KEY);
    console.log('Ma\'lumotlar tozalandi');
  }
}