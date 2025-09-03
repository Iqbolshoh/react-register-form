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
  formatPhone?: boolean;
}

export default function FormField({
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  icon: Icon,
  formatPhone = false,
}: FormFieldProps) {
  const formatPhoneNumber = (input: string) => {
    // Faqat raqamlarni qoldirish
    const numbers = input.replace(/\D/g, '');
    
    // Agar 998 bilan boshlanmasa, qo'shish
    let formatted = numbers;
    if (!formatted.startsWith('998') && formatted.length > 0) {
      formatted = '998' + formatted;
    }
    
    // Formatlash: +998 (XX) XXX-XX-XX
    if (formatted.length >= 3) {
      let result = '+' + formatted.substring(0, 3);
      if (formatted.length > 3) {
        result += ' (' + formatted.substring(3, 5);
        if (formatted.length > 5) {
          result += ') ' + formatted.substring(5, 8);
          if (formatted.length > 8) {
            result += '-' + formatted.substring(8, 10);
            if (formatted.length > 10) {
              result += '-' + formatted.substring(10, 12);
            }
          }
        }
      }
      return result;
    }
    
    return formatted ? '+' + formatted : '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    if (formatPhone && type === 'tel') {
      const formatted = formatPhoneNumber(inputValue);
      onChange(formatted);
    } else {
      onChange(inputValue);
    }
  };

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
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          maxLength={formatPhone && type === 'tel' ? 19 : undefined}
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