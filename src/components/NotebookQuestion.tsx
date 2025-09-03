import React from 'react';
import { Laptop, Check, X } from 'lucide-react';

interface NotebookQuestionProps {
  value: string;
  onChange: (value: string) => void;
}

export default function NotebookQuestion({ value, onChange }: NotebookQuestionProps) {
  return (
    <div className="space-y-4">
      <label className="block text-lg font-semibold text-gray-800 flex items-center gap-2">
        <Laptop className="w-5 h-5 text-indigo-600" />
        Shaxsiy notebook (kompyuter) bormi?
        <span className="text-rose-500 text-xl">*</span>
      </label>
      
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onChange('yes')}
          className={`
            p-6 rounded-xl border-2 text-center transition-all duration-300 flex flex-col items-center gap-3
            hover:shadow-lg transform hover:scale-105
            ${
              value === 'yes'
                ? 'bg-green-50 border-green-200 shadow-md'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }
          `}
        >
          <div className={`
            w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
            ${value === 'yes' ? 'bg-green-100' : 'bg-gray-100'}
          `}>
            <Check className={`w-8 h-8 ${value === 'yes' ? 'text-green-600' : 'text-gray-500'}`} />
          </div>
          
          <div>
            <h4 className={`font-semibold text-lg ${value === 'yes' ? 'text-green-600' : 'text-gray-700'}`}>
              Ha, bor
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              Shaxsiy kompyuterim mavjud
            </p>
          </div>
          
          {value === 'yes' && (
            <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          )}
        </button>

        <button
          type="button"
          onClick={() => onChange('no')}
          className={`
            p-6 rounded-xl border-2 text-center transition-all duration-300 flex flex-col items-center gap-3
            hover:shadow-lg transform hover:scale-105
            ${
              value === 'no'
                ? 'bg-red-50 border-red-200 shadow-md'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }
          `}
        >
          <div className={`
            w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
            ${value === 'no' ? 'bg-red-100' : 'bg-gray-100'}
          `}>
            <X className={`w-8 h-8 ${value === 'no' ? 'text-red-600' : 'text-gray-500'}`} />
          </div>
          
          <div>
            <h4 className={`font-semibold text-lg ${value === 'no' ? 'text-red-600' : 'text-gray-700'}`}>
              Yo'q, yo'q
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              Shaxsiy kompyuterim yo'q
            </p>
          </div>
          
          {value === 'no' && (
            <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}