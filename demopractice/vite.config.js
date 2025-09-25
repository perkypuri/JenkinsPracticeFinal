export default defineConfig({
  plugins: [react()],
  base: '/apiuser/',
  server: {
    proxy: {
      '/userpractice': 'http://localhost:2001' // dev only
    },
  },
});
