import { resolve } from 'path';
import { makeEntryPointPlugin, watchRebuildPlugin } from '@chrome-extension-boilerplate/hmr';
import * as child_process from 'child_process';
import baseConfig, {isDev} from '@chrome-extension-boilerplate/vite-base-config/vite.base.config.mjs';
import { mergeViteConfigs } from '@chrome-extension-boilerplate/utils';

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');

function buildTailwindCss() {
  child_process.execSync('pnpm build:tailwindcss', { stdio: 'inherit' });
}

export default mergeViteConfigs(baseConfig, {
  resolve: {
    alias: {
      '@src': srcDir,
    },
  },
  plugins: [
    isDev && watchRebuildPlugin({ refresh: true, onStart: buildTailwindCss }),
    isDev && makeEntryPointPlugin(),
  ],
  publicDir: resolve(rootDir, 'public'),
  build: {
    lib: {
      entry: resolve(srcDir, 'index.tsx'),
      name: 'contentUI',
      formats: ['iife'],
      fileName: 'index',
    },
    outDir: resolve(rootDir, '..', '..', 'dist', 'content-ui'),
  }
});
