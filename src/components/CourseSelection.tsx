import React from 'react';
import { Code2, Palette, Server } from 'lucide-react';

interface Course {
  value: string;
  title: string;
  description: string;
  duration: string;
  icon: React.ComponentType<any>;
  gradient: string;
  features: string[];
}

interface CourseSelectionProps {
  selectedCourse: string;
  onChange: (value: string) => void;
}

const courses: Course[] = [
  {
    value: 'cpp',
    title: 'C++ Dasturlash',
    description: 'Fundamental dasturlash asoslari va algoritmlash',
    duration: '6 oy',
    icon: Code2,
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
    features: ['OOP asoslari', 'Algoritmlash', 'Ma\'lumotlar strukturasi', 'Loyiha ishlab chiqish'],
  },
  {
    value: 'frontend',
    title: 'Frontend Development',
    description: 'Zamonaviy web interfeyslari yaratish',
    duration: '8 oy',
    icon: Palette,
    gradient: 'from-rose-500 via-pink-500 to-purple-600',
    features: ['HTML/CSS/JavaScript', 'React.js', 'TypeScript', 'Responsive dizayn'],
  },
  {
    value: 'backend',
    title: 'Backend Development',
    description: 'Server tomonidagi ilovalar ishlab chiqish',
    duration: '10 oy',
    icon: Server,
    gradient: 'from-emerald-500 via-teal-500 to-green-600',
    features: ['Node.js/Python', 'Ma\'lumotlar bazasi', 'API yaratish', 'Cloud texnologiyalari'],
  },
];

export default function CourseSelection({ selectedCourse, onChange }: CourseSelectionProps) {
  return (
    <div className="animate-slide-up-stagger">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => {
          const Icon = course.icon;
          const isSelected = selectedCourse === course.value;
          
          return (
            <button
              key={course.value}
              type="button"
              onClick={() => onChange(course.value)}
              className={`
                p-6 rounded-2xl border-2 text-left transition-all duration-500 transform hover:scale-[1.05] hover:-translate-y-2
                ${
                  isSelected
                    ? 'border-emerald-400 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 shadow-2xl animate-rainbow-glow'
                    : 'border-gray-200 bg-white/70 backdrop-blur-sm hover:border-emerald-300 hover:shadow-xl hover:bg-white/90'
                }
              `}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${course.gradient} flex items-center justify-center shadow-lg animate-pulse-glow`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {isSelected && (
                  <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full flex items-center justify-center animate-bounce-subtle shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
              
              <h3 className={`text-xl font-bold mb-2 ${isSelected ? 'bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent' : 'text-gray-900'}`}>
                {course.title}
              </h3>
              
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {course.description}
              </p>
              
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                isSelected ? 'bg-gradient-to-r from-emerald-200 to-blue-200 text-emerald-800' : 'bg-gray-100 text-gray-600'
              }`}>
                Davomiyligi: {course.duration}
              </div>
              
              <div className="space-y-2">
                {course.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <div className={`w-1.5 h-1.5 rounded-full mr-3 ${isSelected ? 'bg-gradient-to-r from-emerald-500 to-blue-600' : 'bg-gray-400'}`}></div>
                    {feature}
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}