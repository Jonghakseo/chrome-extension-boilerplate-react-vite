import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { watchRebuildPlugin } from '@chrome-extension-boilerplate/hmr-old';

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
  plugins: [react(), isDev && watchRebuildPlugin()],
  publicDir: resolve(rootDir, 'public'),
  build: {
    outDir: resolve(rootDir, '..', '..', 'dist', 'options'),
    sourcemap: isDev,
    minify: isProduction,
    reportCompressedSize: isProduction,
    emptyOutDir: !isDev,
    rollupOptions: {
      external: ['chrome'],
    },
  },
  define: {
    'process.env.NODE_ENV': isDev ? `"development"` : `"production"`,
  },
});
