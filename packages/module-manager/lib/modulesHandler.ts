import { MODULE_CONFIG } from './const.js';
import { zipAndDeleteModuleWithTest } from './utils.js';
import { unZipAndDelete } from './zipUtils.js';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import type { ModuleNameType } from './types.ts';
import type { ManifestType } from '@extension/shared';

const pagesPath = resolve(import.meta.dirname, '..', '..', '..', 'pages');
const testsPath = resolve(pagesPath, '..', 'tests', 'e2e', 'specs');
const archivePath = resolve(import.meta.dirname, '..', 'archive');

export const recoverModule = (manifestObject: ManifestType, moduleName: ModuleNameType) => {
  const zipFilePath = resolve(archivePath, `${moduleName}.zip`);
  const zipTestFilePath = resolve(archivePath, `${moduleName}.test.zip`);

  if (!existsSync(zipFilePath) || !existsSync(zipTestFilePath)) {
    console.log(`No archive found for ${moduleName}`);
    return;
  }

  if (moduleName !== 'content-runtime' && moduleName !== 'devtools-panel') {
    if (moduleName.startsWith('content')) {
      // @ts-expect-error recognizing .startsWith() error
      manifestObject.content_scripts?.push(MODULE_CONFIG[moduleName].content_scripts);
    } else {
      Object.assign(manifestObject, MODULE_CONFIG[moduleName]);
    }
  }

  unZipAndDelete(zipFilePath, 'pages');
  unZipAndDelete(zipTestFilePath, 'specs');
  console.log(`Recovered: ${moduleName}`);
};

export const deleteModule = async (manifestObject: ManifestType, moduleName: ModuleNameType) => {
  const outputFileName = `${moduleName}/index.iife.js`;

  if (moduleName !== 'content-runtime' && moduleName !== 'devtools-panel') {
    if (moduleName.startsWith('content')) {
      manifestObject.content_scripts = manifestObject.content_scripts?.filter(
        script => !script.js?.includes(outputFileName),
      );
    } else {
      Object.keys(MODULE_CONFIG[moduleName]).forEach(key => {
        if (manifestObject[key]) {
          delete manifestObject[key];
        }
      });
    }
  }

  if (!existsSync(archivePath)) {
    mkdirSync(archivePath, { recursive: true });
  }

  await zipAndDeleteModuleWithTest(moduleName, pagesPath, archivePath, testsPath);

  console.log(`Deleted: ${moduleName}`);
};
