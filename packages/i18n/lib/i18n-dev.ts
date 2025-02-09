import type { DevLocale, MessageKey } from './type';
import { defaultLocale, getMessageFromLocale } from './getMessageFromLocale';

type I18nValue = {
  message: string;
  placeholders?: Record<string, { content?: string; example?: string }>;
};

function translate(key: MessageKey, substitutions?: string | string[]) {
  const value = getMessageFromLocale(t.devLocale)[key] as I18nValue;
  let message = value.message;
  /**
   * This is a placeholder replacement logic. But it's not perfect.
   * It just imitates the behavior of the Chrome extension i18n API.
   * Please check the official document for more information And double-check the behavior on production build.
   *
   * @url https://developer.chrome.com/docs/extensions/how-to/ui/localization-message-formats#placeholders
   */
  if (value.placeholders) {
    Object.entries(value.placeholders).forEach(([key, { content }]) => {
      if (!content) {
        return;
      }
      message = message.replace(new RegExp(`\\$${key}\\$`, 'gi'), content);
    });
  }
  if (!substitutions) {
    return message;
  }
  if (Array.isArray(substitutions)) {
    return substitutions.reduce((acc, cur, idx) => acc.replace(`$${idx + 1}`, cur), message);
  }
  return message.replace(/\$(\d+)/, substitutions);
}

function removePlaceholder(message: string) {
  return message.replace(/\$\d+/g, '');
}

export const t = (...args: Parameters<typeof translate>) => {
  return removePlaceholder(translate(...args));
};

t.devLocale = defaultLocale as DevLocale;
