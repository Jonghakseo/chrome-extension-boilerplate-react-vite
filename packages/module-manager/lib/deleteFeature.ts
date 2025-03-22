import { DEFAULT_CHOICES, DELETE_CHOICE_QUESTION } from './const.js';
import { deleteModule } from './modulesHandler.js';
import { promptSelection } from './utils.js';
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import type { ChoiceType, ModuleNameType } from './types.ts';
import type { ManifestType } from '@extension/shared';

const pagesPath = resolve(import.meta.dirname, '..', '..', '..', 'pages');
const archivePath = resolve(import.meta.dirname, '..', 'archive');

const pageFolders = readdirSync(pagesPath);

export const deleteFeature = async (manifestObject: ManifestType) => {
  const choices: ChoiceType[] = DEFAULT_CHOICES.filter(choice => {
    if (choice.value === 'background') {
      return !!manifestObject.background;
    }
    return pageFolders.includes(choice.value);
  });

  const inputConfig = {
    message: DELETE_CHOICE_QUESTION,
    choices,
  } as const;

  const answer = await promptSelection(inputConfig);

  if (!existsSync(archivePath)) {
    mkdirSync(archivePath, { recursive: true });
  }
  if (answer === 'devtools') {
    await deleteModule(manifestObject, answer as ModuleNameType, archivePath);
    await deleteModule(manifestObject, 'devtools-panel', archivePath);
  } else {
    await deleteModule(manifestObject, answer as ModuleNameType, archivePath);
  }
};
