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
    const numbers = input.replace(/\D/g, '');
    
    let formatted = numbers;
    if (!formatted.startsWith('998') && formatted.length > 0) {
      formatted = '998' + formatted;
    }
    
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
    <div className="group space-y-3">
      <label className="block text-lg font-semibold text-gray-800 flex items-center gap-2">
        {label} 
        {required && <span className="text-rose-500 text-xl animate-pulse">*</span>}
      </label>
      
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <Icon className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-all duration-300" />
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
            w-full rounded-2xl border-2 bg-white/90 backdrop-blur-sm px-4 py-4 text-gray-900 placeholder-gray-400
            focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none focus:bg-white
            transition-all duration-300 hover:border-indigo-300 hover:bg-white hover:shadow-lg
            ${Icon ? 'pl-12' : 'pl-4'}
            ${value 
              ? 'border-indigo-300 bg-indigo-50/50 shadow-md' 
              : 'border-gray-200 group-hover:border-gray-300'
            }
          `}
        />
        
        {/* Success Indicator */}
        {value && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg"></div>
          </div>
        )}
        
        {/* Focus Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>
  );
}