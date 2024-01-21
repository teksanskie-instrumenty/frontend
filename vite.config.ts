import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://iot-proj.swisz.cz:3001/',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'http://iot-proj.swisz.cz:3001/',
        changeOrigin: true,
        secure: false,
      }
    },
  },
});
