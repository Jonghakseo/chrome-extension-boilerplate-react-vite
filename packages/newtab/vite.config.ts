import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { watchRebuildPlugin } from '@chrome-extension-boilerplate/hmr-old';

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');

const isDev = process.env.__DEV__ === 'true';
isDev && (process.env.NODE_ENV = 'development'); // if you don't need to use the JSXDevRuntime, you can remove this line
const isProduction = !isDev;

export default defineConfig({
  resolve: {
    alias: {
      '@src': srcDir,
    },
  },
  base: '',
  plugins: [react(), watchRebuildPlugin()],
  publicDir: resolve(rootDir, 'public'),
  build: {
    outDir: resolve(rootDir, '..', '..', 'dist', 'newtab'),
    sourcemap: isDev,
    minify: isProduction,
    reportCompressedSize: isProduction,
    emptyOutDir: !isDev,
    rollupOptions: {
      external: ['chrome'],
    },
  },
});
