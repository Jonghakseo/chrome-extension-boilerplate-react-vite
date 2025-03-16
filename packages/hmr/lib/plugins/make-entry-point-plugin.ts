import { unlinkSync, writeFileSync } from 'node:fs';
import { basename, resolve, sep } from 'node:path';
import { IS_FIREFOX } from '@extension/env';
import type { PluginOption } from 'vite';

/**
 * make entry point file for content script cache busting
 */
export const makeEntryPointPlugin = (): PluginOption => {
  const cleanupTargets = new Set<string>();

  return {
    name: 'make-entry-point-plugin',
    generateBundle(options, bundle) {
      const outputDir = options.dir;

      if (!outputDir) {
        throw new Error('Output directory not found');
      }

      for (const module of Object.values(bundle)) {
        const fileName = basename(module.fileName);
        const newFileName = fileName.replace('.js', '_dev.js');

        switch (module.type) {
          case 'asset':
            if (fileName.endsWith('.map')) {
              cleanupTargets.add(resolve(outputDir, fileName));

              const originalFileName = fileName.replace('.map', '');
              const replacedSource = String(module.source).replaceAll(originalFileName, newFileName);

              module.source = '';
              writeFileSync(resolve(outputDir, newFileName), replacedSource);
              break;
            }
            break;

          case 'chunk': {
            writeFileSync(resolve(outputDir, newFileName), module.code);

            if (IS_FIREFOX) {
              const contentDirectory = extractContentDir(outputDir);
              module.code = `import(browser.runtime.getURL("${contentDirectory}/${newFileName}"));`;
            } else {
              module.code = `import('./${newFileName}');`;
            }
            break;
          }
        }
      }
    },
    closeBundle() {
      cleanupTargets.forEach(target => {
        unlinkSync(target);
      });
    },
  };
};

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
