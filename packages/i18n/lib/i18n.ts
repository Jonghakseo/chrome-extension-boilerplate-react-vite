// TODO: auto-generate this import
import KoMessage from '../locales/ko/messages.json';
import EnMessage from '../locales/en/messages.json';

import { MessageKey, TranslateOption } from './type';

export function t(key: MessageKey, options?: TranslateOption) {
  const { substitutions, devLocale = 'en' } = options ?? {};
  const message = getMessageFromLocale(devLocale)[key].message;

  if (!substitutions) {
    return message;
  }

  // TODO: Implement all substitution logic (placeholders)
  if (typeof substitutions === 'string') {
    return message.replace(/\$[^$]*\$/g, substitutions);
  }
  return substitutions.reduce((acc, substitution) => {
    return acc.replace(/\$[^$]*\$/g, substitution);
  }, message);
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
