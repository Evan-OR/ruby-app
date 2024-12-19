import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // The path you want to proxy (e.g., "/api")
        target: 'http://localhost:3000', // The server you want to proxy to
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Remove "/api" prefix
      },
    },
  },
});
