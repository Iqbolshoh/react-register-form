import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, LogOut, Home, Shield, UserCheck } from 'lucide-react';
import AdminDashboard from '../components/AdminDashboard';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const authData = sessionStorage.getItem('admin_auth_iqbolshoh');
        const authTime = sessionStorage.getItem('admin_auth_time');
        
        if (authData && authTime) {
          const loginTime = parseInt(authTime);
          const currentTime = Date.now();
          const sessionDuration = 2 * 60 * 60 * 1000; // 2 hours
          
          if (currentTime - loginTime < sessionDuration && authData === 'authenticated_iqbolshoh_2025') {
            setIsAuthenticated(true);
          } else {
            // Session expired
            sessionStorage.removeItem('admin_auth_iqbolshoh');
            sessionStorage.removeItem('admin_auth_time');
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Security delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Enhanced security check
    const validCredentials = [
      { user: 'iqbolshoh', pass: '$qbo|8hoh' },
      { user: 'admin', pass: 'admin2025!' },
    ];

    const isValid = validCredentials.some(cred => 
      cred.user === username && cred.pass === password
    );

    if (isValid) {
      const currentTime = Date.now();
      sessionStorage.setItem('admin_auth_iqbolshoh', 'authenticated_iqbolshoh_2025');
      sessionStorage.setItem('admin_auth_time', currentTime.toString());
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Noto\'g\'ri login yoki parol. Iltimos, qaytadan urinib ko\'ring.');
      // Clear form on error
      setPassword('');
    }
    
    setIsLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth_iqbolshoh');
    sessionStorage.removeItem('admin_auth_time');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setError('');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  // Loading state while checking authentication
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Tekshirilmoqda...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        {/* Enhanced Header */}
        <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
                  <p className="text-purple-200 text-sm">Talabalar ma'lumotlari boshqaruvi</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2">
                  <UserCheck className="w-4 h-4 text-green-300" />
                  <span className="text-white text-sm font-medium">Tizimga kirilgan</span>
                </div>
                
                <button
                  onClick={handleGoHome}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Bosh sahifa</span>
                </button>
                
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Chiqish</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="pb-8">
          <AdminDashboard />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-600/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-violet-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Go Home Button */}
        <div className="mb-6 text-center">
          <button
            onClick={handleGoHome}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-medium transition-all duration-300 flex items-center gap-2 mx-auto backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl"
          >
            <Home className="w-4 h-4" />
            Bosh sahifaga qaytish
          </button>
        </div>

        {/* Login Form */}
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse-glow">
              <Lock className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
              Admin Panel
            </h1>
            <p className="text-gray-600">
              Xavfsiz kirish - faqat admin foydalanuvchilari uchun
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-700 text-center animate-shake">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="w-5 h-5" />
                  <span className="font-semibold">Xavfsizlik xatosi</span>
                </div>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Username Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-indigo-600" />
                Foydalanuvchi nomi
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Login kiriting"
                required
                autoComplete="username"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 bg-white/90"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-600" />
                Parol
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Parolni kiriting"
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 bg-white/90"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !username.trim() || !password.trim()}
              className={`
                w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform flex items-center justify-center gap-3 shadow-xl
                ${isLoading || !username.trim() || !password.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:from-purple-600 hover:via-pink-600 hover:to-rose-600 text-white hover:shadow-2xl hover:scale-105 animate-gradient-x'
                }
              `}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Tekshirilmoqda...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Xavfsiz kirish
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-semibold text-gray-700">Xavfsizlik eslatmasi</span>
              </div>
              <p className="text-xs text-gray-600">
                Bu sahifa himoyalangan va faqat vakolatlangan admin foydalanuvchilari uchun mo'ljallangan.
                Barcha harakatlar kuzatiladi va qayd etiladi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}