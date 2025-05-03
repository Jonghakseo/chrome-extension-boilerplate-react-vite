import { DEFAULT_CHOICES, RECOVER_CHOICE_QUESTION } from './const.js';
import { recoverModule } from './modules-handler.js';
import { processSelection } from './utils.js';
import { rimraf } from 'rimraf';
import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import type { ChoicesType, ModuleNameType } from './types.ts';
import type { ManifestType } from '@extension/shared';

const archivePath = resolve(import.meta.dirname, '..', 'archive');
const testsPath = resolve(import.meta.dirname, '..', '..', '..', 'tests');

const archiveFiles = existsSync(archivePath) ? readdirSync(archivePath) : [];

export const recoverFeature = async (manifestObject: ManifestType, moduleName?: ModuleNameType) => {
  const choices: ChoicesType = DEFAULT_CHOICES.filter(choice => {
    if (choice.value === 'background') {
      return !manifestObject.background;
    } else if (choice.value === 'tests') {
      return !existsSync(testsPath);
    }

    return archiveFiles.includes(`${choice.value}.zip`);
  });

  const processResult = await processSelection(choices, RECOVER_CHOICE_QUESTION, moduleName);

  if (processResult) {
    moduleName = processResult;
  }

  if (moduleName === 'tests' || !existsSync(testsPath)) {
    recoverModule(manifestObject, moduleName as ModuleNameType, false);
    const testZipFilePath = resolve(archivePath, `${moduleName}.test.zip`);

    if (existsSync(testZipFilePath)) {
      await rimraf(testZipFilePath);
    }
  } else if (moduleName === 'devtools') {
    recoverModule(manifestObject, moduleName as ModuleNameType, false);
    recoverModule(manifestObject, 'devtools-panel');
  } else {
    recoverModule(manifestObject, moduleName as ModuleNameType);
  }
};
