import { resolve } from 'path';
import baseConfig from '@chrome-extension-boilerplate/vite-base-config/vite.base.config.mjs';
import { mergeWithBaseViteConfig } from '@chrome-extension-boilerplate/utils/dist/lib/configMerger';

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');

export default mergeWithBaseViteConfig(baseConfig, {
  resolve: {
    alias: {
      '@src': srcDir,
    },
  },
  publicDir: resolve(rootDir, 'public'),
  build: {
    outDir: resolve(rootDir, '..', '..', 'dist', 'side-panel'),
  }
});
