import { resolve } from 'node:path';
import type { PluginOption } from 'vite';
import { getEntryPoints } from './get-entry-points.js';
import esbuild from 'esbuild';
import { IS_DEV, IS_PROD } from '@extension/env';

/**
 * Add content with matches URLs to manifest.json while preserving user-defined content scripts.
 */
export function addScriptWithMatchesToManifestPlugin(matchesDir: string): PluginOption {
  const distDir = resolve(import.meta.dirname, '../../../../dist');

  return {
    name: 'add-script-with-matches-to-manifest-plugin',

    async buildStart() {
      const entryPoints = getEntryPoints(matchesDir);

      await esbuild.build({
        entryPoints,
        bundle: true,
        outdir: resolve(distDir, 'content'),
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
