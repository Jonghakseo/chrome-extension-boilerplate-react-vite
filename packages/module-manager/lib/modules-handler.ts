import { isFolderEmpty, processModuleConfig } from './utils.js';
import { unZipAndDeleteModule, zipAndDeleteModule, zipAndDeleteTests } from './zip-utils.js';
import { colorfulLog } from '@extension/shared';
import { existsSync, mkdirSync, rmdirSync } from 'node:fs';
import { resolve } from 'node:path';
import type { ModuleNameType } from './types.ts';
import type { ManifestType } from '@extension/shared';

const pagesPath = resolve(import.meta.dirname, '..', '..', '..', 'pages');
const testsPath = resolve(pagesPath, '..', 'tests');
const specsPath = resolve(testsPath, 'e2e', 'specs');
const archivePath = resolve(import.meta.dirname, '..', 'archive');

export const recoverModule = (manifestObject: ManifestType, moduleName: ModuleNameType, withTest = true) => {
  const zipFilePath = resolve(archivePath, `${moduleName}.zip`);
  const zipTestFilePath = resolve(archivePath, `${moduleName}.test.zip`);

  if (!existsSync(zipFilePath) || (withTest && !existsSync(zipTestFilePath))) {
    colorfulLog(`No archive found for ${moduleName}`, 'info');
    process.exit(0);
  }

  processModuleConfig(manifestObject, moduleName, true);

  unZipAndDeleteModule(zipFilePath, pagesPath);

  if (withTest) {
    unZipAndDeleteModule(zipTestFilePath, specsPath);
  }

  colorfulLog(`Recovered: ${moduleName}`, 'info');

  if (isFolderEmpty(archivePath)) {
    rmdirSync(archivePath);
  }
};

export const deleteModule = async (manifestObject: ManifestType, moduleName: ModuleNameType, withTest = true) => {
  processModuleConfig(manifestObject, moduleName);

  if (!existsSync(archivePath)) {
    mkdirSync(archivePath, { recursive: true });
  }

  if (moduleName === 'tests') {
    await zipAndDeleteTests(testsPath, archivePath);
  } else if (withTest) {
    await zipAndDeleteModule(moduleName, pagesPath, archivePath, specsPath);
  } else {
    await zipAndDeleteModule(moduleName, pagesPath, archivePath);
  }

  colorfulLog(`Deleted: ${moduleName}`, 'info');
};
