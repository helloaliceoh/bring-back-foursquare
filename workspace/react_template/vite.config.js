import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/' : '/bring-foursquare-back/',
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  publicDir: "public",
  optimizeDeps: {
    include: ['react', 'react-dom', 'tailwindcss']
  }
})