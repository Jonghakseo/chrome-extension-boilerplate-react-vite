import { resolve } from 'path';
import { makeEntryPointPlugin, watchRebuildPlugin } from '@chrome-extension-boilerplate/hmr';
import * as child_process from 'child_process';
import { withPageConfig, isDev } from '@chrome-extension-boilerplate/vite-config';

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');

function buildTailwindCss() {
  child_process.execSync('pnpm build:tailwindcss', { stdio: 'inherit' });
}

export default withPageConfig({
  resolve: {
    alias: {
      '@src': srcDir,
    },
  },
  plugins: [isDev && watchRebuildPlugin({ refresh: true, onStart: buildTailwindCss }), isDev && makeEntryPointPlugin()],
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
