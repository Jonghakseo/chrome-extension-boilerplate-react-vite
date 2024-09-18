import { resolve } from 'node:path';
import { withPageConfig } from '@extension/vite-config';
import { processCssPlugin } from '@extension/hmr';

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');

export default withPageConfig({
  resolve: {
    alias: {
      '@src': srcDir,
    },
  },
  plugins: [processCssPlugin()],
  publicDir: resolve(rootDir, 'public'),
  build: {
    outDir: resolve(rootDir, '..', '..', 'dist', 'options'),
  },
});
