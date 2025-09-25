/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/apiuser/',  
})*/

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/apiuser/',  // frontend base path after Jenkins deploy
  server: {
    proxy: {
      // Redirect /userpractice calls to backend in dev
      '/userpractice': 'http://localhost:2030'
    }
  }
})
