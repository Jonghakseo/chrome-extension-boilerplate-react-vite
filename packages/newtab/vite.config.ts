import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');

const isDev = process.env.__DEV__ === 'true';
const isProduction = !isDev;

export default defineConfig({
  resolve: {
    alias: {
      '@src': srcDir,
    },
  },
  base: '',
  plugins: [react()],
  publicDir: resolve(rootDir, 'public'),
  build: {
    sourcemap: isDev,
    minify: isProduction,
    reportCompressedSize: isProduction,
    emptyOutDir: !isDev,
    rollupOptions: {
      external: ['chrome'],
    },
  },
});
