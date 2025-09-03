import React from 'react';
import { DivideIcon as LucideIcon, Star, Award, Trophy, Crown } from 'lucide-react';

interface SkillLevel {
  value: string;
  label: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ComponentType<any>;
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
    description: 'Hech qanday bilim yo\'q',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    icon: Star,
  },
  {
    value: 'basic',
    label: 'Asosiy',
    description: 'Oddiy tushunchalar bor',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    icon: Award,
  },
  {
    value: 'intermediate',
    label: 'O\'rta',
    description: 'Yaxshi bilim va tajriba',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    icon: Trophy,
  },
  {
    value: 'advanced',
    label: 'Yuqori',
    description: 'Professional daraja',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    icon: Crown,
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
    <div className="space-y-4">
      <label className="block text-lg font-semibold text-gray-800 flex items-center gap-2">
        <Icon className="w-5 h-5 text-indigo-600" />
        {label}
        {required && <span className="text-rose-500 text-xl">*</span>}
      </label>
      
      <div className="space-y-3">
        {skillLevels.map((level) => {
          const LevelIcon = level.icon;
          const isSelected = value === level.value;
          
          return (
            <button
              key={level.value}
              type="button"
              onClick={() => onChange(level.value)}
              className={`
                w-full p-4 rounded-xl border-2 text-left transition-all duration-300 flex items-center gap-4
                hover:shadow-lg transform hover:scale-[1.02]
                ${
                  isSelected
                    ? `${level.bgColor} ${level.borderColor} shadow-md`
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className={`
                w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300
                ${isSelected ? level.bgColor : 'bg-gray-100'}
              `}>
                <LevelIcon className={`w-6 h-6 ${isSelected ? level.color : 'text-gray-500'}`} />
              </div>
              
              <div className="flex-1">
                <h4 className={`font-semibold text-lg ${isSelected ? level.color : 'text-gray-700'}`}>
                  {level.label}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {level.description}
                </p>
              </div>
              
              {isSelected && (
                <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}