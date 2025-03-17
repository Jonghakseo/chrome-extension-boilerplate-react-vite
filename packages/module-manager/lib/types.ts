import type { select } from '@inquirer/prompts';
import type { DEFAULT_CHOICES } from './const.js';

export type ModuleNameType = Exclude<(typeof DEFAULT_CHOICES)[number]['value'], 'content-runtime'>;

export type ChoiceType = (typeof DEFAULT_CHOICES)[number];
export type InputConfigType = Parameters<typeof select>[0];
