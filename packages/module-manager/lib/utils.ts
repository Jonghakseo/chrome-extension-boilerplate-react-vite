import { select } from '@inquirer/prompts';
import { EXIT_PROMPT_ERROR } from './const.js';
import type { ActionType, ChoiceType } from './types.ts';

export const selectFeatures = async (action: ActionType, choices: ChoiceType[]): Promise<string> => {
  if (!choices.length) {
    console.log(`No features to ${action}`);
    process.exit(0);
  }

  const answer = await select({
    message: `Choose the features you want to ${action}`,
    loop: false,
    choices,
  }).catch(err => {
    if (err.name === EXIT_PROMPT_ERROR) {
      process.exit(0);
    } else {
      console.error(err.message);
    }
  });

  if (!answer) {
    console.log(`No feature selected`);
    process.exit(0);
  }

  return answer;
};
