import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/backup': {
        target: 'http://localhost:3002',
        changeOrigin: true,
      },
      '/upload': {
        target: 'http://localhost:3003',
        changeOrigin: true,
      },
      '/restore': {
        target: 'http://localhost:3004',
        changeOrigin: true,
      },
      '/analytics': {
        target: 'http://localhost:3007',
        changeOrigin: true,
      },
      '/notify': {
        target: 'http://localhost:3006',
        changeOrigin: true,
      },
      // If you have a settings endpoint, proxy it accordingly – or remove the Settings page.
    },
  },
})



