import { resolve } from 'path';
import { makeEntryPointPlugin } from '@extension/hmr';
import { withPageConfig, isDev } from '@extension/vite-config';

const rootDir = resolve(__dirname);
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
      entry: resolve(srcDir, 'index.tsx'),
      name: 'contentUI',
      formats: ['iife'],
      fileName: 'index',
    },
    outDir: resolve(rootDir, '..', '..', 'dist', 'content-ui'),
  },
});
