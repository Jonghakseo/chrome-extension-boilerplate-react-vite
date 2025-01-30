import { resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';
import { END_SIGNALS } from '../consts.js';

// THIS FUNCTION CHANGE IS_DEV VAR IN BUNDLED BACKGROUND FILE TO FALSE FOR AVOID WS CONNECTING ISSUE: https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/issues/477
(() => {
  for (const signal of END_SIGNALS) {
    process.on(signal, () => {
      const backgroundFilePath = resolve(import.meta.dirname, '../../../../../dist/background.js');

      const backgroundFileContent = readFileSync(backgroundFilePath, 'utf-8');
      const newBackgroundFileContent = backgroundFileContent.replace(/var IS_DEV = .+;/, 'var IS_DEV = false;');

      writeFileSync(backgroundFilePath, newBackgroundFileContent, 'utf-8');
    });
  }
})();
