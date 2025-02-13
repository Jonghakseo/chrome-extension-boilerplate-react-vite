import { resolve } from 'node:path';
import { getContentScriptEntries } from '@extension/content-script-matches-plugin';
import { withPageConfig } from '@extension/vite-config';
import { bundleContentScriptWithHmr } from '@extension/hmr';

const rootDir = resolve(import.meta.dirname);
const srcDir = resolve(rootDir, 'src');
const matchesDir = resolve(srcDir, 'matches');
const entryPoints = getContentScriptEntries(matchesDir);
const distContentDir = resolve(import.meta.dirname, 'dist', 'matches');

export default withPageConfig({
  resolve: {
    alias: {
      '@src': srcDir,
    },
  },
  publicDir: resolve(rootDir, 'public'),
  build: {
    rollupOptions: {
      input: entryPoints,
      output: {
        dir: distContentDir,
        entryFileNames: '[name].js',
      },
    },
  },
  plugins: [bundleContentScriptWithHmr('content-runtime')],
});
