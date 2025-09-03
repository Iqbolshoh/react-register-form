import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface SkillLevel {
  value: string;
  label: string;
  description: string;
  color: string;
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
    color: 'from-slate-400 to-slate-500',
  },
  {
    value: 'basic',
    label: 'Asosiy',
    description: 'Oddiy tushunchalar mavjud',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    value: 'intermediate',
    label: 'O\'rta',
    description: 'Yaxshi bilim va tajriba',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    value: 'advanced',
    label: 'Yuqori',
    description: 'Professional darajada',
    color: 'from-orange-400 to-red-500',
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
      <label className="block text-sm font-semibold text-gray-800 mb-4">
        <Icon className="inline w-5 h-5 mr-2 text-emerald-500" />
        {label} {required && <span className="text-emerald-500">*</span>}
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {skillLevels.map((level) => (
          <button
            key={level.value}
            type="button"
            onClick={() => onChange(level.value)}
            className={`
              p-4 rounded-xl border-2 text-left transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-1
              ${
                value === level.value
                  ? 'border-emerald-400 bg-gradient-to-br from-emerald-50 to-blue-50 shadow-xl animate-glow-subtle'
                  : 'border-gray-200 bg-white/70 backdrop-blur-sm hover:border-emerald-300 hover:shadow-lg hover:bg-white/90'
              }
            `}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className={`font-semibold ${value === level.value ? 'bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent' : 'text-gray-900'}`}>
                {level.label}
              </h3>
              {value === level.value && (
                <div className={`w-3 h-3 bg-gradient-to-r ${level.color} rounded-full animate-pulse shadow-sm`}></div>
              )}
            </div>
            <p className="text-sm text-gray-600">{level.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}