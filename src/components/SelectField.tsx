import React from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  required?: boolean;
}

export default function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  required = false,
}: SelectFieldProps) {
  return (
    <div className="relative group animate-slide-in-stagger">
      <label className="block text-sm font-semibold text-gray-800 mb-3">
        {label} {required && <span className="text-emerald-500">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`
            w-full rounded-xl border-2 border-gray-200 bg-white/70 backdrop-blur-sm px-4 py-3 pr-10 text-gray-900
            focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 focus:outline-none focus:bg-white
            transition-all duration-300 group-hover:border-emerald-300 hover:bg-white/90 appearance-none
            ${value ? 'border-emerald-300 bg-emerald-50/50 shadow-sm' : ''}
          `}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <ChevronDown className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-300" />
        </div>
        {value && (
          <div className="absolute inset-y-0 right-12 pr-4 flex items-center">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
}