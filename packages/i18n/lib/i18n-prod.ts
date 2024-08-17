import type { DevLocale, MessageKey } from './type';

export function t(key: MessageKey, substitutions?: string | string[]) {
  return chrome.i18n.getMessage(key, substitutions);
}

t.devLocale = '' as DevLocale; // for type consistency with i18n-dev.ts
