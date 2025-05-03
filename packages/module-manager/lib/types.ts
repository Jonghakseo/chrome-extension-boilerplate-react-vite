import type { DEFAULT_CHOICES, MODULE_CONFIG } from './const.js';
import type { WritableDeep } from '@extension/shared';
import type { select } from '@inquirer/prompts';

type ModuleConfigType = typeof MODULE_CONFIG;

export type ChoiceType = (typeof DEFAULT_CHOICES)[number];
export type ChoicesType = ChoiceType[];
export type ModuleNameType = ChoiceType['value'] | 'devtools-panel';
export type InputConfigType = Parameters<typeof select>[0];
export type WritableModuleConfigValuesType<T extends keyof ModuleConfigType> = WritableDeep<ModuleConfigType[T]>;

export interface ICLIOptions {
  action: 'delete' | 'recover';
  targets: ModuleNameType[];
}

export type CliEntriesType = [string, (string | number)[]][];
export type CliActionType = 'delete' | 'recover';
