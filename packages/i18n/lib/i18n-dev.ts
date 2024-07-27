import { DevLocale, MessageKey } from './type';
import { defaultLocale, getMessageFromLocale } from './getMessageFromLocale';

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

export const t = (...args: Parameters<typeof translate>) => {
  return removePlaceholder(translate(...args));
};

t.devLocale = defaultLocale as DevLocale;
