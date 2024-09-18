import { resolve } from 'node:path';
import { isDev, withPageConfig } from '@extension/vite-config';
import { processCssPlugin } from '@extension/hmr';
import { getEntryPoints } from './script/entryPoints';

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');

/**
 * Here is the place to add new entry points, u can straight away add new folders here to include
 * without creating folders in src dir manually.
 * @param {string[]} options.include - Folders to include !!MODIFY ME!!
 * @param {string[]} options.exclude - Folders to exclude !!MODIFY ME!!
 * @param {boolean} options.createRecursively - Create folders recursively
 * @returns {Record<string, string>}
 */
const entryPoints = getEntryPoints({ 
  include: ['page1', 'page2'], createRecursively: true 
});

export default withPageConfig({
  resolve: {
    alias: {
      '@src': srcDir,
    },
  },
  plugins: [processCssPlugin()],
  publicDir: resolve(rootDir, 'public'),
  build: {
    lib: {
      entry: entryPoints,
      name: 'contentUI',
      formats: ['es'],
      fileName: (format, entryName) =>
        isDev ? `${entryName}/index_dev.js` : `${entryName}/index.js`
    },
    outDir: resolve(rootDir, '..', '..', 'dist', 'content-ui'),
  },
});
