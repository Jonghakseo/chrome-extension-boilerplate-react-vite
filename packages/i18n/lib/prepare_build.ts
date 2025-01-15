import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import setRelatedLocaleImports from './set_related_locale_import.js';

(() => {
  // const isDev = process.env.__DEV__ === 'true';
  const isDev = true;
  const i18nPath = isDev ? 'lib/i18n-dev.ts' : 'lib/i18n-prod.ts';
  cpSync(i18nPath, resolve('lib', 'i18n.ts'));

  const outDir = resolve(import.meta.dirname, '..', '..', '..', '..', 'dist');
  !existsSync(outDir) && mkdirSync(outDir);

  const localePath = resolve(outDir, '_locales');
  cpSync(resolve('locales'), localePath, { recursive: true });

  isDev && setRelatedLocaleImports();
  console.log('I18n build complete');
})();
