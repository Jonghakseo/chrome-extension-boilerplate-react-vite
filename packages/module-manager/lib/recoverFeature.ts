import { DEFAULT_CHOICES, RECOVER_CHOICE_QUESTION } from './const.js';
import { recoverModule } from './modulesHandler.js';
import { promptSelection } from './utils.js';
import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import type { ChoiceType, ModuleNameType } from './types.ts';
import type { ManifestType } from '@extension/shared';

const archivePath = resolve(import.meta.dirname, '..', 'archive');

const archiveFiles = existsSync(archivePath) ? readdirSync(archivePath) : [];

export const recoverFeature = async (manifestObject: ManifestType) => {
  const choices: ChoiceType[] = DEFAULT_CHOICES.filter(choice => {
    if (choice.value === 'background') {
      return !manifestObject.background;
    }
    return archiveFiles.includes(`${choice.value}.zip`);
  });

  const inputConfig = {
    message: RECOVER_CHOICE_QUESTION,
    choices,
  } as const;

  const answer = await promptSelection(inputConfig);

  if (answer === 'devtools') {
    recoverModule(manifestObject, answer as ModuleNameType);
    recoverModule(manifestObject, 'devtools-panel');
  } else {
    recoverModule(manifestObject, answer as ModuleNameType);
  }
};
