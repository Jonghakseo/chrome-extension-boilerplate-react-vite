import { resolve } from 'path';
import { makeEntryPointPlugin } from '@chrome-extension-boilerplate/hmr';
import baseConfig, {isDev} from '@chrome-extension-boilerplate/vite-base-config/vite.base.config.mjs';
import { mergeViteConfigs } from '@chrome-extension-boilerplate/utils';

const rootDir = resolve(__dirname);
const libDir = resolve(rootDir, 'lib');

export default mergeViteConfigs(baseConfig, {
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
