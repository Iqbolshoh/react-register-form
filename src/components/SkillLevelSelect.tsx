import React from 'react';
import { DivideIcon as LucideIcon, Zap, Rocket, Crown, Sparkles } from 'lucide-react';

interface SkillLevel {
  value: string;
  label: string;
  description: string;
  gradient: string;
  icon: React.ComponentType<any>;
  bgColor: string;
  textColor: string;
  shadowColor: string;
}

interface SkillLevelSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: LucideIcon;
  required?: boolean;
}

const skillLevels: SkillLevel[] = [
  {
    value: 'beginner',
    label: 'Yangi boshlovchi',
    description: 'Hech qanday tajriba yo\'q, o\'rganishga tayyor',
    gradient: 'from-pink-400 via-rose-400 to-red-400',
    icon: Zap,
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-700',
    shadowColor: 'shadow-pink-200',
  },
  {
    value: 'basic',
    label: 'Asosiy bilim',
    description: 'Oddiy tushunchalar va asoslar mavjud',
    gradient: 'from-orange-400 via-amber-400 to-yellow-400',
    icon: Sparkles,
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    shadowColor: 'shadow-orange-200',
  },
  {
    value: 'intermediate',
    label: 'O\'rta daraja',
    description: 'Yaxshi bilim va amaliy tajriba',
    gradient: 'from-emerald-400 via-teal-400 to-cyan-400',
    icon: Rocket,
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    shadowColor: 'shadow-emerald-200',
  },
  {
    value: 'advanced',
    label: 'Yuqori daraja',
    description: 'Professional darajada bilim va ko\'nikma',
    gradient: 'from-violet-400 via-purple-400 to-indigo-400',
    icon: Crown,
    bgColor: 'bg-violet-50',
    textColor: 'text-violet-700',
    shadowColor: 'shadow-violet-200',
  },
];

export default function SkillLevelSelect({
  label,
  value,
  onChange,
  icon: Icon,
  required = false,
}: SkillLevelSelectProps) {
  return (
    <div className="space-y-6">
      <label className="block text-xl font-bold text-gray-800 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {label}
        </span>
        {required && <span className="text-rose-500 text-2xl">*</span>}
      </label>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {skillLevels.map((level, index) => {
          const LevelIcon = level.icon;
          const isSelected = value === level.value;
          
          return (
            <div
              key={level.value}
              className="relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                type="button"
                onClick={() => onChange(level.value)}
                className={`
                  w-full p-6 rounded-2xl border-2 text-center transition-all duration-500 transform
                  hover:scale-105 hover:-translate-y-2 active:scale-95
                  ${
                    isSelected
                      ? `border-transparent bg-gradient-to-br ${level.gradient} text-white shadow-2xl ${level.shadowColor} animate-bounce-gentle`
                      : `border-gray-200 ${level.bgColor} hover:border-gray-300 hover:shadow-xl`
                  }
                `}
              >
                {/* Animated Background */}
                {!isSelected && (
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${level.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                )}
                
                {/* Icon */}
                <div className={`
                  w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-500
                  ${
                    isSelected
                      ? 'bg-white/20 backdrop-blur-sm shadow-lg animate-pulse-soft'
                      : `bg-gradient-to-br ${level.gradient} group-hover:scale-110`
                  }
                `}>
                  <LevelIcon className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-white'}`} />
                </div>
                
                {/* Title */}
                <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                  isSelected ? 'text-white' : `${level.textColor} group-hover:text-gray-800`
                }`}>
                  {level.label}
                </h3>
                
                {/* Description */}
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                  isSelected ? 'text-white/90' : 'text-gray-600 group-hover:text-gray-700'
                }`}>
                  {level.description}
                </p>
                
                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}