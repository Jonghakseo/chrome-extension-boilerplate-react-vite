import { IS_DEV, IS_PROD } from '@extension/env';
import { buildSync } from 'esbuild';
import fs from 'fast-glob';
import { resolve } from 'node:path';
import type { PluginOption } from 'vite';

/**
 * Add content with matches URLs to manifest.json while preserving user-defined content scripts.
 */
export const bundleContentScriptWithHmr = (scriptName: string): PluginOption => {
  return {
    name: 'add-script-with-matches-to-manifest-plugin',
    enforce: 'post',
    writeBundle() {
      const distContentDir = resolve(import.meta.dirname, '..', '..', '..', '..', '..', 'dist', scriptName);
      // eslint-disable-next-line import-x/no-named-as-default-member
      const entryPoints = fs
        .sync('*.js', {
          cwd: resolve(import.meta.dirname, '..', '..', '..', '..', '..', 'pages', scriptName, 'dist', 'matches'),
          absolute: true,
        })
        .filter(entry => !entry.includes('_dev.js'));

      buildSync({
        entryPoints,
        bundle: true,
        outdir: distContentDir,
        entryNames: '[name].iife',
        format: 'iife',
        globalName: 'ContentScripts',
        target: ['esnext'],
        minify: IS_PROD,
        sourcemap: IS_DEV,
      });
    },
  };
};
