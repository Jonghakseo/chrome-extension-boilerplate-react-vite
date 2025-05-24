import type { MessageKeyType } from './types.js';

export const t = (key: MessageKeyType, substitutions?: string | string[]) => chrome.i18n.getMessage(key, substitutions);
