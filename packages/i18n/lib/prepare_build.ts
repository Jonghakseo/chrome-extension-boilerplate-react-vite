import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

// TODO: UJEDNOLIĆ NAZWY PLIKÓW I FOLDERÓW
(() => {
  const isDev = process.env.__DEV__ === 'true';
  const i18nPath = isDev ? 'lib/i18n-dev.ts' : 'lib/i18n-prod.ts';

  cpSync(i18nPath, resolve('lib', 'i18n.ts'));
  const outDir = resolve(import.meta.dirname, '..', '..', '..', '..', 'dist');
  !existsSync(outDir) && mkdirSync(outDir);

  const localePath = resolve(outDir, '_locales');
  cpSync(resolve('locales'), localePath, { recursive: true });
})();
