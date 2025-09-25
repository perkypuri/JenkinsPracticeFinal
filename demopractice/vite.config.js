/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/apiuser/',  // matches your Tomcat deployment folder
  build: {
    outDir: 'dist'
  }
})
*/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/apiuser/',  // matches your Tomcat deployment folder
  build: { outDir: 'dist' },
  server: {
    proxy: {
      '/user': 'http://localhost:2001',  // dev proxy
    }
  }
})
