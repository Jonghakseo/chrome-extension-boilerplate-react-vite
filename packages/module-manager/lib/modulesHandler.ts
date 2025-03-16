import { rimraf } from 'rimraf';
import type { ValueOf } from '@extension/shared';
import { upZipAndDelete, zipFolder } from './zipUtils.js';
import { resolve } from 'node:path';
import type { ModuleType } from './types.ts';

interface IModuleConfig {
  [key: string]: ValueOf<chrome.runtime.ManifestV3>;
}

const moduleConfig: Record<ModuleType, IModuleConfig> = {
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
  moduleType: ModuleType,
  pagesPath: string,
  archivePath: string,
) => {
  Object.assign(manifestObject, moduleConfig[moduleType]);
  const zipFilePath = resolve(archivePath, `${moduleType}.zip`);
  upZipAndDelete(zipFilePath, resolve(pagesPath, moduleType));
};

export const deleteModule = async (
  manifestObject: chrome.runtime.ManifestV3,
  moduleType: ModuleType,
  pagesPath: string,
  archivePath: string,
) => {
  await zipFolder(resolve(pagesPath, moduleType), resolve(archivePath, `${moduleType}.zip`));
  void rimraf(resolve(pagesPath, moduleType));
  const jsName = `${moduleType}/index.iife.js`;
  manifestObject.content_scripts = manifestObject.content_scripts?.filter(script => !script.js?.includes(jsName));
};
