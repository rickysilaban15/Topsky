import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  server: {
    // Menambahkan konfigurasi ini untuk menstabilkan file watching di lingkungan virtual
    watch: {
      usePolling: true,
      interval: 100, // Memeriksa perubahan setiap 100ms
    },
  },
  
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
