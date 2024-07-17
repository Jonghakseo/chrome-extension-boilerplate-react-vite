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
  plugins: [isDev && makeEntryPointPlugin()],
  publicDir: resolve(rootDir, 'public'),
  build: {
    lib: {
      formats: ['iife'],
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'ContentRuntimeScript',
      fileName: 'index',
    },
    outDir: resolve(rootDir, '..', '..', 'dist', 'content-runtime'),
  },
});
