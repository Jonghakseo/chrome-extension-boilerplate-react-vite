import esbuild from 'esbuild';
import { resolve } from 'node:path';
import { IS_DEV, IS_PROD } from '@extension/env';
import { getEntryPoints } from '@extension/content-script-matches-plugin';

const rootDistDir = resolve(import.meta.dirname, '../../dist');
const matchesDir = resolve(import.meta.dirname, 'src/matches');
const entryPoints = getEntryPoints(matchesDir);

await esbuild.build({
  entryPoints,
  bundle: true,
  outdir: resolve(rootDistDir, 'content'),
  entryNames: '[name].iife',
  format: 'iife',
  globalName: 'ContentScripts',
  target: ['es6'],
  minify: IS_PROD,
  sourcemap: IS_DEV,
});
