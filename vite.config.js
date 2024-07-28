import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.VITE_API': JSON.stringify(process.env.VITE_API),
  },
  plugins: [react()],
})
