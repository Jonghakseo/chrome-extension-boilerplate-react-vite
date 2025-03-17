import { select } from '@inquirer/prompts';
import { EXIT_PROMPT_ERROR } from './const.js';
import type { InputConfigType } from './types.js';

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
