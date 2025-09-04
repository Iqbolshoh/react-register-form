import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Phone, GraduationCap, Code, Languages, BookOpen, CheckCircle, Sparkles, Star, Heart, Laptop, ArrowRight, ArrowLeft, Eye, FileCheck, Brain } from 'lucide-react';
import FormField from './FormField';
import SelectField from './SelectField';
import SkillLevelSelect from './SkillLevelSelect';
import CourseSelection from './CourseSelection';
import NotebookQuestion from './NotebookQuestion';
import LogoHeader from './LogoHeader';
import ReviewStep from './ReviewStep';
import TestStep from './TestStep';

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

type Step = 'form' | 'test';

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState<Step>('form');
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

  const [testResults, setTestResults] = useState<{ [key: number]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('test');
  };

  const handleTestComplete = async (results: { [key: number]: string }) => {
    setTestResults(results);
    // Test yakunlanganda hech narsa qilmaymiz, faqat natijalarni saqlaymiz
  };

  // Security: Input sanitization
  const sanitizeInput = (input: string): string => {
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .trim()
      .slice(0, 100); // Limit length
  };

  const handleSecureInputChange = (field: keyof FormData, value: string) => {
    const sanitizedValue = sanitizeInput(value);
    handleInputChange(field, sanitizedValue);
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');
  const userFullName = `${formData.firstName} ${formData.lastName}`.trim();

  const resetForm = () => {
    setCurrentStep('form');
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
    setTestResults({});
  };

  // Step indicator
  const StepIndicator = () => {
    const steps = [
      { key: 'form', label: 'Ma\'lumotlar', icon: User },
      { key: 'test', label: 'Test', icon: Brain },
    ];

    return (
      <div className="flex items-center justify-center mb-8 px-4">
        <div className="flex items-center gap-4 bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white/30">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.key;

            return (
              <React.Fragment key={step.key}>
                <div
                  className={`
                flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300
                ${isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-500'
                    }
              `}
                >
                  <div
                    className={`
                  w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                  ${isActive ? 'bg-white/20' : 'bg-gray-200'}
                `}
                  >
                    <Icon
                      className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`}
                    />
                  </div>
                  <span className="font-medium hidden sm:block">{step.label}</span>
                </div>

                {index < steps.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };

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

          {/* Step Indicator */}
          <StepIndicator />

          {/* Form Step */}
          {currentStep === 'form' && (
            <form onSubmit={handleFormSubmit} className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-6 sm:p-8 lg:p-12 animate-slide-up">

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
                    onChange={(value) => handleSecureInputChange('lastName', value)}
                    placeholder="Familiyangizni kiriting"
                    required
                  />

                  <FormField
                    label="Ismi"
                    type="text"
                    value={formData.firstName}
                    onChange={(value) => handleSecureInputChange('firstName', value)}
                    placeholder="Ismingizni kiriting"
                    required
                  />

                  <FormField
                    label="Otasining ismi"
                    type="text"
                    value={formData.fatherName}
                    onChange={(value) => handleSecureInputChange('fatherName', value)}
                    placeholder="Otangizning ismini kiriting"
                    required
                  />

                  <FormField
                    label="Yoshi"
                    type="number"
                    value={formData.age}
                    onChange={(value) => handleSecureInputChange('age', value)}
                    placeholder="Yoshingizni kiriting"
                    required
                  />

                  <div className="sm:col-span-2">
                    <FormField
                      label="Telefon raqami"
                      type="tel"
                      value={formData.phone}
                      onChange={(value) => handleSecureInputChange('phone', value)}
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
                    onChange={(value) => handleSecureInputChange('currentCourse', value)}
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
                    onChange={(value) => handleSecureInputChange('direction', value)}
                    options={[
                      { value: 'axborot-xavfsizligi', label: 'Axborot xavfsizligi' },
                      { value: 'suniy-intellekt', label: "Sun'iy intellekt" },
                      { value: 'axborot-tizimlari-texnologiyalari', label: 'Axborot tizimlari va texnologiyalari' },
                      { value: 'dasturiy-injiniring', label: 'Dasturiy injiniring' },
                      { value: 'amaliy-matematika', label: 'Amaliy matematika' },
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
                    onChange={(value) => handleSecureInputChange('programmingLevel', value)}
                    icon={Code}
                    required
                  />

                  <SkillLevelSelect
                    label="Ingliz tili bilish darajasi"
                    value={formData.languageLevel}
                    onChange={(value) => handleSecureInputChange('languageLevel', value)}
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
                  onChange={(value) => handleSecureInputChange('hasNotebook', value)}
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
                  onChange={(value) => handleSecureInputChange('desiredCourse', value)}
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`
                    w-full sm:w-auto px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-500 transform flex items-center justify-center gap-3
                    ${isFormValid
                      ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-2xl hover:shadow-glow-rainbow hover:scale-105 hover:-translate-y-2 animate-gradient-x'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  <Brain className="w-6 h-6" />
                  Testni boshlash
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </form>
          )}

          {/* Test Step */}
          {currentStep === 'test' && (
            <TestStep
              onComplete={handleTestComplete}
              isSubmitting={isSubmitting}
              userFullName={userFullName}
              formData={formData}
            />
          )}

          {/* Footer */}
          <footer className="mt-16 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-500/30 p-8 text-center relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-blue-600/10 animate-gradient-x"></div>
              <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-xl animate-float"></div>
              <div className="absolute bottom-4 left-4 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-xl animate-float-delayed"></div>
            </div>

            <div className="relative z-10 space-y-6">
              {/* Main Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-pulse"></div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                    Bog'lanish
                  </h3>
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-pulse"></div>
                </div>

                <a
                  href="https://iqbolshoh.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-pink-400 hover:via-purple-400 hover:to-cyan-400 transition-all duration-500 transform hover:scale-110 animate-pulse-text"
                >
                  iqbolshoh.uz
                </a>
              </div>

              {/* Phone Numbers */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
                <a
                  href="tel:+998997799333"
                  className="flex items-center gap-3 text-white/90 hover:text-cyan-300 transition-all duration-300 font-medium text-lg bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20 hover:border-cyan-300/50 hover:bg-white/20 transform hover:scale-105 hover:shadow-xl group"
                >
                  <Phone className="w-5 h-5 group-hover:animate-bounce-gentle" />
                  +998 99 779 93 33
                </a>

                <a
                  href="tel:+998333337790"
                  className="flex items-center gap-3 text-white/90 hover:text-pink-300 transition-all duration-300 font-medium text-lg bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20 hover:border-pink-300/50 hover:bg-white/20 transform hover:scale-105 hover:shadow-xl group"
                >
                  <Phone className="w-5 h-5 group-hover:animate-bounce-gentle" />
                  +998 33 333 77 90
                </a>
              </div>

              {/* Developer Credit */}
              <div className="pt-6 border-t border-white/20">
                <div className="flex items-center justify-center gap-2 text-white/70">
                  <Code className="w-4 h-4 text-purple-400 animate-pulse" />
                  <span className="text-sm">Developer:</span>
                  <span className="font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse-text">
                    Iqbolshoh Ilhomjonov
                  </span>
                  <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
                </div>
                
                {/* Admin Link */}
                <div className="mt-4 text-center">
                  <Link
                    to="/admin"
                    className="text-xs text-white/50 hover:text-white/80 transition-all duration-300"
                  >
                    Admin
                  </Link>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-gradient-x"></div>
          </footer>
        </div>
      </div>
    </div>
  );
}