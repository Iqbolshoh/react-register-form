import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { writeFileSync } from 'fs';
import { join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Custom middleware to handle API requests
    middlewareMode: false,
  },
  define: {
    // Custom API handler for saving students
    __SAVE_STUDENTS_API__: JSON.stringify('/api/save-students'),
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Custom plugin to handle file writing
  plugins: [
    react(),
    {
      name: 'students-api',
      configureServer(server) {
        server.middlewares.use('/api/save-students', async (req, res, next) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', () => {
              try {
                const { data } = JSON.parse(body);
                const filePath = join(process.cwd(), 'public', 'students.json');
                writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
                
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify({ success: true }));
              } catch (error) {
                console.error('Error saving students data:', error);
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Failed to save data' }));
              }
            });
          } else {
            next();
          }
        });
      },
    },
  ],
});
