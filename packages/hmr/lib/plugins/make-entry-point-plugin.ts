import { IS_FIREFOX } from '@extension/env';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { basename, resolve, sep } from 'node:path';
import type { PluginOption } from 'vite';

/**
 * Extract content directory from output directory for Firefox
 * @param outputDir
 */
const extractContentDir = (outputDir: string) => {
  const parts = outputDir.split(sep);
  const distIndex = parts.indexOf('dist');

  if (distIndex !== -1 && distIndex < parts.length - 1) {
    return parts.slice(distIndex + 1);
  }

  throw new Error('Output directory does not contain "dist"');
};

const safeWriteFileSync = (path: string, data: string) => {
  const folder = path.split(sep).slice(0, -1).join(sep);

  if (!existsSync(folder)) {
    mkdirSync(folder, { recursive: true });
  }
  writeFileSync(path, data);
};

/**
 * Make an entry point file for content script cache busting
 */
export const makeEntryPointPlugin = (): PluginOption => ({
  name: 'make-entry-point-plugin',
  generateBundle(options, bundle) {
    const outputDir = options.dir;

    if (!outputDir) {
      throw new Error('Output directory not found');
    }

    for (const module of Object.values(bundle)) {
      const fileName = module.fileName;
      const newFileName = fileName.replace('.js', '_dev.js');

      switch (module.type) {
        case 'asset':
          if (fileName.endsWith('.map')) {
            const originalFileName = fileName.replace('.map', '');
            const replacedSource = String(module.source).replaceAll(originalFileName, newFileName);

            module.source = '';
            safeWriteFileSync(resolve(outputDir, newFileName), replacedSource);
            break;
          }
          break;

        case 'chunk': {
          safeWriteFileSync(resolve(outputDir, newFileName), module.code);
          const newFileNameBase = basename(newFileName);

          if (IS_FIREFOX) {
            const contentDirectory = extractContentDir(outputDir);
            module.code = `import(browser.runtime.getURL("${contentDirectory}/${newFileNameBase}"));`;
          } else {
            module.code = `import('./${newFileNameBase}');`;
          }
          break;
        }
      }
    }
  },
});
