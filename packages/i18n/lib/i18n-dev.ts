// TODO: auto-generate this import
import KoMessage from '../locales/ko/messages.json';
import EnMessage from '../locales/en/messages.json';

import { MessageKey } from './type';

function translate(key: MessageKey, substitutions?: string | string[]) {
  const message = getMessageFromLocale(t.devLocale)[key].message;

  if (!substitutions) {
    return message;
  }

  // TODO: Implement all substitution logic (placeholders fields)
  if (Array.isArray(substitutions)) {
    return substitutions.reduce((acc, cur, idx) => acc.replace(`$${idx + 1}`, cur), message);
  }
  return message.replace(/\$(\d+)/, substitutions);
}

function removePlaceholder(message: string) {
  return message.replace(/\$\d+/g, '');
}

function getMessageFromLocale(locale: string) {
  switch (locale) {
    case 'ko':
      return KoMessage;
    case 'en':
      return EnMessage;
    // TODO auto-generate this switch case
    default:
      throw new Error('Unsupported locale');
  }
}

export const t = (...args: Parameters<typeof translate>) => {
  return removePlaceholder(translate(...args));
};

t.devLocale = 'en' as 'ko' | 'en';
