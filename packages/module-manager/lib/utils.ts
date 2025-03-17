import { select } from '@inquirer/prompts';
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
  });

  if (!answer) {
    console.log(`No feature selected`);
    process.exit(0);
  }

  return answer;
};
