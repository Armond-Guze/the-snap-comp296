import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // vite configuration for the development server
  server: {
  proxy: {
    "/api": "http://localhost:3001",
  },
},
})
