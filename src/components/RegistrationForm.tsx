import React, { useState } from 'react';
import { User, Phone, GraduationCap, Code, Languages, BookOpen, CheckCircle, Sparkles, Star, Heart, Laptop } from 'lucide-react';
import FormField from './FormField';
import SelectField from './SelectField';
import SkillLevelSelect from './SkillLevelSelect';
import CourseSelection from './CourseSelection';
import NotebookQuestion from './NotebookQuestion';
import LogoHeader from './LogoHeader';

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

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    lastName: '',
    firstName: '',
    fatherName: '',
    age: '',
    phone: '',
    currentCourse: '',
    direction: '',
    programmingLevel: '',
    languageLevel: '',
    desiredCourse: '',
    hasNotebook: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-100 via-pink-50 to-orange-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-20 animate-float blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full opacity-20 animate-float-delayed blur-xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full opacity-20 animate-bounce-gentle blur-xl"></div>
        </div>
        
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-12 max-w-lg w-full text-center relative z-10 animate-scale-in">
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-glow shadow-2xl">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          
          <div className="mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
              Ajoyib! 🎉
            </h2>
            <p className="text-xl text-gray-700 mb-2">Muvaffaqiyatli ro'yxatdan o'tdingiz!</p>
            <p className="text-gray-600 leading-relaxed">
              Sizning arizangiz qabul qilindi. Tez orada mutaxassislarimiz siz bilan bog'lanadi.
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-8">
            <Heart className="w-5 h-5 text-rose-500 animate-pulse" />
            <span className="text-gray-600">Bizni tanlaganingiz uchun rahmat!</span>
            <Heart className="w-5 h-5 text-rose-500 animate-pulse" />
          </div>
          
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                lastName: '',
                firstName: '',
                fatherName: '',
                age: '',
                phone: '',
                currentCourse: '',
                direction: '',
                programmingLevel: '',
                languageLevel: '',
                desiredCourse: '',
                hasNotebook: '',
              });
            }}
            className="w-full py-4 px-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl font-semibold text-lg hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl animate-gradient-x"
          >
            Yangi ro'yxat yaratish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-purple-600/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-pink-400/30 to-rose-600/30 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-violet-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-orange-400/20 to-yellow-600/20 rounded-full blur-3xl animate-bounce-gentle"></div>
      </div>
      
      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Logo Header */}
          <LogoHeader />

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-6 sm:p-8 lg:p-12 animate-slide-up">
            
            {/* Personal Information Section */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl animate-pulse-glow">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                    Shaxsiy ma'lumotlar
                  </h2>
                  <p className="text-gray-600 mt-1">O'zingiz haqingizda ma'lumot bering</p>
                </div>
                <Sparkles className="w-6 h-6 text-pink-500 animate-bounce ml-auto hidden sm:block" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField
                  label="Familiyasi"
                  type="text"
                  value={formData.lastName}
                  onChange={(value) => handleInputChange('lastName', value)}
                  placeholder="Familiyangizni kiriting"
                  required
                />

                <FormField
                  label="Ismi"
                  type="text"
                  value={formData.firstName}
                  onChange={(value) => handleInputChange('firstName', value)}
                  placeholder="Ismingizni kiriting"
                  required
                />

                <FormField
                  label="Otasining ismi"
                  type="text"
                  value={formData.fatherName}
                  onChange={(value) => handleInputChange('fatherName', value)}
                  placeholder="Otangizning ismini kiriting"
                  required
                />

                <FormField
                  label="Yoshi"
                  type="number"
                  value={formData.age}
                  onChange={(value) => handleInputChange('age', value)}
                  placeholder="Yoshingizni kiriting"
                  required
                />

                <div className="sm:col-span-2">
                  <FormField
                    label="Telefon raqami"
                    type="tel"
                    value={formData.phone}
                    onChange={(value) => handleInputChange('phone', value)}
                    placeholder="+998 (90) 123-45-67"
                    icon={Phone}
                    formatPhone={true}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Academic Information Section */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl animate-pulse-glow">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    Ta'lim ma'lumotlari
                  </h2>
                  <p className="text-gray-600 mt-1">Hozirgi ta'lim holatini ko'rsating</p>
                </div>
                <Star className="w-6 h-6 text-teal-500 animate-spin-slow ml-auto hidden sm:block" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SelectField
                  label="Hozirgi kursi"
                  value={formData.currentCourse}
                  onChange={(value) => handleInputChange('currentCourse', value)}
                  options={[
                    { value: '1', label: '1-kurs' },
                    { value: '2', label: '2-kurs' },
                    { value: '3', label: '3-kurs' },
                    { value: '4', label: '4-kurs' },
                  ]}
                  placeholder="Kursni tanlang"
                  required
                />

                <SelectField
                  label="Yo'nalish"
                  value={formData.direction}
                  onChange={(value) => handleInputChange('direction', value)}
                  options={[
                    { value: '', label: 'Axborot xavfsizligi' },
                    { value: '', label: 'Sun\'iy intellekt' },
                    { value: '', label: 'Axborot tizimlari va texnologiyalari' },
                    { value: '', label: 'Dasturiy injiniring' },
                    { value: 'other', label: 'Boshqa' },
                  ]}
                  placeholder="Yo'nalishni tanlang"
                  required
                />
              </div>
            </div>

            {/* Skills Assessment Section */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl animate-pulse-glow">
                  <Languages className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Ko'nikmalar bahosi
                  </h2>
                  <p className="text-gray-600 mt-1">Hozirgi bilim darajangizni baholang</p>
                </div>
                <div className="ml-auto hidden sm:flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
                  <Star className="w-5 h-5 text-indigo-500 animate-bounce-gentle" />
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <SkillLevelSelect
                  label="Dasturlash bilish darajasi"
                  value={formData.programmingLevel}
                  onChange={(value) => handleInputChange('programmingLevel', value)}
                  icon={Code}
                  required
                />

                <SkillLevelSelect
                  label="Ingliz tili bilish darajasi"
                  value={formData.languageLevel}
                  onChange={(value) => handleInputChange('languageLevel', value)}
                  icon={Languages}
                  required
                />
              </div>
            </div>

            {/* Notebook Question Section */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl animate-pulse-glow">
                  <Laptop className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Texnik imkoniyatlar
                  </h2>
                  <p className="text-gray-600 mt-1">Dars jarayoni uchun zarur ma'lumotlar</p>
                </div>
                <div className="ml-auto hidden sm:block">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <NotebookQuestion
                value={formData.hasNotebook}
                onChange={(value) => handleInputChange('hasNotebook', value)}
              />
            </div>

            {/* Course Selection Section */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-xl animate-pulse-glow">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                    Kurs tanlovi
                  </h2>
                  <p className="text-gray-600 mt-1">O'rganmoqchi bo'lgan yo'nalishni tanlang</p>
                </div>
                <div className="ml-auto hidden sm:block">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full animate-spin-slow"></div>
                </div>
              </div>
              
              <CourseSelection
                selectedCourse={formData.desiredCourse}
                onChange={(value) => handleInputChange('desiredCourse', value)}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`
                  w-full sm:w-auto px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-500 transform
                  ${
                    isFormValid && !isSubmitting
                      ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-2xl hover:shadow-glow-rainbow hover:scale-105 hover:-translate-y-2 animate-gradient-x'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Yuborilmoqda...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <Sparkles className="w-6 h-6" />
                    Ro'yxatdan o'tish
                    <Star className="w-6 h-6" />
                  </span>
                )}
              </button>
            </div>
          </form>
          
          {/* Footer */}
          <footer className="mt-16 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 p-8 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
              <a 
                href="https://iqbolshoh.uz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transition-all duration-500 transform hover:scale-105 underline decoration-2 underline-offset-4 decoration-blue-500 hover:decoration-pink-500"
              >
                iqbolshoh.uz
              </a>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <a 
                  href="tel:+998997799333"
                  className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium"
                >
                  <Phone className="w-4 h-4" />
                  +998 99 779 93 33
                </a>
                
                <a 
                  href="tel:+998333337790"
                  className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium"
                >
                  <Phone className="w-4 h-4" />
                  +998 33 333 77 90
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}