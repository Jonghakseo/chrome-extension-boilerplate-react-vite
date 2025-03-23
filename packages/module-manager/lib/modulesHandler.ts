import { MODULE_CONFIG } from './const.js';
import { removeContentRuntimeReferencesFromPopup, zipAndDeleteModuleWithTest } from './utils.js';
import { unZipAndDelete } from './zipUtils.js';
import { resolve } from 'node:path';
import type { ModuleNameType } from './types.ts';
import type { ManifestType } from '@extension/shared';

const pagesPath = resolve(import.meta.dirname, '..', '..', '..', 'pages');
const testsPath = resolve(pagesPath, '..', 'tests', 'e2e', 'specs');

export const recoverModule = (manifestObject: ManifestType, moduleName: ModuleNameType, archivePath: string) => {
  if (moduleName !== 'content-runtime' && moduleName !== 'devtools-panel') {
    if (moduleName.startsWith('content'))
      // @ts-expect-error recognizing .startsWith() error
      manifestObject.content_scripts?.push(MODULE_CONFIG[moduleName].content_scripts);
    else {
      Object.assign(manifestObject, MODULE_CONFIG[moduleName]);
    }
  }

  const zipFilePath = resolve(archivePath, `${moduleName}.zip`);
  const zipTestFilePath = resolve(archivePath, `${moduleName}.test.zip`);

  unZipAndDelete(zipFilePath, pagesPath.at(-1) as NonNullable<string>);
  unZipAndDelete(zipTestFilePath, testsPath.at(-1) as NonNullable<string>);
  console.log(`Recovered: ${moduleName}`);
};

export const deleteModule = async (manifestObject: ManifestType, moduleName: ModuleNameType, archivePath: string) => {
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
  } else if (moduleName !== 'devtools-panel') {
    // @ts-expect-error recognizing .startsWith() error
    Object.keys(MODULE_CONFIG[moduleName]).forEach(key => {
      if (manifestObject[key]) {
        delete manifestObject[key];
      }
    });
  }

  console.log(`Deleted: ${moduleName}`);
};
