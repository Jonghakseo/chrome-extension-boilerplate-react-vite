import { defineConfig } from 'vite';
import { resolve } from 'path';
import { watchRebuildPlugin } from '@chrome-extension-boilerplate/hmr-old';

const rootDir = resolve(__dirname);
const libDir = resolve(rootDir, 'lib');

const isDev = process.env.__DEV__ === 'true';
const isProduction = !isDev;

export default defineConfig({
  resolve: {
    alias: {
      '@lib': libDir,
    },
  },
  base: '',
  plugins: [isDev && watchRebuildPlugin()],
  build: {
    lib: {
      formats: ['iife'],
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'BackgroundScript',
      fileName: 'index',
    },
    outDir: resolve(rootDir, '..', '..', 'dist', 'background'),
    sourcemap: isDev,
    minify: isProduction,
    reportCompressedSize: isProduction,
    emptyOutDir: !isDev,
    modulePreload: true,
    rollupOptions: {
      external: ['chrome'],
    },
  },
  define: {
    'process.env.NODE_ENV': isDev ? `"development"` : `"production"`,
  },
});
