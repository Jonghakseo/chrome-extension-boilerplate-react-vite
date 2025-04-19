import { isFolderEmpty, processModuleConfig } from './utils.js';
import { unZipAndDeleteModule, zipAndDeleteModule } from './zipUtils.js';
import { existsSync, mkdirSync, rmdirSync } from 'node:fs';
import { resolve } from 'node:path';
import type { ModuleNameType } from './types.ts';
import type { ManifestType } from '@extension/dev-utils';

const pagesPath = resolve(import.meta.dirname, '..', '..', '..', 'pages');
const testsPath = resolve(pagesPath, '..', 'tests', 'e2e', 'specs');
const archivePath = resolve(import.meta.dirname, '..', 'archive');

export const recoverModule = (manifestObject: ManifestType, moduleName: ModuleNameType, withTest = true) => {
  const zipFilePath = resolve(archivePath, `${moduleName}.zip`);
  const zipTestFilePath = resolve(archivePath, `${moduleName}.test.zip`);

  if (!existsSync(zipFilePath) || (withTest && !existsSync(zipTestFilePath))) {
    console.log(`No archive found for ${moduleName}`);
    process.exit(0);
  }

  processModuleConfig(manifestObject, moduleName, true);

  unZipAndDeleteModule(zipFilePath, pagesPath);

  if (withTest) {
    unZipAndDeleteModule(zipTestFilePath, testsPath);
  }

  console.log(`Recovered: ${moduleName}`);

  if (isFolderEmpty(archivePath)) {
    rmdirSync(archivePath);
  }
};

export const deleteModule = async (manifestObject: ManifestType, moduleName: ModuleNameType, withTest = true) => {
  processModuleConfig(manifestObject, moduleName);

  if (!existsSync(archivePath)) {
    mkdirSync(archivePath, { recursive: true });
  }

  if (withTest) {
    await zipAndDeleteModule(moduleName, pagesPath, archivePath, testsPath);
  } else {
    await zipAndDeleteModule(moduleName, pagesPath, archivePath);
  }

  console.log(`Deleted: ${moduleName}`);
};
