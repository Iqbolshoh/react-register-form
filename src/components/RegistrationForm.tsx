import React, { useState } from 'react';
import { User, Phone, GraduationCap, Code, Languages, BookOpen, CheckCircle, Sparkles } from 'lucide-react';
import FormField from './FormField';
import SelectField from './SelectField';
import SkillLevelSelect from './SkillLevelSelect';
import CourseSelection from './CourseSelection';
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 max-w-md w-full text-center animate-scale-in">
          <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-glow">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Muvaffaqiyatli ro'yxatdan o'tdingiz!</h2>
          <p className="text-gray-600 mb-6">
            Sizning arizangiz qabul qilindi. Tez orada siz bilan bog'lanamiz.
          </p>
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
              });
            }}
            className="w-full py-3 px-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:scale-[1.02]"
          >
            Yangi ro'yxat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>
      
      <div className="relative z-10 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Logo Header */}
        <LogoHeader />

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Personal Information */}
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-white" />
                </div>
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Shaxsiy ma'lumotlar
                </span>
              </h2>
            </div>

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

            <div className="md:col-span-2">
              <FormField
                label="Telefon raqami"
                type="tel"
                value={formData.phone}
                onChange={(value) => handleInputChange('phone', value)}
                placeholder="+998 (XX) XXX-XX-XX"
                icon={Phone}
                required
              />
            </div>

            {/* Academic Information */}
            <div className="md:col-span-2 mt-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ta'lim ma'lumotlari
                </span>
              </h2>
            </div>

            <SelectField
              label="Hozirgi kursi"
              value={formData.currentCourse}
              onChange={(value) => handleInputChange('currentCourse', value)}
              options={[
                { value: '9', label: '9-sinf' },
                { value: '10', label: '10-sinf' },
                { value: '11', label: '11-sinf' },
                { value: 'graduate', label: 'Maktabni tugatgan' },
                { value: 'student', label: 'Talaba' },
                { value: 'working', label: 'Ishlayman' },
              ]}
              placeholder="Kursni tanlang"
              required
            />

            <SelectField
              label="Yo'nalish"
              value={formData.direction}
              onChange={(value) => handleInputChange('direction', value)}
              options={[
                { value: 'aniq', label: 'Aniq fanlar' },
                { value: 'ijtimoiy', label: 'Ijtimoiy fanlar' },
                { value: 'texnik', label: 'Texnik yo\'nalish' },
                { value: 'iqtisodiy', label: 'Iqtisodiy yo\'nalish' },
                { value: 'other', label: 'Boshqa' },
              ]}
              placeholder="Yo'nalishni tanlang"
              required
            />

            {/* Skill Assessment */}
            <div className="md:col-span-2 mt-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                  <Languages className="w-6 h-6 text-white" />
                </div>
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Ko'nikmalar bahosi
                </span>
              </h2>
            </div>

            <SkillLevelSelect
              label="Dasturlash bilish darajasi"
              value={formData.programmingLevel}
              onChange={(value) => handleInputChange('programmingLevel', value)}
              icon={Code}
              required
            />

            <SkillLevelSelect
              label="Til bilish darajasi"
              value={formData.languageLevel}
              onChange={(value) => handleInputChange('languageLevel', value)}
              icon={Languages}
              required
            />
          </div>

          {/* Course Selection */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-600 rounded-xl flex items-center justify-center mr-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
              Kurs tanlovi
              </span>
            </h2>
            <CourseSelection
              selectedCourse={formData.desiredCourse}
              onChange={(value) => handleInputChange('desiredCourse', value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
              isFormValid && !isSubmitting
                ? 'bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-700 text-white shadow-2xl hover:shadow-glow-rainbow hover:scale-[1.02] animate-gradient-x'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                Yuborilmoqda...
              </span>
            ) : (
              'Ro\'yxatdan o\'tish'
            )}
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}