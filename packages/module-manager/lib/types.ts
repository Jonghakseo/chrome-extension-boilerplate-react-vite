import type { DEFAULT_CHOICES } from './const.js';
import type { select } from '@inquirer/prompts';

export type ChoiceType = (typeof DEFAULT_CHOICES)[number];
export type ModuleNameType = ChoiceType['value'] | 'devtools-panel';
export type InputConfigType = Parameters<typeof select>[0];
export type ProcessModuleNameType = Exclude<ModuleNameType, 'content-runtime' | 'devtools-panel'>;
