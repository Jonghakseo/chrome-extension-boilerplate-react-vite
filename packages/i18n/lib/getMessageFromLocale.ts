import { lstatSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import type { LocalesJSONType, SupportedLanguagesKeysType, SupportedLanguagesWithoutRegionKeysType } from './types.js';

export const getMessageFromLocale = (): Promise<{ default: LocalesJSONType }> => {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale.replace('-', '_') as SupportedLanguagesKeysType;
  const localeWithoutRegion = locale.split('_')[0] as SupportedLanguagesWithoutRegionKeysType;

  const localesDir = resolve(import.meta.dirname, '..', 'locales');
  const readLocalesFolder = readdirSync(localesDir);

  const implementedLocales = readLocalesFolder.map(innerDir => {
    if (lstatSync(resolve(localesDir, innerDir)).isDirectory()) {
      return innerDir;
    }
    return;
  });

  if (implementedLocales.includes(locale)) {
    return import(`../locales/${locale}/messages.json`);
  } else if (implementedLocales.includes(localeWithoutRegion)) {
    return import(`../locales/${localeWithoutRegion}/messages.json`);
  }

  return import(`../locales/en/messages.json`);
};
