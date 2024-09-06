import esbuild from 'esbuild';
import fs from 'fs';
import { resolve } from 'path';

/**
 * @type { import('esbuild').BuildOptions }
 */
const buildOptions = {
  entryPoints: ['./index.ts', './lib/**/*.ts', './lib/**/*.tsx'],
  tsconfig: './tsconfig.json',
  bundle: false,
  target: 'es6',
  outdir: './dist',
  sourcemap: true,
};

await esbuild.build(buildOptions);
fs.copyFileSync(resolve('lib', 'global.css'), resolve('dist', 'global.css'));
