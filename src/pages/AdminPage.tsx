import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, LogOut, Home } from 'lucide-react';
import AdminDashboard from '../components/AdminDashboard';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check if already authenticated
  useEffect(() => {
    const authToken = sessionStorage.getItem('admin_auth');
    if (authToken === 'authenticated_iqbolshoh') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading delay for security
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username === 'iqbolshoh' && password === '$qbo|8hoh') {
      sessionStorage.setItem('admin_auth', 'authenticated_iqbolshoh');
      setIsAuthenticated(true);
    } else {
      setError('Noto\'g\'ri login yoki parol');
    }
    
    setIsLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              Admin Panel
            </h1>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleGoHome}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Bosh sahifa
              </button>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Chiqish
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard */}
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-600/20 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Go Home Button */}
        <div className="mb-6 text-center">
          <button
            onClick={handleGoHome}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-all duration-300 flex items-center gap-2 mx-auto backdrop-blur-sm border border-white/30"
          >
            <Home className="w-4 h-4" />
            Bosh sahifaga qaytish
          </button>
        </div>

        {/* Login Form */}
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse-glow">
              <Lock className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
              Admin Panel
            </h1>
            <p className="text-gray-600">
              Faqat admin foydalanuvchilari uchun
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-center animate-shake">
                {error}
              </div>
            )}

            {/* Username Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Foydalanuvchi nomi
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Login kiriting"
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 bg-white/80"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Parol
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Parolni kiriting"
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 bg-white/80"
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
              disabled={isLoading || !username || !password}
              className={`
                w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform flex items-center justify-center gap-3
                ${isLoading || !username || !password
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:from-purple-600 hover:via-pink-600 hover:to-rose-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 animate-gradient-x'
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
                  <Lock className="w-5 h-5" />
                  Kirish
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 text-center text-xs text-gray-500">
            Bu sahifa himoyalangan va faqat admin foydalanuvchilari uchun mo'ljallangan
          </div>
        </div>
      </div>
    </div>
  );
}