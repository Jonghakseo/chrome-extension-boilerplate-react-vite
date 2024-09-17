import { resolve } from 'node:path';
import { makeEntryPointPlugin } from '@extension/hmr';
import { isDev, withPageConfig } from '@extension/vite-config';
import { readdirSync, existsSync, mkdirSync, writeFileSync, Dirent } from 'fs';
import { processCssPlugin } from '@extension/hmr';

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');

const getEntryPoints = (options: { include?: string[], exclude?: string[], createRecursively?: boolean }) => {
  const entryPoints: Record<string, string> = {};

  const foldersToProcess = options.include ||
    readdirSync(srcDir, { withFileTypes: true })
      .filter((item): item is Dirent => item.isDirectory())
      .map(item => item.name);

  foldersToProcess.forEach(folderName => {
    const shouldExclude = options.exclude && options.exclude.includes(folderName);

    if (!shouldExclude) {
      const entryFolder = resolve(srcDir, folderName);
      const entryFileTS = resolve(entryFolder, 'index.ts');
      const entryFileTSX = resolve(entryFolder, `${folderName}.tsx`);

      if (!existsSync(entryFolder) && options.createRecursively) {
        console.log('Creating folder', entryFolder);
        mkdirSync(entryFolder, { recursive: true });
        writeFileSync(entryFileTS, `export * from "./${folderName}.tsx";`);
        writeFileSync(entryFileTSX, '');
      }

      if (existsSync(entryFolder)) {
        entryPoints[folderName] = entryFileTS;
      } else {
        console.warn(`Folder "${folderName}" does not exist and was not created.`);
      }
    }
  });

  return entryPoints;
}
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
