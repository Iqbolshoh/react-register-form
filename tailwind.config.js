/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 1s ease-out',
        'slide-in': 'slideIn 0.6s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'float': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out infinite 3s',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-gentle': 'pulseGentle 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'bounce-gentle': 'bounceGentle 3s ease-in-out infinite',
        'bounce-glow': 'bounceGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'gradient-x': 'gradientX 4s ease infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'pulse-rainbow': 'pulseRainbow 4s ease-in-out infinite',
        'glow-rainbow': 'glowRainbow 3s ease-in-out infinite',
        'pulse-text': 'pulseText 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-30px) rotate(2deg)' },
          '66%': { transform: 'translateY(-15px) rotate(-1deg)' },
        },
        pulseGentle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        bounceGlow: {
          '0%, 100%': { 
            transform: 'translateY(0) scale(1)',
            boxShadow: '0 10px 40px rgba(34, 197, 94, 0.4)',
          },
          '50%': { 
            transform: 'translateY(-10px) scale(1.05)',
            boxShadow: '0 20px 60px rgba(34, 197, 94, 0.6)',
          },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)',
            transform: 'scale(1)',
          },
          '50%': { 
            boxShadow: '0 0 50px rgba(99, 102, 241, 0.7)',
            transform: 'scale(1.02)',
          },
        },
        pulseRainbow: {
          '0%': { boxShadow: '0 0 40px rgba(236, 72, 153, 0.5)' },
          '25%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.5)' },
          '75%': { boxShadow: '0 0 40px rgba(16, 185, 129, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(236, 72, 153, 0.5)' },
        },
        glowRainbow: {
          '0%': { boxShadow: '0 10px 50px rgba(236, 72, 153, 0.4)' },
          '33%': { boxShadow: '0 10px 50px rgba(139, 92, 246, 0.4)' },
          '66%': { boxShadow: '0 10px 50px rgba(59, 130, 246, 0.4)' },
          '100%': { boxShadow: '0 10px 50px rgba(236, 72, 153, 0.4)' },
        },
        pulseText: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow-rainbow': '0 0 40px rgba(236, 72, 153, 0.3), 0 0 80px rgba(139, 92, 246, 0.2)',
        'elegant': '0 20px 60px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};