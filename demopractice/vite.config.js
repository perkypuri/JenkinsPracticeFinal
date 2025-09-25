import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/apiuser/',  // matches your Tomcat deployment folder
  build: {
    outDir: 'dist'
  }
})
