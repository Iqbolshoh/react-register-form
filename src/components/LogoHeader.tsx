import React from 'react';

export default function LogoHeader() {
  return (
    <div className="flex items-center justify-center gap-12 mb-16 animate-fade-in">
      {/* Iqbolshoh Logo */}
      <div className="flex items-center justify-center w-32 h-32 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-white/30 animate-float hover:scale-110 transition-all duration-500 group">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <img
          src="/src/logo/iqbolshoh.svg"
          alt="Iqbolshoh Logo"
          className="w-20 h-20 object-contain relative z-10 drop-shadow-lg"
        />
      </div>

      {/* Connecting Element */}
      <div className="flex items-center">
        <div className="w-20 h-2 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 rounded-full animate-pulse shadow-lg"></div>
        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-3 animate-bounce shadow-xl border-2 border-white/50"></div>
        <div className="w-20 h-2 bg-gradient-to-r from-purple-600 via-blue-500 to-emerald-400 rounded-full animate-pulse shadow-lg"></div>
      </div>

      {/* IT Logo */}
      <div className="flex items-center justify-center w-32 h-32 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-white/30 animate-float-delayed hover:scale-110 transition-all duration-500 group">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-400/20 via-red-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <img
          src="/src/logo/it.jpg"
          alt="IT Logo"
          className="w-20 h-20 object-contain rounded-2xl relative z-10 drop-shadow-lg"
        />
      </div>
    </div>
  );
}