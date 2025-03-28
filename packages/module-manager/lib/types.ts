import type { DEFAULT_CHOICES, MODULE_CONFIG } from './const.js';
import type { WritableDeep } from '@extension/dev-utils';
import type { select } from '@inquirer/prompts';

export type ChoiceType = (typeof DEFAULT_CHOICES)[number];
export type ModuleNameType = ChoiceType['value'] | 'devtools-panel';
export type InputConfigType = Parameters<typeof select>[0];

type ModuleConfigType = typeof MODULE_CONFIG;
export type WritableModuleConfigValuesType<T extends keyof ModuleConfigType> = WritableDeep<ModuleConfigType[T]>;
