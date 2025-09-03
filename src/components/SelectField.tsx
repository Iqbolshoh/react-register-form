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
    <div className="group space-y-3">
      <label className="block text-lg font-semibold text-gray-800 flex items-center gap-2">
        {label} 
        {required && <span className="text-rose-500 text-xl animate-pulse">*</span>}
      </label>
      
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`
            w-full rounded-2xl border-2 bg-white/90 backdrop-blur-sm px-4 py-4 pr-12 text-gray-900 appearance-none
            focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none focus:bg-white
            transition-all duration-300 hover:border-indigo-300 hover:bg-white hover:shadow-lg
            ${value 
              ? 'border-indigo-300 bg-indigo-50/50 shadow-md' 
              : 'border-gray-200 group-hover:border-gray-300'
            }
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
        
        {/* Dropdown Arrow */}
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <ChevronDown className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 group-focus-within:animate-bounce-gentle transition-all duration-300" />
        </div>
        
        {/* Success Indicator */}
        {value && (
          <div className="absolute inset-y-0 right-12 pr-4 flex items-center">
            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg"></div>
          </div>
        )}
        
        {/* Focus Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>
  );
}