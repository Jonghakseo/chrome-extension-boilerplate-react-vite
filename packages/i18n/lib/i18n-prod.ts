import type { MessageKey } from './types.js';

export const t = (key: MessageKey, substitutions?: string | string[]) => chrome.i18n.getMessage(key, substitutions);
