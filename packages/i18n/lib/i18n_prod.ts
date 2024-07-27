import { MessageKey, TranslateOption } from './type';

export function t(key: MessageKey, options?: TranslateOption) {
  return chrome.i18n.getMessage(key, options?.substitutions);
}
