import React from 'react';
import { Code2, Palette, Server, Sparkles, Star } from 'lucide-react';

interface Course {
  value: string;
  title: string;
  description: string;
  duration: string;
  icon: React.ComponentType<any>;
  gradient: string;
  features: string[];
  price: string;
  level: string;
}

interface CourseSelectionProps {
  selectedCourse: string;
  onChange: (value: string) => void;
}

const courses: Course[] = [
  {
    value: 'cpp',
    title: 'C++ Dasturlash Asoslari',
    description: 'Fundamental dasturlash asoslari va algoritmlash',
    duration: '2 oy',
    price: '0 so\'m/oy',
    level: 'Boshlang\'ich',
    icon: Code2,
    gradient: 'from-blue-500 via-indigo-500 to-purple-600',
    features: ['OOP asoslari', 'Algoritmlash', 'Ma\'lumotlar strukturasi', 'Loyiha ishlab chiqish'],
  },
  {
    value: 'frontend',
    title: 'Web dasturlash Frontend',
    description: 'Zamonaviy web interfeyslari yaratish',
    duration: '3 oy',
    price: '300,000 so\'m/oy',
    level: 'O\'rta',
    icon: Palette,
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    features: ['HTML', 'CSS', 'JavaScript', 'Responsive dizayn'],
  },
  {
    value: 'backend',
    title: 'Web dasturlash Backend',
    description: 'Server tomonidagi ilovalar ishlab chiqish',
    duration: '4 oy',
    price: '300,000 so\'m/oy',
    level: 'Yuqori',
    icon: Server,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    features: ['PHP', 'Ma\'lumotlar bazasi (MySql)', 'API yaratish', 'Laravel'],
  },
];

export default function CourseSelection({ selectedCourse, onChange }: CourseSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => {
          const Icon = course.icon;
          const isSelected = selectedCourse === course.value;
          
          return (
            <div
              key={course.value}
              className="relative group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <button
                type="button"
                onClick={() => onChange(course.value)}
                className={`
                  w-full p-8 rounded-3xl border-2 text-left transition-all duration-700 transform
                  hover:scale-105 hover:-translate-y-4 active:scale-95
                  ${
                    isSelected
                      ? 'border-transparent bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-2xl animate-glow-rainbow'
                      : 'border-gray-200 bg-white/80 backdrop-blur-sm hover:border-gray-300 hover:shadow-2xl hover:bg-white'
                  }
                `}
              >
                {/* Floating Background Effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${course.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}></div>
                
                {/* Header */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className={`
                    w-16 h-16 rounded-2xl bg-gradient-to-br ${course.gradient} flex items-center justify-center shadow-xl
                    ${isSelected ? 'animate-spin-slow' : 'group-hover:animate-bounce-gentle'}
                  `}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Level Badge */}
                  <div className={`px-4 py-2 rounded-full text-xs font-bold ${
                    isSelected 
                      ? `bg-gradient-to-r ${course.gradient} text-white shadow-lg` 
                      : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                  }`}>
                    {course.level}
                  </div>
                </div>
                
                {/* Title and Description */}
                <div className="relative z-10 mb-6">
                  <h3 className={`text-2xl font-bold mb-3 transition-all duration-500 ${
                    isSelected 
                      ? `bg-gradient-to-r ${course.gradient} bg-clip-text text-transparent animate-pulse-text` 
                      : 'text-gray-900 group-hover:text-gray-800'
                  }`}>
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {course.description}
                  </p>
                </div>
                
                {/* Price and Duration */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className={`px-4 py-2 rounded-xl font-bold ${
                    isSelected 
                      ? 'bg-white/20 text-gray-800 shadow-lg' 
                      : 'bg-gray-50 text-gray-700 group-hover:bg-gray-100'
                  }`}>
                    {course.duration}
                  </div>
                  <div className={`text-lg font-bold ${
                    isSelected ? 'text-gray-800' : 'text-gray-600 group-hover:text-gray-800'
                  }`}>
                    {course.price}
                  </div>
                </div>
                
                {/* Features */}
                <div className="space-y-3 relative z-10">
                  {course.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex} 
                      className="flex items-center text-sm transition-all duration-300"
                      style={{ animationDelay: `${(index * 150) + (featureIndex * 100)}ms` }}
                    >
                      <div className={`
                        w-2 h-2 rounded-full mr-4 transition-all duration-500
                        ${isSelected 
                          ? `bg-gradient-to-r ${course.gradient} animate-pulse-gentle` 
                          : 'bg-gray-400 group-hover:bg-gray-600'
                        }
                      `}></div>
                      <span className={`transition-colors duration-300 ${
                        isSelected ? 'text-gray-800 font-medium' : 'text-gray-600 group-hover:text-gray-700'
                      }`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Selection Indicator */}
                {isSelected && (
                  <>
                    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 opacity-30 blur animate-pulse-rainbow"></div>
                    <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-gentle">
                      <Star className="w-4 h-4 text-white fill-current" />
                    </div>
                  </>
                )}
                
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${course.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none`}></div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}