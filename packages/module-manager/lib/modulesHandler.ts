import { resolve } from 'node:path';
import { MODULE_CONFIG } from './const.js';
import type { ModuleNameType } from './types.ts';
import { removeContentRuntimeReferencesFromPopup, zipAndDeleteModuleWithTest } from './utils.js';
import { upZipAndDelete } from './zipUtils.js';

const pagesPath = resolve(import.meta.dirname, '..', '..', '..', 'pages');
const testsPath = resolve(pagesPath, '..', 'tests', 'e2e', 'specs');

export const recoverModule = (
  manifestObject: chrome.runtime.ManifestV3,
  moduleName: ModuleNameType,
  archivePath: string,
) => {
  if (moduleName !== 'content-runtime') {
    Object.assign(manifestObject, MODULE_CONFIG[moduleName]);
  }

  const zipFilePath = resolve(archivePath, `${moduleName}.zip`);
  upZipAndDelete(zipFilePath, resolve(pagesPath, moduleName));
  console.log(`Recovered: ${moduleName}`);
};

export const deleteModule = async (
  manifestObject: chrome.runtime.ManifestV3,
  moduleName: ModuleNameType,
  archivePath: string,
) => {
  await zipAndDeleteModuleWithTest(moduleName, pagesPath, archivePath, testsPath);

  if (moduleName.startsWith('content')) {
    if (moduleName === 'content-runtime') {
      await removeContentRuntimeReferencesFromPopup(pagesPath, archivePath);
      return;
    }
    const outputFileName = `${moduleName}/index.iife.js`;

    manifestObject.content_scripts = manifestObject.content_scripts?.filter(
      script => !script.js?.includes(outputFileName),
    );
  } else {
    // @ts-expect-error recognizing .startsWith() error
    Object.keys(MODULE_CONFIG[moduleName]).forEach(key => {
      if (manifestObject[key]) {
        delete manifestObject[key];
      }
    });
  }

  console.log(`Deleted: ${moduleName}`);
};
