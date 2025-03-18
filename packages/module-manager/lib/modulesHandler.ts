import { readFileSync, writeFileSync } from 'node:fs';
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
  pagesPath: string,
  archivePath: string,
) => {
  await zipFolder(resolve(pagesPath, moduleName), resolve(archivePath, `${moduleName}.zip`));
  void rimraf(resolve(pagesPath, moduleName));
  const jsName = `${moduleName}/index.iife.js`;
  const popupPath = resolve(pagesPath, 'popup', 'src', 'Popup.tsx');
  const popupContent = readFileSync(popupPath, 'utf-8');

  if (moduleName.startsWith('content')) {
    if (moduleName === 'content-runtime') {
      const updatedContent = popupContent
        .replace(/const injectContentScript = async \(\) => {[\s\S]*?};(\r?\n)*/, '')
        .replace(/<button[^>]*onClick=\{injectContentScript}[^>]*>[^<]*<\/button>(\r?\n)*/, '')
        .replace(/const notificationOptions = {[\s\S]*?} as const;(\r?\n)*/, '');

      writeFileSync(popupPath, updatedContent);
      return;
    }
    manifestObject.content_scripts = manifestObject.content_scripts?.filter(script => !script.js?.includes(jsName));
  } else {
    // @ts-expect-error TS recognizing error
    Object.keys(MODULE_CONFIG[moduleName]).forEach(key => {
      if (manifestObject[key]) {
        delete manifestObject[key];
      }
    });
  }

  console.log(`Deleted: ${moduleName}`);
};
