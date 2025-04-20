import { CLI_OPTIONS, DEFAULT_CHOICES_VALUES, HELP_EXAMPLES } from './const.js';
import { checkCliArgsIsValid } from './utils.js';
import { excludeValuesFromBaseArray } from '@extension/shared';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import type { ICLIOptions, ModuleNameType } from './types.js';
import type { WritableDeep } from '@extension/shared';

export const processCLIArgs = (): ICLIOptions | null => {
  const argv = yargs(hideBin(process.argv))
    .option('delete', CLI_OPTIONS[0])
    .option('recover', CLI_OPTIONS[1])
    .option('delete-exclude', CLI_OPTIONS[2])
    .option('recover-exclude', CLI_OPTIONS[3])
    .check(argv => checkCliArgsIsValid(argv))
    .strict()
    .example(HELP_EXAMPLES as WritableDeep<typeof HELP_EXAMPLES>)
    .help()
    .showHelpOnFail()
    .parseSync();

  if (argv.delete) {
    return {
      action: 'delete',
      targets: argv.delete as ModuleNameType[],
    };
  }

  if (argv.recover) {
    return {
      action: 'recover',
      targets: argv.recover as ModuleNameType[],
    };
  }

  if (argv.deleteExclude) {
    const moduleNames = argv.deleteExclude;
    const targets = excludeValuesFromBaseArray(DEFAULT_CHOICES_VALUES, moduleNames);

    return {
      action: 'delete',
      targets,
    };
  }

  if (argv.recoverExclude) {
    const moduleNames = argv.recoverExclude;
    const targets = excludeValuesFromBaseArray(DEFAULT_CHOICES_VALUES, moduleNames);

    return {
      action: 'recover',
      targets,
    };
  }

  return null;
};
