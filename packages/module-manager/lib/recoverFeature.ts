import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { DEFAULT_CHOICES } from './const.js';
import { recoverModule } from './modulesHandler.js';
import type { ChoiceType, ModuleNameType } from './types.ts';
import { promptSelection } from './utils.js';

const archivePath = resolve(import.meta.dirname, '..', 'archive');

const archiveFiles = existsSync(archivePath) ? readdirSync(archivePath) : [];

export const recoverFeature = async (manifestObject: chrome.runtime.ManifestV3) => {
  const choices: ChoiceType[] = DEFAULT_CHOICES.filter(choice => {
    if (choice.value === 'background') {
      return !manifestObject.background;
    }
    return archiveFiles.includes(`${choice.value}.zip`);
  });

  const inputConfig = {
    message: 'Choose feature to recover',
    choices,
  } as const;

  const answer = await promptSelection(inputConfig);

  recoverModule(manifestObject, answer as ModuleNameType, archivePath);
};
