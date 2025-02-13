import { resolve } from 'node:path';
import type { PluginOption } from 'vite';
import { buildSync } from 'esbuild';
import { IS_DEV, IS_PROD } from '@extension/env';
import fg from 'fast-glob';

/**
 * Add content with matches URLs to manifest.json while preserving user-defined content scripts.
 */
export function bundleContentScriptWithHmr(scriptName: string): PluginOption {
  return {
    name: 'add-script-with-matches-to-manifest-plugin',
    writeBundle() {
      const distContentDir = resolve(import.meta.dirname, '..', '..', '..', '..', '..', 'dist', scriptName);
      const entryPoints = fg.sync('*.js', {
        cwd: resolve(import.meta.dirname, '..', '..', '..', '..', '..', 'pages', scriptName, 'dist', 'matches'),
        absolute: true,
      });

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
}
