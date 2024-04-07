import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import makeManifestPlugin from './utils/plugins/make-manifest-plugin';
import { watchRebuildPlugin } from '@chrome-extension-boilerplate/hmr';

const rootDir = resolve(__dirname);
const libDir = resolve(rootDir, 'src');

const isDev = process.env.__DEV__ === 'true';
const isProduction = !isDev;

const outDir = resolve(rootDir, '..', '..', 'dist');
export default defineConfig({
  resolve: {
    alias: {
      '@root': rootDir,
      '@lib': libDir,
      '@assets': resolve(libDir, 'assets'),
    },
  },
  plugins: [makeManifestPlugin({ outDir }), isDev && watchRebuildPlugin(), react()],
  publicDir: resolve(rootDir, 'public'),
  build: {
    lib: {
      formats: ['iife'],
      entry: resolve(__dirname, 'lib/background/index.ts'),
      name: 'BackgroundScript',
      fileName: 'index',
    },
    outDir: resolve(outDir, 'background'),
    sourcemap: isDev,
    minify: isProduction,
    reportCompressedSize: isProduction,
    emptyOutDir: !isDev,
    modulePreload: true,
    rollupOptions: {
      external: ['chrome'],
    },
  },
});
