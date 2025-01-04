import fs from 'node:fs';
import path from 'node:path';
import esbuild from 'esbuild';
import { rimraf } from 'rimraf';

/**
 * @param i18nPath {string}
 */
export async function build(i18nPath) {
  fs.cpSync(i18nPath, path.resolve('lib', 'i18n.ts'));

  await esbuild.build({
    entryPoints: ['./index.ts'],
    tsconfig: './tsconfig.json',
    bundle: true,
    packages: 'bundle',
    target: 'es6',
    outdir: './dist',
    sourcemap: true,
    format: 'esm',
  });

  const outDir = path.resolve('..', '..', 'dist');
  const localePath = path.resolve(outDir, '_locales');
  rimraf.sync(localePath);
  fs.cpSync(path.resolve('locales'), localePath, { recursive: true });

  console.log('I18n build complete');
}
