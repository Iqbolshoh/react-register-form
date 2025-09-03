import React from 'react';
import { DivideIcon as LucideIcon, Star, Award, Trophy, Crown } from 'lucide-react';

interface SkillLevel {
  value: string;
  label: string;
  description: string;
  gradient: string;
  icon: React.ComponentType<any>;
  borderColor: string;
  textColor: string;
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
    label: 'Boshlang\'ich',
    description: 'Hech qanday tajriba yo\'q',
    gradient: 'from-rose-400 via-pink-500 to-red-500',
    icon: Star,
    borderColor: 'border-rose-300',
    textColor: 'text-rose-700',
  },
  {
    value: 'basic',
    label: 'Asosiy',
    description: 'Oddiy tushunchalar mavjud',
    gradient: 'from-amber-400 via-orange-500 to-yellow-500',
    icon: Award,
    borderColor: 'border-amber-300',
    textColor: 'text-amber-700',
  },
  {
    value: 'intermediate',
    label: 'O\'rta',
    description: 'Yaxshi bilim va tajriba',
    gradient: 'from-emerald-400 via-green-500 to-teal-500',
    icon: Trophy,
    borderColor: 'border-emerald-300',
    textColor: 'text-emerald-700',
  },
  {
    value: 'advanced',
    label: 'Yuqori',
    description: 'Professional darajada',
    gradient: 'from-violet-400 via-purple-500 to-indigo-500',
    icon: Crown,
    borderColor: 'border-violet-300',
    textColor: 'text-violet-700',
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
    <div className="animate-slide-in-stagger">
      <label className="block text-lg font-bold text-gray-800 mb-6 flex items-center">
        <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          {label}
        </span>
        {required && <span className="text-rose-500 ml-2 text-xl">*</span>}
      </label>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skillLevels.map((level, index) => {
          const LevelIcon = level.icon;
          const isSelected = value === level.value;
          
          return (
            <button
              key={level.value}
              type="button"
              onClick={() => onChange(level.value)}
              className={`
                group relative p-6 rounded-2xl border-3 text-left transition-all duration-500 transform hover:scale-[1.08] hover:-translate-y-3
                ${
                  isSelected
                    ? `${level.borderColor} bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-2xl animate-pulse-glow`
                    : 'border-gray-200 bg-white/60 backdrop-blur-md hover:border-cyan-300 hover:shadow-2xl hover:bg-white/90'
                }
              `}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Background Gradient Effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${level.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Icon and Selection Indicator */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className={`
                  w-14 h-14 rounded-2xl bg-gradient-to-br ${level.gradient} flex items-center justify-center shadow-xl
                  ${isSelected ? 'animate-bounce-subtle' : 'group-hover:animate-pulse'}
                `}>
                  <LevelIcon className="w-7 h-7 text-white" />
                </div>
                
                {isSelected && (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-ping"></div>
                    <div className="w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-pulse shadow-lg"></div>
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                  isSelected 
                    ? `bg-gradient-to-r ${level.gradient} bg-clip-text text-transparent` 
                    : 'text-gray-900 group-hover:text-cyan-700'
                }`}>
                  {level.label}
                </h3>
                
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                  isSelected ? level.textColor : 'text-gray-600 group-hover:text-gray-700'
                }`}>
                  {level.description}
                </p>
              </div>
              
              {/* Progress Indicator */}
              <div className="mt-4 relative z-10">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${level.gradient} transition-all duration-700 ${
                      isSelected ? 'w-full animate-pulse' : 'w-0 group-hover:w-1/3'
                    }`}
                  ></div>
                </div>
              </div>
              
              {/* Selection Ring */}
              {isSelected && (
                <div className="absolute inset-0 rounded-2xl border-4 border-cyan-400 animate-pulse pointer-events-none"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}