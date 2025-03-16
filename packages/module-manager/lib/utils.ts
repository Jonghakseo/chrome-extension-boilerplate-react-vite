import { checkbox } from '@inquirer/prompts';
import type { ActionType, ChoiceType } from './types.ts';

export async function selectFeatures(action: ActionType, choices: ChoiceType[]): Promise<string[]> {
  if (!choices.length) {
    console.log(`No features to ${action}`);
    process.exit(0);
  }

  const answers = await checkbox({
    message: `Choose the features you want to ${action}`,
    loop: false,
    choices,
  });

  if (!answers.length) {
    console.log(`No feature selected`);
    process.exit(0);
  }

  return answers;
}
