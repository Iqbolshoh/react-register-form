import React from 'react';

export default function LogoHeader() {
  return (
    <div className="flex flex-col items-center justify-center mb-16 animate-fade-in">
      {/* Logo Section */}
      <div className="flex items-center justify-center gap-6 sm:gap-8 md:gap-12 mb-8">
        {/* Iqbolshoh Logo */}
        <div className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-white/30 animate-float hover:scale-110 transition-all duration-500 group">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <img
            src="/iqbolshoh.svg"
            alt="Iqbolshoh Logo"
            className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain relative z-10 drop-shadow-lg"
          />
        </div>

        {/* Connecting Element */}
        <div className="flex items-center">
          <div className="w-12 sm:w-16 md:w-20 h-1.5 sm:h-2 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 rounded-full animate-pulse shadow-lg"></div>
          <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-2 sm:mx-3 animate-bounce shadow-xl border-2 border-white/50"></div>
          <div className="w-12 sm:w-16 md:w-20 h-1.5 sm:h-2 bg-gradient-to-r from-purple-600 via-blue-500 to-emerald-400 rounded-full animate-pulse shadow-lg"></div>
        </div>

        {/* IT Logo */}
        <div className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-white/30 animate-float-delayed hover:scale-110 transition-all duration-500 group">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-400/20 via-red-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <img
            src="/it.jpg"
            alt="IT Logo"
            className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain rounded-2xl relative z-10 drop-shadow-lg"
          />
        </div>
      </div>

      {/* University Information */}
      <div className="text-center space-y-4 max-w-4xl mx-auto px-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
          Sharof Rashidov nomidagi Samarqand davlat universiteti IT-Markazi
        </h1>
      </div>
    </div>
  );
}