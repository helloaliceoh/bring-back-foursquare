import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/bring-foursquare-back/', // 👈 Matches your deployment path
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  publicDir: "public", // 👈 Ensures Netlify picks up _redirects
  optimizeDeps: {
    include: ['react', 'react-dom', 'tailwindcss']
  }
})
