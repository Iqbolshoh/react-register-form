import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/storage': 'http://localhost:3001',
      '/students': 'http://localhost:3001',
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
