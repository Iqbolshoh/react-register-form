import React from 'react';

export default function LogoHeader() {
  return (
    <div className="flex items-center justify-center gap-8 mb-12 animate-fade-in">
      {/* Iqbolshoh Logo */}
      <div className="flex items-center justify-center w-24 h-24 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 animate-float">
        <img
          src="/src/logo/iqbolshoh.svg"
          alt="Iqbolshoh Logo"
          className="w-16 h-16 object-contain"
        />
      </div>

      {/* Connecting Element */}
      <div className="flex items-center">
        <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 rounded-full animate-pulse"></div>
        <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-2 animate-bounce"></div>
        <div className="w-16 h-1 bg-gradient-to-r from-purple-600 via-blue-500 to-emerald-400 rounded-full animate-pulse"></div>
      </div>

      {/* IT Logo */}
      <div className="flex items-center justify-center w-24 h-24 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 animate-float-delayed">
        <img
          src="/src/logo/it.jpg"
          alt="IT Logo"
          className="w-16 h-16 object-contain rounded-xl"
        />
      </div>
    </div>
  );
}