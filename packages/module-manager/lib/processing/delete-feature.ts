import { deleteModule } from './modules-handler.js';
import { DEFAULT_CHOICES, DELETE_CHOICE_QUESTION } from '../const.js';
import { processSelection } from '../helpers/utils.js';
import { pagesPath, testsPath } from '../paths.js';
import { existsSync, readdirSync } from 'node:fs';
import type { ChoicesType, ModuleNameType } from '../types.ts';
import type { ManifestType } from '@extension/shared';

export const deleteFeature = async (manifestObject: ManifestType, moduleName?: ModuleNameType) => {
  const pageFolders = readdirSync(pagesPath);

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
