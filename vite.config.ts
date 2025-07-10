import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/focus-frame/', // Set the base path for GitHub Pages
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    exclude: ['lucide-react',]
  }
})
