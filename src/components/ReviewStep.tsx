import React from 'react';
import { ArrowLeft, ArrowRight, User, GraduationCap, Code, Languages, Laptop, BookOpen, CheckCircle, Edit3, Eye } from 'lucide-react';

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
  onBack: () => void;
  onConfirm: () => void;
}

export default function ReviewStep({ formData, onBack, onConfirm }: ReviewStepProps) {
  const getDirectionLabel = (value: string) => {
    const directions: {[key: string]: string} = {
      'axborot-xavfsizligi': 'Axborot xavfsizligi',
      'suniy-intellekt': "Sun'iy intellekt",
      'axborot-tizimlari-texnologiyalari': 'Axborot tizimlari va texnologiyalari',
      'dasturiy-injiniring': 'Dasturiy injiniring',
      'amaliy-matematika': 'Amaliy matematika',
      'other': 'Boshqa',
    };
    return directions[value] || value;
  };

  const getSkillLevelLabel = (value: string) => {
    const levels: {[key: string]: string} = {
      'beginner': 'Boshlang\'ich',
      'basic': 'Asosiy',
      'intermediate': 'O\'rta',
      'advanced': 'Yuqori',
    };
    return levels[value] || value;
  };

  const getCourseLabel = (value: string) => {
    const courses: {[key: string]: string} = {
      'cpp': 'C++ Dasturlash Asoslari',
      'frontend': 'Web dasturlash Frontend',
      'backend': 'Web dasturlash Backend',
    };
    return courses[value] || value;
  };

  const reviewSections = [
    {
      title: 'Shaxsiy ma\'lumotlar',
      icon: User,
      gradient: 'from-rose-500 to-purple-600',
      items: [
        { label: 'F.I.Sh', value: `${formData.lastName} ${formData.firstName} ${formData.fatherName}` },
        { label: 'Yoshi', value: `${formData.age} yosh` },
        { label: 'Telefon', value: formData.phone },
      ]
    },
    {
      title: 'Ta\'lim ma\'lumotlari',
      icon: GraduationCap,
      gradient: 'from-emerald-500 to-cyan-600',
      items: [
        { label: 'Hozirgi kursi', value: `${formData.currentCourse}-kurs` },
        { label: 'Yo\'nalish', value: getDirectionLabel(formData.direction) },
      ]
    },
    {
      title: 'Ko\'nikmalar',
      icon: Languages,
      gradient: 'from-violet-500 to-indigo-600',
      items: [
        { label: 'Dasturlash darajasi', value: getSkillLevelLabel(formData.programmingLevel) },
        { label: 'Ingliz tili darajasi', value: getSkillLevelLabel(formData.languageLevel) },
      ]
    },
    {
      title: 'Texnik imkoniyatlar',
      icon: Laptop,
      gradient: 'from-cyan-500 to-blue-600',
      items: [
        { label: 'Shaxsiy notebook', value: formData.hasNotebook === 'yes' ? 'Bor' : 'Yo\'q' },
      ]
    },
    {
      title: 'Tanlangan kurs',
      icon: BookOpen,
      gradient: 'from-orange-500 to-yellow-600',
      items: [
        { label: 'Kurs', value: getCourseLabel(formData.desiredCourse) },
      ]
    },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-6 sm:p-8 lg:p-12 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-4 mb-12">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl animate-pulse-glow">
          <Eye className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Ma'lumotlarni tekshiring
          </h2>
          <p className="text-gray-600 mt-2 text-lg">Barcha ma'lumotlar to'g'ri ekanligini tasdiqlang</p>
        </div>
        <CheckCircle className="w-8 h-8 text-green-500 animate-bounce-gentle ml-auto hidden sm:block" />
      </div>

      {/* Review Sections */}
      <div className="space-y-8 mb-12">
        {reviewSections.map((section, index) => {
          const Icon = section.icon;
          
          return (
            <div 
              key={section.title}
              className="bg-gradient-to-r from-white/80 to-gray-50/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${section.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-xl font-bold bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent`}>
                  {section.title}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="flex justify-between items-center p-4 bg-white/60 rounded-xl border border-gray-100 hover:bg-white/80 transition-all duration-200"
                  >
                    <span className="font-medium text-gray-700">{item.label}:</span>
                    <span className="font-semibold text-gray-900 text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={onBack}
          className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
        >
          <ArrowLeft className="w-5 h-5" />
          Orqaga qaytish
          <Edit3 className="w-5 h-5" />
        </button>
        
        <button
          onClick={onConfirm}
          className="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white rounded-2xl font-bold text-lg hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 shadow-2xl hover:shadow-glow-rainbow animate-gradient-x flex items-center justify-center gap-3"
        >
          <CheckCircle className="w-6 h-6" />
          Tasdiqlash va testga o'tish
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}