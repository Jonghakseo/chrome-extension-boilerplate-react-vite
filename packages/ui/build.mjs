import fs from 'node:fs';
import { replaceTscAliasPaths } from 'tsc-alias';
import { resolve } from 'node:path';
import esbuild from 'esbuild';

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

/**
 * Post build paths resolve since ESBuild only natively
 * support paths resolution for bundling scenario
 * @url https://github.com/evanw/esbuild/issues/394#issuecomment-1537247216
 */
await replaceTscAliasPaths({
  configFile: 'tsconfig.json',
  watch: false,
  outDir: 'dist',
  declarationDir: 'dist',
});

fs.copyFileSync(resolve('lib', 'global.css'), resolve('dist', 'global.css'));
