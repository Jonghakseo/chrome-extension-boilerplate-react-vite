import { deleteModule } from './modules-handler.js';
import { DEFAULT_CHOICES, DELETE_CHOICE_QUESTION } from '../const.js';
import { processSelection } from '../helpers/utils.js';
import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import type { ChoicesType, ModuleNameType } from '../types.ts';
import type { ManifestType } from '@extension/shared';

const pagesPath = resolve(import.meta.dirname, '..', '..', '..', '..', 'pages');
const testsPath = resolve(pagesPath, '..', 'tests');

const pageFolders = readdirSync(pagesPath);

export const deleteFeature = async (manifestObject: ManifestType, moduleName?: ModuleNameType) => {
  const choices: ChoicesType = DEFAULT_CHOICES.filter(choice => {
    if (choice.value === 'background') {
      return !!manifestObject.background;
    } else if (choice.value === 'tests') {
      return existsSync(testsPath);
    }

    return pageFolders.includes(choice.value);
  });

  const processResult = await processSelection(choices, DELETE_CHOICE_QUESTION, moduleName);

  if (processResult) {
    moduleName = processResult;
  }

  if (moduleName === 'devtools') {
    await deleteModule(manifestObject, moduleName as ModuleNameType);
    await deleteModule(manifestObject, 'devtools-panel');
  } else {
    await deleteModule(manifestObject, moduleName as ModuleNameType);
  }
};
