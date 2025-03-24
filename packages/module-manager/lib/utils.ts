import { EXIT_PROMPT_ERROR, MODULE_CONFIG } from './const.js';
import { zipFolder } from './zipUtils.js';
import { select } from '@inquirer/prompts';
import { rimraf } from 'rimraf';
import { resolve } from 'node:path';
import type { InputConfigType, ModuleNameType } from './types.js';
import type { ManifestType } from '@extension/shared';

export const promptSelection = async (inputConfig: InputConfigType) => {
  if (!inputConfig.choices.length) {
    console.log('No choices available');
    process.exit(0);
  }

  return select(inputConfig).catch(err => {
    if (err.name === EXIT_PROMPT_ERROR) {
      process.exit(0);
    } else {
      console.error(err.message);
    }
  }) as Promise<string>;
};

export const zipAndDeleteModuleWithTest = async (
  moduleName: ModuleNameType,
  pagesPath: string,
  archivePath: string,
  testsPath: string,
) => {
  const moduleTestName = `page-${moduleName}.test.ts`;

  await zipFolder(resolve(pagesPath, moduleName), resolve(archivePath, `${moduleName}.zip`));
  await zipFolder(testsPath, resolve(archivePath, `${moduleName}.test.zip`), [moduleTestName]);

  const modulePath = resolve(pagesPath, moduleName);
  const moduleTestsPath = resolve(testsPath, moduleTestName);

  void rimraf([modulePath, moduleTestsPath]);
};

export const processModuleConfig = (
  manifestObject: ManifestType,
  moduleName: Exclude<ModuleNameType, 'content-runtime' | 'devtools-panel'>,
  isRecovering?: boolean,
) => {
  const moduleConfigEntriesOfKeys = Object.entries(MODULE_CONFIG[moduleName]);

  moduleConfigEntriesOfKeys.forEach(([key, value]) => {
    const manifestValue = manifestObject[key];

    if (manifestValue) {
      if (manifestValue instanceof Array) {
        // @ts-expect-error error recognizing array
        const arrayValues = Object.values(MODULE_CONFIG[moduleName][key]) as string[];

        if (isRecovering) {
          manifestObject[key] = manifestValue.concat(arrayValues);
        } else {
          manifestObject[key] = manifestValue.filter((value: string) => !arrayValues.includes(value));
        }
      } else {
        delete manifestObject[key];
      }
    } else if (isRecovering) {
      Object.assign(manifestObject, { [key]: value });
    } else {
      throw new Error(`Key ${key} not found in manifest.ts`);
    }
  });
};
