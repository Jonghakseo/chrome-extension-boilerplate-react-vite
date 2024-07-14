import { resolve } from 'path';
import libAssetsPlugin from '@laynezh/vite-plugin-lib-assets';
import makeManifestPlugin from './utils/plugins/make-manifest-plugin';
import { watchPublicPlugin } from '@chrome-extension-boilerplate/hmr';
import baseConfig from '@chrome-extension-boilerplate/vite-base-config/vite.base.config.mjs';
import { mergeWithBaseViteConfig } from '@chrome-extension-boilerplate/utils';

const rootDir = resolve(__dirname);
const libDir = resolve(rootDir, 'lib');

const outDir = resolve(rootDir, '..', 'dist');

export default mergeWithBaseViteConfig(baseConfig, {
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
    modulePreload: true,
  },
});
