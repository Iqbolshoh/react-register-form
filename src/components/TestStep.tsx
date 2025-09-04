import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Brain, Clock, CheckCircle, Trophy, Target, AlertTriangle, Sparkles, Star } from 'lucide-react';
import { saveStudentData } from '../utils/storage';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface TestStepProps {
  onComplete: (results: {[key: number]: string}) => void;
  isSubmitting: boolean;
  userFullName: string;
  formData: any;
}

const originalQuestions: Question[] = [
  {
    id: 1,
    question: "Dasturlash tilida 'variable' nima?",
    options: [
      "Ma'lumotlarni saqlash uchun joy",
      "Dastur kodi",
      "Kompyuter xotirasi",
      "Internet aloqasi"
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "HTML nima uchun ishlatiladi?",
    options: [
      "Ma'lumotlar bazasi yaratish",
      "Web sahifa tuzilishini yaratish",
      "Rasm tahrirlash",
      "Video montaj"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "CSS ning asosiy vazifasi nima?",
    options: [
      "Ma'lumotlarni saqlash",
      "Dastur logikasini yozish",
      "Web sahifa dizaynini yaratish",
      "Ma'lumotlar bazasini boshqarish"
    ],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "JavaScript qaysi turdagi dasturlash tili?",
    options: [
      "Faqat server tomonida ishlaydigan",
      "Faqat mobil ilovalar uchun",
      "Web brauzer va serverda ishlaydigan",
      "Faqat o'yinlar uchun"
    ],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "Ma'lumotlar bazasida 'table' nima?",
    options: [
      "Kompyuter stoli",
      "Ma'lumotlarni jadval ko'rinishida saqlash",
      "Dastur fayli",
      "Internet sahifa"
    ],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "Algorithm nima?",
    options: [
      "Kompyuter dasturi",
      "Masalani yechish uchun qadamlar ketma-ketligi",
      "Dasturlash tili",
      "Internet protokoli"
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "Frontend va Backend o'rtasidagi farq nima?",
    options: [
      "Frontend - foydalanuvchi ko'radigan qism, Backend - server qismi",
      "Ikkalasi ham bir xil",
      "Frontend - server, Backend - mijoz",
      "Farq yo'q"
    ],
    correctAnswer: 0
  },
  {
    id: 8,
    question: "API nima?",
    options: [
      "Dasturlash tili",
      "Kompyuter qurilmasi",
      "Dasturlar o'rtasida ma'lumot almashish usuli",
      "Internet brauzeri"
    ],
    correctAnswer: 2
  },
  {
    id: 9,
    question: "Git nima uchun ishlatiladi?",
    options: [
      "Rasm tahrirlash",
      "Kod versiyalarini boshqarish",
      "Video montaj",
      "Musiqa tinglash"
    ],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "Responsive design nima?",
    options: [
      "Tez ishlaydigan dastur",
      "Turli qurilmalarga moslashadigan dizayn",
      "Rang sxemasi",
      "Shrift turi"
    ],
    correctAnswer: 1
  }
];

// Savollar va variantlarni aralashtirish funksiyasi
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const shuffleQuestions = (questions: Question[]): Question[] => {
  // Savollarni aralashtirish
  const shuffledQuestions = shuffleArray(questions);
  
  // Har bir savol uchun variantlarni aralashtirish va to'g'ri javobni yangilash
  return shuffledQuestions.map(question => {
    const correctOption = question.options[question.correctAnswer];
    const shuffledOptions = shuffleArray(question.options);
    const newCorrectAnswer = shuffledOptions.indexOf(correctOption);
    
    return {
      ...question,
      options: shuffledOptions,
      correctAnswer: newCorrectAnswer
    };
  });
};

export default function TestStep({ onComplete, isSubmitting, userFullName, formData }: TestStepProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [showResults, setShowResults] = useState(false);

  // Komponent yuklanganda savollarni aralashtirish
  useEffect(() => {
    const shuffled = shuffleQuestions(originalQuestions);
    setQuestions(shuffled);
  }, []);

  // Prevent page refresh
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults) {
      handleFinishTest();
    }
  }, [timeLeft, showResults]);

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex.toString()
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinishTest = async () => {
    setShowResults(true);
    
    // Test natijalarini hisoblash
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    
    // Ma'lumotlarni localStorage ga saqlash
    try {
      saveStudentData(formData, {
        percentage: percentage,
        score: score,
        totalQuestions: questions.length,
        completedAt: new Date().toISOString(),
      });
      
      console.log('Ma\'lumotlar muvaffaqiyatli saqlandi');
    } catch (error) {
      console.error('Ma\'lumotlarni saqlashda xatolik:', error);
    }
    
    onComplete(answers);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (answers[question.id] && parseInt(answers[question.id]) === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(answers).length;
  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  // Savollar yuklanmagan bo'lsa
  if (questions.length === 0) {
    return (
      <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-6 sm:p-8 lg:p-12 animate-scale-in">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Test savollar tayyorlanmoqda...</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-6 sm:p-8 lg:p-12 animate-scale-in">
        {/* Results Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-glow shadow-2xl">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
            Test yakunlandi! 🎉
          </h2>
          
          {/* User Name Display */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6 border border-indigo-200">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {userFullName}
            </h3>
            <p className="text-lg font-semibold text-green-600">
              Ma'lumotlaringiz va test natijalari muvaffaqiyatli saqlandi! ✅
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-8">
            <div className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {score}/{questions.length}
            </div>
            <div className="text-2xl font-semibold text-gray-700 mb-2">
              {percentage}% to'g'ri javob
            </div>
            <div className="text-gray-600">
              {percentage >= 80 ? 'A\'lo natija!' : 
               percentage >= 60 ? 'Yaxshi natija!' : 
               percentage >= 40 ? 'O\'rta natija' : 'Qo\'shimcha o\'rganish talab etiladi'}
            </div>
          </div>

          {/* Test Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <div className="text-sm text-green-700">To'g'ri javoblar</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{questions.length - score}</div>
              <div className="text-sm text-red-700">Noto'g'ri javoblar</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{questions.length - answeredCount}</div>
              <div className="text-sm text-gray-700">Javobsiz savollar</div>
            </div>
          </div>

          {/* Auto-save notification */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-bold text-green-800">Ma'lumotlar saqlandi</h3>
            </div>
            <p className="text-green-700 text-center">
              Sizning test natijalaringiz muvaffaqiyatli saqlandi. 
              Tez orada mutaxassislarimiz siz bilan bog'lanadi.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-6 sm:p-8 lg:p-12 animate-slide-up">
      {/* Test Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-xl animate-pulse-glow">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
            Bilim darajasini aniqlash testi
          </h2>
          <p className="text-gray-600 mt-1">Dasturlash bo'yicha asosiy savollar</p>
        </div>
        
        {/* Timer */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-xl border border-orange-200">
          <Clock className="w-5 h-5 text-orange-600" />
          <span className={`font-bold text-lg ${timeLeft < 300 ? 'text-red-600 animate-pulse' : 'text-orange-600'}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-600">
            Savol {currentQuestion + 1} / {questions.length}
          </span>
          <span className="text-sm font-medium text-gray-600">
            {answeredCount} / {questions.length} javob berildi
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 animate-gradient-x"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0" />
        <div className="text-blue-800">
          <p className="font-semibold">Muhim eslatma:</p>
          <p className="text-sm">Bilmagan savolingiz bo'lsa, keyingi savolga o'ting. Testni istalgan vaqtda yakunlashingiz mumkin.</p>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6 border border-indigo-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-white font-bold">{currentQuestion + 1}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 leading-relaxed">
                {question.question}
              </h3>
            </div>
          </div>
        </div>

        {/* Answer Options */}
        <div className="space-y-4">
          {question.options.map((option, index) => {
            const isSelected = answers[question.id] === index.toString();
            const optionLabels = ['A', 'B', 'C', 'D'];
            
            return (
              <button
                key={`${question.id}-${index}-${option}`}
                onClick={() => handleAnswerSelect(question.id, index)}
                className={`
                  w-full p-6 rounded-2xl border-2 text-left transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg
                  ${isSelected 
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-300 shadow-lg' 
                    : 'bg-white border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/30'
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300
                    ${isSelected 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-600'
                    }
                  `}>
                    {optionLabels[index]}
                  </div>
                  
                  <span className={`text-lg ${isSelected ? 'text-gray-800 font-medium' : 'text-gray-700'}`}>
                    {option}
                  </span>
                  
                  {isSelected && (
                    <div className="ml-auto">
                      <CheckCircle className="w-6 h-6 text-indigo-600" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex gap-4">
          {currentQuestion > 0 && (
            <button
              onClick={handlePrevQuestion}
              className="px-6 py-3 bg-indigo-100 border-2 border-indigo-200 text-indigo-700 rounded-xl font-semibold hover:bg-indigo-200 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-4 h-4" />
              Oldingi savol
            </button>
          )}
        </div>

        <div className="flex gap-4">
          {/* Next/Skip Question Button */}
          {currentQuestion < questions.length - 1 && (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 bg-gray-100 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              Keyingi savol
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {/* Finish Test Button - Only on last question */}
          {currentQuestion === questions.length - 1 && (
            <button
              onClick={handleFinishTest}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-xl hover:from-green-600 hover:to-emerald-700"
            >
              <Target className="w-5 h-5" />
              Testni yakunlash
            </button>
          )}
        </div>
      </div>

      {/* Question Navigation Dots */}
      <div className="flex justify-center mt-8">
        <div className="flex gap-2 bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`
                w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-125
                ${index === currentQuestion 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg' 
                  : answers[questions[index].id]
                    ? 'bg-green-400 shadow-md'
                    : 'bg-gray-300 hover:bg-gray-400'
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* Helpful Tips */}
      <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
        <Star className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5 animate-pulse" />
        <div className="text-yellow-800">
          <p className="font-semibold mb-1">Maslahat:</p>
          <ul className="text-sm space-y-1">
            <li>• Bilmagan savolingiz bo'lsa, "Keyingi savol" tugmasini bosing</li>
            <li>• Istalgan vaqtda "Testni yakunlash" tugmasini bosishingiz mumkin</li>
            <li>• Nuqtalar orqali savollar orasida harakatlanishingiz mumkin</li>
            <li>• Test yakunlanganda ma'lumotlaringiz avtomatik saqlanadi</li>
          </ul>
        </div>
      </div>
    </div>
  );
}