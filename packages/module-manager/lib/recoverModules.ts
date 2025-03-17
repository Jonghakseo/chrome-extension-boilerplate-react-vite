import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { DEFAULT_CHOICES } from './const.js';
import { recoverModule } from './modulesHandler.js';
import type { ChoiceType, ModuleNameType } from './types.ts';
import { selectFeatures } from './utils.js';

const pagesPath = resolve(import.meta.dirname, '..', '..', '..', 'pages');
const archivePath = resolve(import.meta.dirname, '..', 'archive');

const archiveFiles = existsSync(archivePath) ? readdirSync(archivePath) : [];

export const recoverModules = async (manifestObject: chrome.runtime.ManifestV3) => {
  const choices: ChoiceType[] = DEFAULT_CHOICES.filter(choice => {
    if (choice.value === 'background') {
      return !manifestObject.background;
    }
    return archiveFiles.includes(`${choice.value}.zip`);
  });

  const answer = await selectFeatures('recover', choices);

  recoverModule(manifestObject, answer as ModuleNameType, pagesPath, archivePath);
  console.log(`Recovered: ${answer}`);
};
