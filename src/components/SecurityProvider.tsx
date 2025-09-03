import React, { useEffect, useState } from 'react';

interface SecurityProviderProps {
  children: React.ReactNode;
}

interface SecurityState {
  requestCount: number;
  lastRequestTime: number;
  isBlocked: boolean;
  blockUntil: number;
}

export default function SecurityProvider({ children }: SecurityProviderProps) {
  const [securityState, setSecurityState] = useState<SecurityState>({
    requestCount: 0,
    lastRequestTime: 0,
    isBlocked: false,
    blockUntil: 0,
  });

  // Rate limiting: Max 100 requests per minute
  const MAX_REQUESTS_PER_MINUTE = 100;
  const BLOCK_DURATION = 60000; // 1 minute

  useEffect(() => {
    // Security headers and CSP
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self';";
    document.head.appendChild(meta);

    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable F12, Ctrl+Shift+I, Ctrl+U
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C')
      ) {
        e.preventDefault();
      }
    };

    // Disable text selection on sensitive areas
    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('.no-select')) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('selectstart', handleSelectStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectstart', handleSelectStart);
      document.head.removeChild(meta);
    };
  }, []);

  // Rate limiting check
  const checkRateLimit = () => {
    const now = Date.now();
    
    if (securityState.isBlocked && now < securityState.blockUntil) {
      return false;
    }

    if (now - securityState.lastRequestTime > 60000) {
      // Reset counter after 1 minute
      setSecurityState({
        requestCount: 1,
        lastRequestTime: now,
        isBlocked: false,
        blockUntil: 0,
      });
      return true;
    }

    if (securityState.requestCount >= MAX_REQUESTS_PER_MINUTE) {
      setSecurityState(prev => ({
        ...prev,
        isBlocked: true,
        blockUntil: now + BLOCK_DURATION,
      }));
      return false;
    }

    setSecurityState(prev => ({
      ...prev,
      requestCount: prev.requestCount + 1,
      lastRequestTime: now,
    }));
    return true;
  };

  // Provide security context
  const securityContext = {
    checkRateLimit,
    isBlocked: securityState.isBlocked,
  };

  if (securityState.isBlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-red-200 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Xavfsizlik cheklovi
          </h2>
          <p className="text-gray-700 mb-6">
            Juda ko'p so'rov yuborildi. Iltimos, bir daqiqa kuting va qaytadan urinib ko'ring.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
          >
            Sahifani yangilash
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="no-select">
      {children}
    </div>
  );
}