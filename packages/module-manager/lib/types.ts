import type { select } from '@inquirer/prompts';
import type { DEFAULT_CHOICES } from './const.js';

export type ChoiceType = (typeof DEFAULT_CHOICES)[number];
export type ModuleNameType = ChoiceType['value'];
export type InputConfigType = Parameters<typeof select>[0];
