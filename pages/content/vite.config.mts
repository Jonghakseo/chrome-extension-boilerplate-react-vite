import { resolve } from 'node:path';
import { makeEntryPointPlugin } from '@extension/hmr';
import { isDev, withPageConfig } from '@extension/vite-config';

const rootDir = resolve(import.meta.dirname);
const srcDir = resolve(rootDir, 'src');

export default withPageConfig({
  resolve: {
    alias: {
      '@src': srcDir,
    },
  },
  publicDir: resolve(rootDir, 'public'),
  plugins: [isDev && makeEntryPointPlugin()],
  build: {
    lib: {
      name: 'ContentScript',
      fileName: 'index',
      formats: ['iife'],
      entry: resolve(srcDir, 'index.ts'),
    },
    outDir: resolve(rootDir, '..', '..', 'dist', 'content'),
  },
});
