import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { DEFAULT_CHOICES } from './const.js';
import { recoverModule } from './modulesHandler.js';
import { selectFeatures } from './utils.js';
import type { ChoiceType, ModuleType } from './types.ts';

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

  const answers = await selectFeatures('recover', choices);

  for (const answer of answers) {
    recoverModule(manifestObject, answer as ModuleType, pagesPath, archivePath);
  }
  console.log(`Recovered selected features: ${answers.join(', ')}`);
};
