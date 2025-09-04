import React, { useState, useEffect } from 'react';
import { Download, Users, Trash2, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { getStoredStudentsFromLocal, downloadStudentsData, clearStudentsData, StudentData } from '../utils/storage';

export default function AdminPanel() {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const data = await getStoredStudentsFromLocal();
    setStudents(data);
  };

  const handleDownload = async () => {
    await downloadStudentsData();
  };

  const handleClear = () => {
    clearStudentsData();
    loadStudents();
  };

  const getCourseName = (value: string) => {
    const courses = {
      'cpp': 'C++ Dasturlash Asoslari',
      'frontend': 'Web dasturlash Frontend',
      'backend': 'Web dasturlash Backend',
    };
    return courses[value as keyof typeof courses] || value;
  };

  const getDirectionName = (value: string) => {
    const directions = {
      'axborot-xavfsizligi': 'Axborot xavfsizligi',
      'suniy-intellekt': "Sun'iy intellekt",
      'axborot-tizimlari-texnologiyalari': 'Axborot tizimlari va texnologiyalari',
      'dasturiy-injiniring': 'Dasturiy injiniring',
      'amaliy-matematika': 'Amaliy matematika',
      'other': 'Boshqa',
    };
    return directions[value as keyof typeof directions] || value;
  };

  const getSkillLevelName = (value: string) => {
    const levels = {
      'beginner': 'Boshlang\'ich',
      'basic': 'Asosiy',
      'intermediate': 'O\'rta',
      'advanced': 'Yuqori',
    };
    return levels[value as keyof typeof levels] || value;
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <Eye className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Admin Panel</h2>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
              {students.length} talaba
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={loadStudents}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300"
              title="Ma'lumotlarni yangilash"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
              disabled={students.length === 0}
            >
              <Download className="w-4 h-4" />
              Yuklab olish
            </button>
            
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
              disabled={students.length === 0}
            >
              <Trash2 className="w-4 h-4" />
              Tozalash
            </button>
            
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300"
            >
              <EyeOff className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {students.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Hech qanday ma'lumot topilmadi
              </h3>
              <p className="text-gray-500">
                Talabalar ro'yxatdan o'tgandan so'ng ma'lumotlar bu yerda ko'rinadi
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {students.map((student, index) => (
                <div
                  key={student.id}
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {student.personalInfo.firstName} {student.personalInfo.lastName}
                      </h3>
                      <p className="text-gray-600">
                        {student.personalInfo.fatherName} o'g'li/qizi
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-indigo-600">
                        {student.testResult.percentage}%
                      </div>
                      <div className="text-sm text-gray-500">
                        {student.testResult.score}/{student.testResult.totalQuestions}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">Yosh:</span>
                      <span className="ml-2 text-gray-600">{student.personalInfo.age}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Telefon:</span>
                      <span className="ml-2 text-gray-600">{student.personalInfo.phone}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Kurs:</span>
                      <span className="ml-2 text-gray-600">{student.personalInfo.currentCourse}-kurs</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Yo'nalish:</span>
                      <span className="ml-2 text-gray-600">{getDirectionName(student.personalInfo.direction)}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Tanlangan kurs:</span>
                      <span className="ml-2 text-gray-600">{getCourseName(student.personalInfo.desiredCourse)}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Notebook:</span>
                      <span className="ml-2 text-gray-600">{student.personalInfo.hasNotebook === 'yes' ? 'Bor' : 'Yo\'q'}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      Ro'yxatdan o'tgan: {new Date(student.submittedAt).toLocaleString('uz-UZ')}
                    </div>
                    <div className="text-xs text-gray-500">
                      Test yakunlangan: {new Date(student.testResult.completedAt).toLocaleString('uz-UZ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}