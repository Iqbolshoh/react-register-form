import React from 'react';

export default function LogoHeader() {
  return (
    <div className="flex items-center justify-center gap-8 mb-12 animate-fade-in">
      {/* Iqbolshoh Logo */}
      <div className="flex items-center justify-center w-24 h-24 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 animate-float">
        <svg
          viewBox="0 0 1080 1080"
          className="w-16 h-16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            fill="url(#grad1)"
            points="607.6,544.9 591,613.2 959.8,456.5 666.1,319 650.5,377.6 803.7,455.5"
          />
          <polygon
            fill="url(#grad1)"
            points="120.2,451.2 423.8,585.6 438.9,527.1 273.9,451.7 484.1,351.8 500.7,287.6"
          />
          <path
            stroke="#000000"
            strokeMiterlimit="10"
            fill="none"
            d="M496.1,611.2l2.7,0.8c14.8,4.3,30.2-4.1,34.6-18.6L590,403.5c4.3-14.5-4.1-29.8-18.9-34.1l-2.7-0.8c-14.8-4.3-30.2,4.1-34.6,18.6l-56.5,189.8C472.9,591.6,481.4,606.9,496.1,611.2z"
          />
          <path
            fill="url(#grad1)"
            d="M584.2,347.8L584.2,347.8c16.2,0,29.3-12.9,29.3-28.8l0,0c0-15.9-13.1-28.8-29.3-28.8l0,0c-16.2,0-29.3,12.9-29.3,28.8l0,0C554.9,334.9,568,347.8,584.2,347.8z"
          />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Connecting Element */}
      <div className="flex items-center">
        <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 rounded-full animate-pulse"></div>
        <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-2 animate-bounce"></div>
        <div className="w-16 h-1 bg-gradient-to-r from-purple-600 via-blue-500 to-emerald-400 rounded-full animate-pulse"></div>
      </div>

      {/* IT Logo */}
      <div className="flex items-center justify-center w-24 h-24 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 animate-float-delayed">
        <div className="relative">
          {/* IT Logo Recreation */}
          <div className="flex items-center">
            {/* Green circle and shape */}
            <div className="relative">
              <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full"></div>
              <div className="absolute -bottom-2 -left-1 w-8 h-4 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-b-full"></div>
            </div>
            {/* Blue 't' shape */}
            <div className="relative ml-1">
              <div className="w-8 h-12 bg-gradient-to-b from-blue-600 to-blue-800 rounded-r-full"></div>
              <div className="absolute top-6 right-0 flex items-center text-emerald-500 font-bold text-lg">
                IT
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}