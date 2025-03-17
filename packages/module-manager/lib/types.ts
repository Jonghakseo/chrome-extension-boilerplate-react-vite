import type { ValueOf } from '@extension/shared';
import type { DEFAULT_CHOICES } from './const.js';

export type ModuleNameType = 'content' | 'background' | 'new-tab' | 'popup' | 'devtools' | 'side-panel' | 'options';
export type ChoiceType = (typeof DEFAULT_CHOICES)[number];
export type ActionType = 'recover' | 'delete';

export interface IModuleConfig {
  [key: string]: ValueOf<chrome.runtime.ManifestV3>;
}
