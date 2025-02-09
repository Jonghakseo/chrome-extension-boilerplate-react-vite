// IT WILL BE ADJUSTED TO YOUR LANGUAGE DURING BUILD TIME, DON'T MOVE BELOW IMPORT TO OTHER LINE
import localeJSON from '../locales/en/messages.json' with { type: 'json' };
import type { I18nValueType, LocalesJSONType } from './types.js';

const translate = (key: keyof LocalesJSONType, substitutions?: string | string[]) => {
  const localeValues = localeJSON[key] as I18nValueType;
  let message = localeValues.message;
  /**
   * This is a placeholder replacement logic. But it's not perfect.
   * It just imitates the behavior of the Chrome extension i18n API.
   * Please check the official document for more information And double-check the behavior on production build.
   *
   * @url https://developer.chrome.com/docs/extensions/how-to/ui/localization-message-formats#placeholders
   */
  if (localeValues.placeholders) {
    Object.entries(localeValues.placeholders).forEach(([key, { content }]) => {
      if (content) {
        message = message.replace(new RegExp(`\\$${key}\\$`, 'gi'), content);
      }
    });
  }

  if (!substitutions) {
    return message;
  } else if (Array.isArray(substitutions)) {
    return substitutions.reduce((acc, cur, idx) => acc.replace(`$${idx++}`, cur), message);
  }

  return message.replace(/\$(\d+)/, substitutions);
};

const removePlaceholder = (message: string) => message.replace(/\$\d+/g, '');

export const t = (...args: Parameters<typeof translate>) => removePlaceholder(translate(...args));
