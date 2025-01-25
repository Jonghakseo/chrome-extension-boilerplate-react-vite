import { lstatSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { SupportedLanguagesKeysType, SupportedLanguagesWithoutRegionKeysType } from './types.js';
import { I18N_FILE_PATH } from './consts.js';

export default () => {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale.replace('-', '_') as SupportedLanguagesKeysType;
  const localeWithoutRegion = locale.split('_')[0] as SupportedLanguagesWithoutRegionKeysType;

  const localesDir = resolve(import.meta.dirname, '..', '..', 'locales');
  const readLocalesFolder = readdirSync(localesDir);

  const implementedLocales = readLocalesFolder.map(innerDir => {
    if (lstatSync(resolve(localesDir, innerDir)).isDirectory()) {
      return innerDir;
    }
    return;
  });

  const i18nFileSplitContent = readFileSync(I18N_FILE_PATH, 'utf-8').split('\n');

  if (process.env['CEB_DEV_LOCALE']) {
    i18nFileSplitContent[1] = `import localeJSON from '../locales/${process.env['CEB_DEV_LOCALE']}/messages.json' with { type: 'json' };`;
  } else {
    if (implementedLocales.includes(locale)) {
      i18nFileSplitContent[1] = `import localeJSON from '../locales/${locale}/messages.json' with { type: 'json' };`;
    } else if (implementedLocales.includes(localeWithoutRegion)) {
      i18nFileSplitContent[1] = `import localeJSON from '../locales/${localeWithoutRegion}/messages.json' with { type: 'json' };`;
    } else {
      i18nFileSplitContent[1] = `import localeJSON from '../locales/en/messages.json' with { type: 'json' };`;
    }
  }

  // Join lines back together
  const updatedI18nFile = i18nFileSplitContent.join('\n');

  writeFileSync(I18N_FILE_PATH, updatedI18nFile, 'utf-8');
};
