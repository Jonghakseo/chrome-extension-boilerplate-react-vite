import { DEFAULT_CHOICES, DELETE_CHOICE_QUESTION } from './const.js';
import { deleteModule } from './modules-handler.js';
import { promptSelection } from './utils.js';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import type { ChoiceType, ModuleNameType } from './types.ts';
import type { ManifestType } from '@extension/shared';

const pagesPath = resolve(import.meta.dirname, '..', '..', '..', 'pages');

const pageFolders = readdirSync(pagesPath);

export const deleteFeature = async (manifestObject: ManifestType, moduleName?: ModuleNameType) => {
  if (!moduleName) {
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

    moduleName = (await promptSelection(inputConfig)) as Awaited<ModuleNameType>;
  }

  if (moduleName === 'devtools') {
    await deleteModule(manifestObject, moduleName as ModuleNameType, false);
    await deleteModule(manifestObject, 'devtools-panel');
  } else {
    await deleteModule(manifestObject, moduleName as ModuleNameType);
  }
};
