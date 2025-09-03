import React from 'react';
import { User, Phone, GraduationCap, Code, Languages, BookOpen, Laptop, Edit3, CheckCircle, Sparkles } from 'lucide-react';

interface FormData {
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
}

interface ReviewStepProps {
  formData: FormData;
  onEdit: () => void;
  onConfirm: () => void;
}

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

export default function ReviewStep({ formData, onEdit, onConfirm }: ReviewStepProps) {
  return (
    <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-6 sm:p-8 lg:p-12 animate-scale-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl animate-pulse-glow">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Ma'lumotlarni tekshiring
          </h2>
          <p className="text-gray-600 mt-1">Barcha ma'lumotlar to'g'ri ekanligini tasdiqlang</p>
        </div>
        <Sparkles className="w-6 h-6 text-teal-500 animate-bounce ml-auto hidden sm:block" />
      </div>

      {/* Review Sections */}
      <div className="space-y-8">
        {/* Personal Information */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-blue-800">Shaxsiy ma'lumotlar</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <div><span className="font-semibold">Familiya:</span> {formData.lastName}</div>
            <div><span className="font-semibold">Ism:</span> {formData.firstName}</div>
            <div><span className="font-semibold">Otasining ismi:</span> {formData.fatherName}</div>
            <div><span className="font-semibold">Yosh:</span> {formData.age}</div>
            <div className="sm:col-span-2"><span className="font-semibold">Telefon:</span> {formData.phone}</div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-bold text-purple-800">Ta'lim ma'lumotlari</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <div><span className="font-semibold">Hozirgi kurs:</span> {formData.currentCourse}-kurs</div>
            <div><span className="font-semibold">Yo'nalish:</span> {getDirectionName(formData.direction)}</div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <Code className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-bold text-green-800">Ko'nikmalar</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <div><span className="font-semibold">Dasturlash:</span> {getSkillLevelName(formData.programmingLevel)}</div>
            <div><span className="font-semibold">Ingliz tili:</span> {getSkillLevelName(formData.languageLevel)}</div>
          </div>
        </div>

        {/* Course and Equipment */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-200">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-orange-600" />
            <h3 className="text-xl font-bold text-orange-800">Kurs va jihozlar</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <div><span className="font-semibold">Tanlangan kurs:</span> {getCourseName(formData.desiredCourse)}</div>
            <div><span className="font-semibold">Notebook:</span> {formData.hasNotebook === 'yes' ? 'Bor' : 'Yo\'q'}</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-12">
        <button
          onClick={onEdit}
          className="w-full sm:w-auto px-8 py-4 bg-gray-100 border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold text-lg hover:bg-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
        >
          <Edit3 className="w-5 h-5" />
          Tahrirlash
        </button>

        <button
          onClick={onConfirm}
          className="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white rounded-2xl font-bold text-lg hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 shadow-2xl hover:shadow-glow-rainbow animate-gradient-x flex items-center justify-center gap-3"
        >
          <CheckCircle className="w-6 h-6" />
          Tasdiqlash va testni boshlash
          <Sparkles className="w-6 h-6 animate-bounce-gentle" />
        </button>
      </div>
    </div>
  );
}