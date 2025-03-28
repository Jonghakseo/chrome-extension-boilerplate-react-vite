import { EXIT_PROMPT_ERROR, MODULE_CONFIG } from './const.js';
import { zipFolder } from './zipUtils.js';
import { select } from '@inquirer/prompts';
import { rimraf } from 'rimraf';
import { resolve } from 'node:path';
import type { InputConfigType, ModuleNameType, WritableModuleConfigValuesType } from './types.js';
import type { ConditionalPickDeep, Entries, ManifestType } from '@extension/shared';

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
  moduleName: ModuleNameType,
  isRecovering?: boolean,
) => {
  if (moduleName === 'content-runtime' || moduleName === 'devtools-panel') {
    return;
  }

  const moduleConfigValues = MODULE_CONFIG[moduleName];
  const moduleConfigEntriesOfKeys = Object.entries(moduleConfigValues) as Entries<typeof moduleConfigValues>;

  if (moduleName === 'content' || moduleName === 'content-ui') {
    if (isRecovering) {
      manifestObject.content_scripts?.push(
        (moduleConfigValues as WritableModuleConfigValuesType<typeof moduleName>).content_scripts,
      );
    } else {
      const outputFileName = `${moduleName}/index.iife.js`;

      manifestObject.content_scripts = manifestObject.content_scripts?.filter(
        script => !script.js?.includes(outputFileName),
      );
    }
    return;
  }

  moduleConfigEntriesOfKeys.forEach(([key, value]) => {
    const manifestValue = manifestObject[key];

    if (manifestValue) {
      if (manifestValue instanceof Array) {
        const arrayValues = Object.values(
          moduleConfigValues[key as ConditionalPickDeep<keyof typeof moduleConfigValues, typeof moduleName>],
        );

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
