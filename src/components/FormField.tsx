import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FormFieldProps {
  label: string;
  type: 'text' | 'email' | 'tel' | 'number';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  icon?: LucideIcon;
}

export default function FormField({
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  icon: Icon,
}: FormFieldProps) {
  return (
    <div className="relative group animate-slide-in-stagger">
      <label className="block text-sm font-semibold text-gray-800 mb-3">
        {label} {required && <span className="text-emerald-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-300" />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={`
            w-full rounded-xl border-2 border-gray-200 bg-white/70 backdrop-blur-sm px-4 py-3 text-gray-900 placeholder-gray-500
            focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 focus:outline-none focus:bg-white
            transition-all duration-300 group-hover:border-emerald-300 hover:bg-white/90
            ${Icon ? 'pl-12' : 'pl-4'}
            ${value ? 'border-emerald-300 bg-emerald-50/50 shadow-sm' : ''}
          `}
        />
        {value && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
}