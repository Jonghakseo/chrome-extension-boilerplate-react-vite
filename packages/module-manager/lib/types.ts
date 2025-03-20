import type { DEFAULT_CHOICES } from './const.js';
import type { select } from '@inquirer/prompts';

export type ChoiceType = (typeof DEFAULT_CHOICES)[number];
export type ModuleNameType = ChoiceType['value'];
export type InputConfigType = Parameters<typeof select>[0];
