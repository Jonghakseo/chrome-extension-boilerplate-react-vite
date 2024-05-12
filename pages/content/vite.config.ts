import { defineConfig } from 'vite';
import { resolve } from 'path';
import { makeEntryPointPlugin, watchRebuildPlugin } from '@chrome-extension-boilerplate/hmr';

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
  plugins: [isDev && watchRebuildPlugin({ refresh: true }), isDev && makeEntryPointPlugin()],
  publicDir: resolve(rootDir, 'public'),
  build: {
    lib: {
      formats: ['iife'],
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'ContentScript',
      fileName: 'index',
    },
    outDir: resolve(rootDir, '..', '..', 'dist', 'content'),
    sourcemap: isDev,
    minify: isProduction,
    reportCompressedSize: isProduction,
    modulePreload: true,
    rollupOptions: {
      external: ['chrome'],
    },
  },
  define: {
    'process.env.NODE_ENV': isDev ? `"development"` : `"production"`,
  },
});
