import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { DEFAULT_CHOICES } from './const.js';
import { deleteModule } from './modulesHandler.js';
import type { ChoiceType, ModuleNameType } from './types.ts';
import { selectFeatures } from './utils.js';

const pagesPath = resolve(import.meta.dirname, '..', '..', '..', 'pages');
const archivePath = resolve(import.meta.dirname, '..', 'archive');

const pageFolders = readdirSync(pagesPath);

export const deleteModules = async (manifestObject: chrome.runtime.ManifestV3) => {
  const choices: ChoiceType[] = DEFAULT_CHOICES.filter(choice => {
    if (choice.value === 'background') {
      return !!manifestObject.background;
    }
    return pageFolders.includes(choice.value);
  });

  const answer = await selectFeatures('delete', choices);

  if (!existsSync(archivePath)) {
    mkdirSync(archivePath, { recursive: true });
  }

  await deleteModule(manifestObject, answer as ModuleNameType, pagesPath, archivePath);
};
