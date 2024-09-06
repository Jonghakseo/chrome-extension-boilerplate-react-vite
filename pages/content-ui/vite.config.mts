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
  plugins: [isDev && makeEntryPointPlugin()],
  publicDir: resolve(rootDir, 'public'),
  build: {
    lib: {
      name: 'contentUI',
      fileName: 'index',
      formats: ['iife'],
      entry: resolve(srcDir, 'index.tsx'),
    },
    outDir: resolve(rootDir, '..', '..', 'dist', 'content-ui'),
  },
});
