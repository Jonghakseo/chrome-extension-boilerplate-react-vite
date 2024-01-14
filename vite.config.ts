/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path, { resolve } from 'path';
import makeManifest from './utils/plugins/make-manifest';
import customDynamicImport from './utils/plugins/custom-dynamic-import';
import addHmr from './utils/plugins/add-hmr';
import watchRebuild from './utils/plugins/watch-rebuild';
import inlineVitePreloadScript from './utils/plugins/inline-vite-preload-script';

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');
const pagesDir = resolve(srcDir, 'pages');
const assetsDir = resolve(srcDir, 'assets');
const outDir = resolve(rootDir, 'dist');
const publicDir = resolve(rootDir, 'public');

const isDev = process.env.__DEV__ === 'true';
const isProduction = !isDev;

// ENABLE HMR IN BACKGROUND SCRIPT
const enableHmrInBackgroundScript = true;
const cacheInvalidationKeyRef = { current: generateKey() };

export default defineConfig({
  resolve: {
    alias: {
      '@root': rootDir,
      '@src': srcDir,
      '@assets': assetsDir,
      '@pages': pagesDir,
    },
  },
  plugins: [
    makeManifest({
      getCacheInvalidationKey,
    }),
    react(),
    customDynamicImport(),
    addHmr({ background: enableHmrInBackgroundScript, view: true }),
    isDev && watchRebuild({ afterWriteBundle: regenerateCacheInvalidationKey }),
    inlineVitePreloadScript(),
  ],
  publicDir,
  build: {
    outDir,
    /** Can slow down build speed. */
    // sourcemap: isDev,
    minify: isProduction,
    modulePreload: false,
    reportCompressedSize: isProduction,
    emptyOutDir: !isDev,
    rollupOptions: {
      input: {
        devtools: resolve(pagesDir, 'devtools', 'index.html'),
        panel: resolve(pagesDir, 'panel', 'index.html'),
        contentInjected: resolve(pagesDir, 'content', 'injected', 'index.ts'),
        contentUI: resolve(pagesDir, 'content', 'ui', 'index.ts'),
        background: resolve(pagesDir, 'background', 'index.ts'),
        contentStyle: resolve(pagesDir, 'content', 'style.scss'),
        popup: resolve(pagesDir, 'popup', 'index.html'),
        newtab: resolve(pagesDir, 'newtab', 'index.html'),
        options: resolve(pagesDir, 'options', 'index.html'),
        sidepanel: resolve(pagesDir, 'sidepanel', 'index.html'),
      },
      output: {
        entryFileNames: 'src/pages/[name]/index.js',
        chunkFileNames: isDev ? 'assets/js/[name].js' : 'assets/js/[name].[hash].js',
        assetFileNames: assetInfo => {
          const { name } = path.parse(assetInfo.name);
          const assetFileName = name === 'contentStyle' ? `${name}${getCacheInvalidationKey()}` : name;
          return `assets/[ext]/${assetFileName}.chunk.[ext]`;
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.test.ts', '**/*.test.tsx'],
    setupFiles: './test-utils/vitest.setup.js',
  },
});

function getCacheInvalidationKey() {
  return cacheInvalidationKeyRef.current;
}
function regenerateCacheInvalidationKey() {
  cacheInvalidationKeyRef.current = generateKey();
  return cacheInvalidationKeyRef;
}

function generateKey(): string {
  return `${Date.now().toFixed()}`;
}
