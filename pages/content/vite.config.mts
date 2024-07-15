import { resolve } from 'path';
import { makeEntryPointPlugin } from '@chrome-extension-boilerplate/hmr';
import { withPageConfig, isDev } from '@chrome-extension-boilerplate/vite-config';

const rootDir = resolve(__dirname);
const libDir = resolve(rootDir, 'lib');

export default withPageConfig({
  resolve: {
    alias: {
      '@lib': libDir,
    },
  },
  publicDir: resolve(rootDir, 'public'),
  plugins: [isDev && makeEntryPointPlugin()],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      formats: ['iife'],
      name: 'ContentScript',
      fileName: 'index',
    },
    outDir: resolve(rootDir, '..', '..', 'dist', 'content'),
    modulePreload: true,
  },
});
