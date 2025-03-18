import type { select } from '@inquirer/prompts';
import type { DEFAULT_CHOICES } from './const.js';

export type ModuleNameType = (typeof DEFAULT_CHOICES)[number]['value'];

export type ChoiceType = (typeof DEFAULT_CHOICES)[number];
export type InputConfigType = Parameters<typeof select>[0];
