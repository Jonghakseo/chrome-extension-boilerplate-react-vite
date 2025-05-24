import { DEFAULT_CHOICES_VALUES, EXIT_PROMPT_ERROR, MODULE_CONFIG } from '../const.js';
import { colorfulLog } from '@extension/shared';
import { select } from '@inquirer/prompts';
import { readdirSync } from 'node:fs';
import type { DELETE_CHOICE_QUESTION, RECOVER_CHOICE_QUESTION } from '../const.js';
import type {
  ChoicesType,
  CliEntriesType,
  InputConfigType,
  ModuleNameType,
  WritableModuleConfigValuesType,
} from '../types.js';
import type { ConditionalPickDeep, Entries, ManifestType } from '@extension/shared';
import type { Arguments } from 'yargs';

export const isFolderEmpty = (path: string) => !readdirSync(path).length;

export const promptSelection = async (inputConfig: InputConfigType) =>
  select(inputConfig).catch(err => {
    if (err.name === EXIT_PROMPT_ERROR) {
      process.exit(0);
    } else {
      colorfulLog(err.message, 'error');
    }
  }) as Promise<string>;

export const processModuleConfig = (
  manifestObject: ManifestType,
  moduleName: ModuleNameType,
  isRecovering?: boolean,
) => {
  if (moduleName === 'content-runtime' || moduleName === 'devtools-panel' || moduleName === 'tests') {
    return;
  }

  const moduleConfigValues = MODULE_CONFIG[moduleName];
  const moduleConfigEntriesOfKeys = Object.entries(moduleConfigValues) as Entries<typeof moduleConfigValues>;

  if (moduleName === 'content' || moduleName === 'content-ui') {
    if (isRecovering) {
      (moduleConfigValues as WritableModuleConfigValuesType<typeof moduleName>).content_scripts.map(script =>
        manifestObject.content_scripts?.push(script),
      );
    } else {
      const outputFileName = new RegExp(`${moduleName}/+`);

      manifestObject.content_scripts = manifestObject.content_scripts?.filter(
        script => !outputFileName.test(script.js ? script.js[0] : ''),
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
  const [key, values] = Object.entries(argv)[1] as CliEntriesType;

  if (Array.isArray(values)) {
    for (const value of values) {
      if (!DEFAULT_CHOICES_VALUES.some(moduleName => value === moduleName)) {
        throw new Error(`All values after --${key} must be names of pages`);
      }
    }
  }

  return true;
};

export const processSelection = async (
  choices: ChoicesType,
  question: typeof RECOVER_CHOICE_QUESTION | typeof DELETE_CHOICE_QUESTION,
  moduleName?: ModuleNameType,
) => {
  if (!choices.length) {
    colorfulLog('No options available', 'warning');
    process.exit(0);
  }

  if (!moduleName) {
    const inputConfig = {
      message: question,
      choices,
    } as const;

    return (await promptSelection(inputConfig)) as Awaited<ModuleNameType>;
  }

  return null;
};
