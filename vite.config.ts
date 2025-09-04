import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // PHP fayllar uchun proxy sozlamalari
    proxy: {
      '/save-student.php': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/save-student\.php/, '/save-student.php')
      },
      '/clear-students.php': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/clear-students\.php/, '/clear-students.php')
      },
      '/delete-student.php': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/delete-student\.php/, '/delete-student.php')
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});