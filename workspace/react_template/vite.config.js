import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/bring-foursquare-back/',
  optimizeDeps: {
    include: ['react', 'react-dom', 'tailwindcss']
  }
})
