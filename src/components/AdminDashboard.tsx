import React, { useState, useEffect, useMemo } from 'react';
import { Download, Users, Trash2, RefreshCw, Search, Filter, Calendar, Award, TrendingUp, Eye, X, ChevronDown, BarChart3, PieChart, Clock, Phone, Mail, GraduationCap, Code, Languages, Laptop, Star, Copy, CheckCircle2, User } from 'lucide-react';
import { getStoredStudents, downloadStudentsData, deleteStudentData, StudentData } from '../utils/storage';

interface FilterState {
  search: string;
  course: string;
  direction: string;
  programmingLevel: string;
  languageLevel: string;
  hasNotebook: string;
  scoreRange: string;
  ageRange: string;
  dateRange: string;
}

export default function AdminDashboard() {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedStudentId, setCopiedStudentId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    course: '',
    direction: '',
    programmingLevel: '',
    languageLevel: '',
    hasNotebook: '',
    scoreRange: '',
    ageRange: '',
    dateRange: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadStudents();
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadStudents, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadStudents = async () => {
    setIsLoading(true);
    try {
      const data = await getStoredStudents();
      setStudents(data);
    } catch (error) {
      console.error('Ma\'lumotlarni yuklashda xatolik:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Advanced filtering with memoization for performance
  const filteredStudents = useMemo(() => {
    let filtered = [...students];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(student =>
        `${student.personalInfo.firstName} ${student.personalInfo.lastName}`
          .toLowerCase()
          .includes(searchLower) ||
        student.personalInfo.phone.includes(filters.search) ||
        student.personalInfo.fatherName.toLowerCase().includes(searchLower)
      );
    }

    // Course filter
    if (filters.course) {
      filtered = filtered.filter(student =>
        student.personalInfo.desiredCourse === filters.course
      );
    }

    // Direction filter
    if (filters.direction) {
      filtered = filtered.filter(student =>
        student.personalInfo.direction === filters.direction
      );
    }

    // Programming level filter
    if (filters.programmingLevel) {
      filtered = filtered.filter(student =>
        student.personalInfo.programmingLevel === filters.programmingLevel
      );
    }

    // Language level filter
    if (filters.languageLevel) {
      filtered = filtered.filter(student =>
        student.personalInfo.languageLevel === filters.languageLevel
      );
    }

    // Notebook filter
    if (filters.hasNotebook) {
      filtered = filtered.filter(student =>
        student.personalInfo.hasNotebook === filters.hasNotebook
      );
    }

    // Score range filter
    if (filters.scoreRange) {
      filtered = filtered.filter(student => {
        const score = student.testResult.percentage;
        switch (filters.scoreRange) {
          case 'excellent': return score >= 80;
          case 'good': return score >= 60 && score < 80;
          case 'average': return score >= 40 && score < 60;
          case 'poor': return score < 40;
          default: return true;
        }
      });
    }

    // Age range filter
    if (filters.ageRange) {
      filtered = filtered.filter(student => {
        const age = parseInt(student.personalInfo.age);
        switch (filters.ageRange) {
          case 'young': return age <= 20;
          case 'middle': return age > 20 && age <= 25;
          case 'mature': return age > 25;
          default: return true;
        }
      });
    }

    // Date range filter
    if (filters.dateRange) {
      const now = new Date();
      filtered = filtered.filter(student => {
        const studentDate = new Date(student.submittedAt);
        switch (filters.dateRange) {
          case 'today':
            return studentDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return studentDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return studentDate >= monthAgo;
          default: return true;
        }
      });
    }

    return filtered;
  }, [students, filters]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: '',
      course: '',
      direction: '',
      programmingLevel: '',
      languageLevel: '',
      hasNotebook: '',
      scoreRange: '',
      ageRange: '',
      dateRange: '',
    });
  };

  const handleDownload = async () => {
    await downloadStudentsData();
  };


  const handleDeleteStudent = async (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (student && window.confirm(`${student.personalInfo.firstName} ${student.personalInfo.lastName} ma'lumotlarini o'chirmoqchimisiz?`)) {
      await deleteStudentData(studentId);
      await loadStudents();
    }
  };

  const handleCopyFullName = async (student: StudentData) => {
    const fullName = `${student.personalInfo.lastName} ${student.personalInfo.firstName} ${student.personalInfo.fatherName}`;
    try {
      await navigator.clipboard.writeText(fullName);
      setCopiedStudentId(student.id);
      setTimeout(() => setCopiedStudentId(null), 2000);
    } catch (error) {
      console.error('Copy qilishda xatolik:', error);
      // Fallback method
      const textArea = document.createElement('textarea');
      textArea.value = fullName;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedStudentId(student.id);
      setTimeout(() => setCopiedStudentId(null), 2000);
    }
  };

  // Helper functions
  const getCourseName = (value: string) => {
    const courses = {
      'cpp': 'C++ Dasturlash',
      'frontend': 'Frontend',
      'backend': 'Backend',
    };
    return courses[value as keyof typeof courses] || value;
  };

  const getDirectionName = (value: string) => {
    const directions = {
      'axborot-xavfsizligi': 'Axborot xavfsizligi',
      'suniy-intellekt': "Sun'iy intellekt",
      'axborot-tizimlari-texnologiyalari': 'AT texnologiyalari',
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

  // Statistics calculations
  const stats = useMemo(() => {
    const total = students.length;
    const avgScore = total > 0 
      ? Math.round(students.reduce((sum, s) => sum + s.testResult.percentage, 0) / total)
      : 0;
    
    const excellent = students.filter(s => s.testResult.percentage >= 80).length;
    const withNotebook = students.filter(s => s.personalInfo.hasNotebook === 'yes').length;
    
    const courseStats = students.reduce((acc, student) => {
      acc[student.personalInfo.desiredCourse] = (acc[student.personalInfo.desiredCourse] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const directionStats = students.reduce((acc, student) => {
      acc[student.personalInfo.direction] = (acc[student.personalInfo.direction] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      avgScore,
      excellent,
      withNotebook,
      courseStats,
      directionStats,
    };
  }, [students]);

  const activeFiltersCount = Object.values(filters).filter(v => v !== '').length;

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">{stats.total}</div>
              <div className="text-blue-100">Jami talabalar</div>
            </div>
            <Users className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">{stats.avgScore}%</div>
              <div className="text-green-100">O'rtacha ball</div>
            </div>
            <TrendingUp className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">{stats.excellent}</div>
              <div className="text-purple-100">A'lo natija (80%+)</div>
            </div>
            <Award className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">{stats.withNotebook}</div>
              <div className="text-orange-100">Notebook bor</div>
            </div>
            <Laptop className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Filter className="w-5 h-5 text-indigo-600" />
                Filtrlar va qidiruv
              </h2>
              {activeFiltersCount > 0 && (
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                  {activeFiltersCount} ta filter faol
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
                >
                  Filtrlarni tozalash
                </button>
              )}
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-all duration-300"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? 'Yashirish' : 'Ko\'rsatish'}
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar - Always Visible */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Ism, familiya, telefon bo'yicha qidirish..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all duration-300"
            />
          </div>
        </div>

        {/* Advanced Filters - Collapsible */}
        {showFilters && (
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* Course Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kurs</label>
                <select
                  value={filters.course}
                  onChange={(e) => handleFilterChange('course', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all duration-200"
                >
                  <option value="">Barcha kurslar</option>
                  <option value="cpp">C++ Dasturlash</option>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                </select>
              </div>

              {/* Direction Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Yo'nalish</label>
                <select
                  value={filters.direction}
                  onChange={(e) => handleFilterChange('direction', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all duration-200"
                >
                  <option value="">Barcha yo'nalishlar</option>
                  <option value="axborot-xavfsizligi">Axborot xavfsizligi</option>
                  <option value="suniy-intellekt">Sun'iy intellekt</option>
                  <option value="axborot-tizimlari-texnologiyalari">AT texnologiyalari</option>
                  <option value="dasturiy-injiniring">Dasturiy injiniring</option>
                  <option value="amaliy-matematika">Amaliy matematika</option>
                  <option value="other">Boshqa</option>
                </select>
              </div>

              {/* Programming Level Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dasturlash darajasi</label>
                <select
                  value={filters.programmingLevel}
                  onChange={(e) => handleFilterChange('programmingLevel', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all duration-200"
                >
                  <option value="">Barcha darajalar</option>
                  <option value="beginner">Boshlang'ich</option>
                  <option value="basic">Asosiy</option>
                  <option value="intermediate">O'rta</option>
                  <option value="advanced">Yuqori</option>
                </select>
              </div>

              {/* Language Level Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ingliz tili</label>
                <select
                  value={filters.languageLevel}
                  onChange={(e) => handleFilterChange('languageLevel', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all duration-200"
                >
                  <option value="">Barcha darajalar</option>
                  <option value="beginner">Boshlang'ich</option>
                  <option value="basic">Asosiy</option>
                  <option value="intermediate">O'rta</option>
                  <option value="advanced">Yuqori</option>
                </select>
              </div>

              {/* Notebook Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notebook</label>
                <select
                  value={filters.hasNotebook}
                  onChange={(e) => handleFilterChange('hasNotebook', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all duration-200"
                >
                  <option value="">Hammasi</option>
                  <option value="yes">Bor</option>
                  <option value="no">Yo'q</option>
                </select>
              </div>

              {/* Score Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ball oralig'i</label>
                <select
                  value={filters.scoreRange}
                  onChange={(e) => handleFilterChange('scoreRange', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all duration-200"
                >
                  <option value="">Barcha ballar</option>
                  <option value="excellent">A'lo (80%+)</option>
                  <option value="good">Yaxshi (60-79%)</option>
                  <option value="average">O'rta (40-59%)</option>
                  <option value="poor">Past (40% dan kam)</option>
                </select>
              </div>

              {/* Age Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Yosh oralig'i</label>
                <select
                  value={filters.ageRange}
                  onChange={(e) => handleFilterChange('ageRange', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all duration-200"
                >
                  <option value="">Barcha yoshlar</option>
                  <option value="young">20 va undan kam</option>
                  <option value="middle">21-25</option>
                  <option value="mature">25 dan yuqori</option>
                </select>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sana oralig'i</label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all duration-200"
                >
                  <option value="">Barcha sanalar</option>
                  <option value="today">Bugun</option>
                  <option value="week">So'nggi hafta</option>
                  <option value="month">So'nggi oy</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="p-6 bg-gray-50">
          <div className="flex flex-wrap gap-3 justify-between items-center">
            <div className="text-sm text-gray-600">
              {filteredStudents.length} ta talaba ko'rsatilmoqda ({students.length} dan)
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={loadStudents}
                className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                title="Ma'lumotlarni yangilash"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
                disabled={students.length === 0}
              >
                <Download className="w-4 h-4" />
                Yuklab olish
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Ma'lumotlar yuklanmoqda...</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {activeFiltersCount > 0 ? 'Filter bo\'yicha natija topilmadi' : 'Ma\'lumotlar topilmadi'}
            </h3>
            <p className="text-gray-500">
              {activeFiltersCount > 0 
                ? 'Filter shartlarini o\'zgartirib ko\'ring'
                : 'Talabalar ro\'yxatdan o\'tgandan so\'ng ma\'lumotlar bu yerda ko\'rinadi'
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredStudents.map((student, index) => (
              <div
                key={student.id}
                className="p-6 hover:bg-gray-50 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Student Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
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
                        {student.testResult.percentage > 0 ? `${student.testResult.percentage}%` : 'Ro\'yxatdan o\'tgan'}
                      </div>
                    </div>

                    {/* Quick Info Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-sm mb-4">
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                        <div className="flex items-center gap-2 mb-1">
                          <Phone className="w-3 h-3 text-blue-600" />
                          <span className="font-semibold text-blue-700">Telefon</span>
                        </div>
                        <span className="text-gray-700">{student.personalInfo.phone}</span>
                      </div>

                      <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                        <div className="flex items-center gap-2 mb-1">
                          <GraduationCap className="w-3 h-3 text-purple-600" />
                          <span className="font-semibold text-purple-700">Kurs</span>
                        </div>
                        <span className="text-gray-700">{student.personalInfo.currentCourse}-kurs</span>
                      </div>

                      <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                        <div className="flex items-center gap-2 mb-1">
                          <Award className="w-3 h-3 text-green-600" />
                          <span className="font-semibold text-green-700">Tanlangan</span>
                        </div>
                        <span className="text-gray-700">{getCourseName(student.personalInfo.desiredCourse)}</span>
                      </div>

                      <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                        <div className="flex items-center gap-2 mb-1">
                          <Code className="w-3 h-3 text-orange-600" />
                          <span className="font-semibold text-orange-700">Dasturlash</span>
                        </div>
                        <span className="text-gray-700">{getSkillLevelName(student.personalInfo.programmingLevel)}</span>
                      </div>

                      <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-100">
                        <div className="flex items-center gap-2 mb-1">
                          <Laptop className="w-3 h-3 text-cyan-600" />
                          <span className="font-semibold text-cyan-700">Notebook</span>
                        </div>
                        <span className="text-gray-700">{student.personalInfo.hasNotebook === 'yes' ? 'Bor' : 'Yo\'q'}</span>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-3 h-3 text-gray-600" />
                          <span className="font-semibold text-gray-700">Sana</span>
                        </div>
                        <span className="text-gray-700">{new Date(student.submittedAt).toLocaleDateString('uz-UZ')}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleCopyFullName(student)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl ${
                          copiedStudentId === student.id
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-500 hover:bg-gray-600 text-white'
                        }`}
                      >
                        {copiedStudentId === student.id ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            Copy qilindi
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            F.I.Sh copy
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
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
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedStudent.personalInfo.firstName} {selectedStudent.personalInfo.lastName}
                </h2>
                <p className="text-indigo-100">
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
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Shaxsiy ma'lumotlar
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between">
                      <span className="font-semibold">Familiya:</span>
                      <span>{selectedStudent.personalInfo.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Ism:</span>
                      <span>{selectedStudent.personalInfo.firstName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Otasining ismi:</span>
                      <span>{selectedStudent.personalInfo.fatherName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Yosh:</span>
                      <span>{selectedStudent.personalInfo.age}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Telefon:</span>
                      <span>{selectedStudent.personalInfo.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
                  <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Ta'lim ma'lumotlari
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between">
                      <span className="font-semibold">Hozirgi kurs:</span>
                      <span>{selectedStudent.personalInfo.currentCourse}-kurs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Yo'nalish:</span>
                      <span>{getDirectionName(selectedStudent.personalInfo.direction)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Dasturlash:</span>
                      <span>{getSkillLevelName(selectedStudent.personalInfo.programmingLevel)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Ingliz tili:</span>
                      <span>{getSkillLevelName(selectedStudent.personalInfo.languageLevel)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Tanlangan kurs:</span>
                      <span>{getCourseName(selectedStudent.personalInfo.desiredCourse)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Notebook:</span>
                      <span>{selectedStudent.personalInfo.hasNotebook === 'yes' ? 'Bor' : 'Yo\'q'}</span>
                    </div>
                  </div>
                </div>

                {/* Test Results */}
                <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200 lg:col-span-2">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-green-600" />
                    Ro'yxatdan o'tish ma'lumotlari
                  </h3>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600">✓</div>
                    <div className="text-lg font-semibold mt-2">Muvaffaqiyatli ro'yxatdan o'tgan</div>
                    <div className="text-sm opacity-75 mt-2">
                      Ro'yxatdan o'tgan: {new Date(selectedStudent.submittedAt).toLocaleString('uz-UZ')}
                    </div>
                  </div>
                </div>

                {/* Timestamps */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 lg:col-span-2">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Vaqt ma'lumotlari
                  </h3>
                  <div className="text-gray-700">
                    <div>
                      <span className="font-semibold">Ro'yxatdan o'tgan:</span>
                      <div className="text-sm text-gray-600 mt-1">
                        {new Date(selectedStudent.submittedAt).toLocaleString('uz-UZ')}
                      </div>
                    </div>
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