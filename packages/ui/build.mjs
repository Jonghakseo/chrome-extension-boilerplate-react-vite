import * as esbuild from 'esbuild';
import * as fs from 'fs';
import { resolve } from 'node:path';

/**
 * @type { import("esbuild").BuildOptions }
 */
const buildOptions = {
  entryPoints: ['./index.ts', './tailwind.config.ts', './lib/**/*.ts', './lib/**/*.tsx'],
  tsconfig: './tsconfig.json',
  bundle: false,
  target: 'es6',
  outdir: './dist',
  sourcemap: true,
};

await esbuild.build(buildOptions);
fs.copyFileSync(resolve('lib', 'global.css'), resolve('dist', 'global.css'));
