import { readdirSync, existsSync, mkdirSync, writeFileSync, Dirent, readFileSync, renameSync } from 'fs';
import { resolve } from 'node:path';

const rootDir = resolve(__dirname, '..');
const srcDir = resolve(rootDir, 'src');

export const getEntryPoints = (options: { include?: string[]; exclude?: string[]; createRecursively?: boolean }) => {
  const entryPoints: Record<string, string> = {};

  const foldersToProcess =
    options.include ||
    readdirSync(srcDir, { withFileTypes: true })
      .filter((item): item is Dirent => item.isDirectory())
      .map(item => item.name);

  foldersToProcess.forEach(folderName => {
    const shouldExclude = options.exclude && options.exclude.includes(folderName);

    if (!shouldExclude) {
      const entryFolder = resolve(srcDir, folderName);
      const entryFileTS = resolve(entryFolder, 'index.ts');
      const entryFileTSX = resolve(entryFolder, `${folderName}.tsx`);
      const existingEntryFileTSX = resolve(srcDir, 'App.tsx');

      if (!existsSync(entryFolder) && options.createRecursively) {
        mkdirSync(entryFolder, { recursive: true });
        writeFileSync(entryFileTS, `export * from "./${folderName}";`);

        // Copy the existing entry file to the new entry file, just as a template
        if (existsSync(existingEntryFileTSX)) {
          writeFileSync(entryFileTSX, readFileSync(existingEntryFileTSX, 'utf8'));

          try {
            // renameSync(existingEntryFileTSX, resolve(srcDir, 'App-deleteMe!.tsx'));
          } catch (error) {
            console.error('Failed to rename file:', error);
          }
        } else {
          writeFileSync(entryFileTSX, '');
        }
      }

      if (existsSync(entryFolder)) {
        entryPoints[folderName] = entryFileTS;
      } else {
        console.warn(`Folder "${folderName}" does not exist and was not created.`);
      }
    }
  });

  return entryPoints;
};
