import { defineConfig } from 'vite';
import { resolve } from 'path';
import libAssetsPlugin from '@laynezh/vite-plugin-lib-assets';
import makeManifestPlugin from './utils/plugins/make-manifest-plugin';
import { watchPublicPlugin, watchRebuildPlugin } from '@chrome-extension-boilerplate/hmr';
import { isDev, isProduction } from '@chrome-extension-boilerplate/vite-config';

const rootDir = resolve(__dirname);
const libDir = resolve(rootDir, 'lib');

const outDir = resolve(rootDir, '..', 'dist');
export default defineConfig({
  resolve: {
    alias: {
      '@root': rootDir,
      '@lib': libDir,
      '@assets': resolve(libDir, 'assets'),
    },
  },
  plugins: [
    libAssetsPlugin({
      outputPath: outDir,
    }),
    watchPublicPlugin(),
    makeManifestPlugin({ outDir }),
    isDev && watchRebuildPlugin({ reload: true }),
  ],
  publicDir: resolve(rootDir, 'public'),
  build: {
    lib: {
      formats: ['iife'],
      entry: resolve(__dirname, 'lib/background/index.ts'),
      name: 'BackgroundScript',
      fileName: 'background',
    },
    outDir,
    emptyOutDir: false,
    sourcemap: isDev,
    minify: isProduction,
    reportCompressedSize: isProduction,
    modulePreload: true,
    rollupOptions: {
      external: ['chrome'],
    },
  },
});
