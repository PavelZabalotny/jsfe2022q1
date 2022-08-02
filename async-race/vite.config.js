export default {
  base: './',
  build: {
    target: 'esnext',
    sourcemap: true,
    assetsInlineLimit: 10_240,
  },
  server: {
    port: 4000,
    open: true,
    cors: true,
  },
}
