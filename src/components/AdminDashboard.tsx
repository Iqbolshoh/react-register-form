import React, { useState, useEffect } from 'react';
import { Download, Users, Trash2, RefreshCw, Search, Filter, Calendar, Award, TrendingUp, Eye, X } from 'lucide-react';
import { getStoredStudentsFromLocal, downloadStudentsData, clearStudentsData, deleteStudentData, StudentData } from '../utils/storage';

export default function AdminDashboard() {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<StudentData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [students, searchTerm, filterCourse]);

  const loadStudents = async () => {
    setIsLoading(true);
    const data = await getStoredStudentsFromLocal();
    setStudents(data);
    setIsLoading(false);
  };

  const filterStudents = () => {
    let filtered = students;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(student =>
        `${student.personalInfo.firstName} ${student.personalInfo.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        student.personalInfo.phone.includes(searchTerm)
      );
    }

    // Course filter
    if (filterCourse) {
      filtered = filtered.filter(student =>
        student.personalInfo.desiredCourse === filterCourse
      );
    }

    setFilteredStudents(filtered);
  };

  const handleDownload = async () => {
    await downloadStudentsData();
  };

  const handleClearAll = async () => {
    if (window.confirm('Barcha talabalar ma\'lumotlarini o\'chirmoqchimisiz? Bu amalni bekor qilib bo\'lmaydi!')) {
      await clearStudentsData();
      await loadStudents();
    }
  };

  const handleDeleteStudent = async (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (student && window.confirm(`${student.personalInfo.firstName} ${student.personalInfo.lastName} ma'lumotlarini o'chirmoqchimisiz?`)) {
      await deleteStudentData(studentId);
      await loadStudents();
    }
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

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (percentage >= 60) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (percentage >= 40) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  // Statistics
  const totalStudents = students.length;
  const averageScore = students.length > 0 
    ? Math.round(students.reduce((sum, student) => sum + student.testResult.percentage, 0) / students.length)
    : 0;
  const courseDistribution = students.reduce((acc, student) => {
    acc[student.personalInfo.desiredCourse] = (acc[student.personalInfo.desiredCourse] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{totalStudents}</div>
              <div className="text-gray-600">Jami talabalar</div>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{averageScore}%</div>
              <div className="text-gray-600">O'rtacha ball</div>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {students.filter(s => s.testResult.percentage >= 80).length}
              </div>
              <div className="text-gray-600">A'lo natija (80%+)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-xl mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Ism, familiya yoki telefon bo'yicha qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                className="pl-10 pr-8 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 bg-white appearance-none min-w-[200px]"
              >
                <option value="">Barcha kurslar</option>
                <option value="cpp">C++ Dasturlash</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={loadStudents}
              className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              title="Ma'lumotlarni yangilash"
            >
              <RefreshCw className="w-5 h-5" />
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
              disabled={students.length === 0}
            >
              <Download className="w-4 h-4" />
              Yuklab olish
            </button>

            <button
              onClick={handleClearAll}
              className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
              disabled={students.length === 0}
            >
              <Trash2 className="w-4 h-4" />
              Barchasini o'chirish
            </button>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Ma'lumotlar yuklanmoqda...</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {searchTerm || filterCourse ? 'Qidiruv natijalari topilmadi' : 'Hech qanday ma\'lumot topilmadi'}
            </h3>
            <p className="text-gray-500">
              {searchTerm || filterCourse 
                ? 'Qidiruv shartlarini o\'zgartirib ko\'ring'
                : 'Talabalar ro\'yxatdan o\'tgandan so\'ng ma\'lumotlar bu yerda ko\'rinadi'
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredStudents.map((student, index) => (
              <div
                key={student.id}
                className="p-6 hover:bg-gray-50/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Student Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {student.personalInfo.firstName.charAt(0)}{student.personalInfo.lastName.charAt(0)}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800">
                          {student.personalInfo.firstName} {student.personalInfo.lastName}
                        </h3>
                        <p className="text-gray-600">
                          {student.personalInfo.fatherName}
                        </p>
                      </div>
                      
                      <div className={`px-4 py-2 rounded-xl border-2 font-bold text-lg ${getScoreColor(student.testResult.percentage)}`}>
                        {student.testResult.percentage}%
                      </div>
                    </div>

                    {/* Student Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <span className="font-semibold text-gray-700 block">Yosh:</span>
                        <span className="text-gray-600">{student.personalInfo.age}</span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <span className="font-semibold text-gray-700 block">Telefon:</span>
                        <span className="text-gray-600">{student.personalInfo.phone}</span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <span className="font-semibold text-gray-700 block">Kurs:</span>
                        <span className="text-gray-600">{student.personalInfo.currentCourse}-kurs</span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <span className="font-semibold text-gray-700 block">Yo'nalish:</span>
                        <span className="text-gray-600">{getDirectionName(student.personalInfo.direction)}</span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <span className="font-semibold text-gray-700 block">Tanlangan kurs:</span>
                        <span className="text-gray-600">{getCourseName(student.personalInfo.desiredCourse)}</span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <span className="font-semibold text-gray-700 block">Notebook:</span>
                        <span className="text-gray-600">{student.personalInfo.hasNotebook === 'yes' ? 'Bor' : 'Yo\'q'}</span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <span className="font-semibold text-gray-700 block">Test natijasi:</span>
                        <span className="text-gray-600">{student.testResult.score}/{student.testResult.totalQuestions}</span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <span className="font-semibold text-gray-700 block">Sana:</span>
                        <span className="text-gray-600">{new Date(student.submittedAt).toLocaleDateString('uz-UZ')}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
                      >
                        <Eye className="w-4 h-4" />
                        Batafsil
                      </button>
                      
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                        O'chirish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedStudent.personalInfo.firstName} {selectedStudent.personalInfo.lastName}
                </h2>
                <p className="text-purple-100">
                  Batafsil ma'lumotlar
                </p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Shaxsiy ma'lumotlar
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div><span className="font-semibold">Familiya:</span> {selectedStudent.personalInfo.lastName}</div>
                    <div><span className="font-semibold">Ism:</span> {selectedStudent.personalInfo.firstName}</div>
                    <div><span className="font-semibold">Otasining ismi:</span> {selectedStudent.personalInfo.fatherName}</div>
                    <div><span className="font-semibold">Yosh:</span> {selectedStudent.personalInfo.age}</div>
                    <div className="md:col-span-2"><span className="font-semibold">Telefon:</span> {selectedStudent.personalInfo.phone}</div>
                  </div>
                </div>

                {/* Academic Information */}
                <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
                  <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Ta'lim ma'lumotlari
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div><span className="font-semibold">Hozirgi kurs:</span> {selectedStudent.personalInfo.currentCourse}-kurs</div>
                    <div><span className="font-semibold">Yo'nalish:</span> {getDirectionName(selectedStudent.personalInfo.direction)}</div>
                    <div><span className="font-semibold">Dasturlash darajasi:</span> {getSkillLevelName(selectedStudent.personalInfo.programmingLevel)}</div>
                    <div><span className="font-semibold">Ingliz tili:</span> {getSkillLevelName(selectedStudent.personalInfo.languageLevel)}</div>
                  </div>
                </div>

                {/* Course and Equipment */}
                <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Kurs va jihozlar
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div><span className="font-semibold">Tanlangan kurs:</span> {getCourseName(selectedStudent.personalInfo.desiredCourse)}</div>
                    <div><span className="font-semibold">Notebook:</span> {selectedStudent.personalInfo.hasNotebook === 'yes' ? 'Bor' : 'Yo\'q'}</div>
                  </div>
                </div>

                {/* Test Results */}
                <div className={`rounded-2xl p-6 border-2 ${getScoreColor(selectedStudent.testResult.percentage)}`}>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Test natijalari
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{selectedStudent.testResult.percentage}%</div>
                      <div className="text-sm opacity-75">Foiz</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">{selectedStudent.testResult.score}</div>
                      <div className="text-sm opacity-75">To'g'ri javoblar</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">{selectedStudent.testResult.totalQuestions}</div>
                      <div className="text-sm opacity-75">Jami savollar</div>
                    </div>
                  </div>
                  <div className="mt-4 text-sm opacity-75">
                    Test yakunlangan: {new Date(selectedStudent.testResult.completedAt).toLocaleString('uz-UZ')}
                  </div>
                </div>

                {/* Timestamps */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Vaqt ma'lumotlari</h3>
                  <div className="space-y-2 text-gray-700">
                    <div><span className="font-semibold">Ro'yxatdan o'tgan:</span> {new Date(selectedStudent.submittedAt).toLocaleString('uz-UZ')}</div>
                    <div><span className="font-semibold">Test yakunlangan:</span> {new Date(selectedStudent.testResult.completedAt).toLocaleString('uz-UZ')}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 p-6 flex justify-between items-center">
              <button
                onClick={() => handleDeleteStudent(selectedStudent.id)}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Trash2 className="w-4 h-4" />
                Bu talabani o'chirish
              </button>
              
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-medium transition-all duration-300"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}