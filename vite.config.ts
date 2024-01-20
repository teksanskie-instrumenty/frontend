import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://iot-proj.swisz.cz:3001/',
        changeOrigin: true,
        secure: false
      },
      '/user-info': {
        target: 'http://iot-proj.swisz.cz:3001/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
