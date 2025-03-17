import { resolve } from 'node:path';
import { rimraf } from 'rimraf';
import { MODULE_CONFIG } from './const.js';
import type { ModuleNameType } from './types.ts';
import { upZipAndDelete, zipFolder } from './zipUtils.js';

export const recoverModule = (
  manifestObject: chrome.runtime.ManifestV3,
  moduleName: ModuleNameType,
  pagesPath: string,
  archivePath: string,
) => {
  Object.assign(manifestObject, MODULE_CONFIG[moduleName]);
  const zipFilePath = resolve(archivePath, `${moduleName}.zip`);
  upZipAndDelete(zipFilePath, resolve(pagesPath, moduleName));
  console.log(`Recovered: ${moduleName}`);
};

export const deleteModule = async (
  manifestObject: chrome.runtime.ManifestV3,
  moduleName: ModuleNameType,
  pagesPath: string,
  archivePath: string,
) => {
  await zipFolder(resolve(pagesPath, moduleName), resolve(archivePath, `${moduleName}.zip`));
  void rimraf(resolve(pagesPath, moduleName));
  const jsName = `${moduleName}/index.iife.js`;
  manifestObject.content_scripts = manifestObject.content_scripts?.filter(script => !script.js?.includes(jsName));
  console.log(`Deleted: ${moduleName}`);
};
