import { resolve } from 'node:path';
import { rimraf } from 'rimraf';
import type { IModuleConfig, ModuleNameType } from './types.ts';
import { upZipAndDelete, zipFolder } from './zipUtils.js';

const moduleConfig: Record<ModuleNameType, IModuleConfig> = {
  content: {
    matches: ['http://*/*', 'https://*/*', '<all_urls>'],
    js: [`content/index.iife.js`],
  },
  background: {
    background: {
      service_worker: 'background.js',
      type: 'module',
    },
  },
  'new-tab': {
    chrome_url_overrides: {
      newtab: 'new-tab/index.html',
    },
  },
  popup: {
    action: {
      default_popup: 'popup/index.html',
      default_icon: 'icon-34.png',
    },
  },
  devtools: {
    devtools_page: 'devtools/index.html',
  },
  'side-panel': {
    side_panel: {
      default_path: 'side-panel/index.html',
    },
    permissions: ['sidePanel'],
  },
  options: {
    options_page: 'options/index.html',
  },
};

export const recoverModule = (
  manifestObject: chrome.runtime.ManifestV3,
  moduleName: ModuleNameType,
  pagesPath: string,
  archivePath: string,
) => {
  Object.assign(manifestObject, moduleConfig[moduleName]);
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
