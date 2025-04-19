import { DEFAULT_CHOICES_VALUES, EXIT_PROMPT_ERROR, MODULE_CONFIG } from './const.js';
import { select } from '@inquirer/prompts';
import { readdirSync } from 'node:fs';
import type { CliEntries, InputConfigType, ModuleNameType, WritableModuleConfigValuesType } from './types.js';
import type { ConditionalPickDeep, Entries, ManifestType } from '@extension/shared';
import type { Arguments } from 'yargs';

export const isFolderEmpty = (path: string) => !readdirSync(path).length;

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

export const checkCliArgsIsValid = <T extends Arguments>(argv: T) => {
  const [key, values] = Object.entries(argv)[1] as CliEntries;

  for (const value of values) {
    if (!DEFAULT_CHOICES_VALUES.some(moduleName => value.includes(moduleName))) {
      throw new Error(`All values after --${key} must be name of page`);
    }
  }
};
