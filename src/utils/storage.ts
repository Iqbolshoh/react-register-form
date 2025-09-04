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
      return [];
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.log('students.json fayli mavjud emas yoki bo\'sh');
    return [];
  }
}

// localStorage dan ma'lumotlarni olish (admin panel uchun)
export async function getStoredStudentsFromLocal(): Promise<StudentData[]> {
  return await getStoredStudents();
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
    
    // Faylni server tomonida saqlash uchun API chaqiruvi
    const response = await fetch('/api/save-students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: students }),
    });
    
    if (!response.ok) {
      throw new Error('Faylga saqlashda xatolik yuz berdi');
    }
    
    console.log('Ma\'lumotlar src/data/students.json faylga saqlandi');
    
  } catch (error) {
    console.error('Faylga saqlashda xatolik:', error);
    
    // Fallback: Browser da faylni yuklab olish
    const dataBlob = new Blob([JSON.stringify(students, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `students_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('Ma\'lumotlar backup fayl sifatida yuklab olindi');
  }
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
  } catch (error) {
    console.error('Yuklab olishda xatolik:', error);
  }
}

// Ma'lumotlarni tozalash (admin uchun)
export async function clearStudentsData(): Promise<void> {
  try {
    await saveToJsonFile([]);
    console.log('Ma\'lumotlar tozalandi');
  } catch (error) {
    console.error('Ma\'lumotlarni tozalashda xatolik:', error);
  }
}

// Bitta talabani o'chirish (admin uchun)
export async function deleteStudentData(studentId: string): Promise<void> {
  try {
    const students = await getStoredStudents();
    const updatedStudents = students.filter(student => student.id !== studentId);
    await saveToJsonFile(updatedStudents);
    console.log('Talaba ma\'lumotlari o\'chirildi');
  } catch (error) {
    console.error('Talaba ma\'lumotlarini o\'chirishda xatolik:', error);
  }
}