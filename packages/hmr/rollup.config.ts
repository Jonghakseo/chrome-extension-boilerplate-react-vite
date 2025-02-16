import sucrase from '@rollup/plugin-sucrase';
import type { Plugin, RollupOptions } from 'rollup';

const plugins = [
  // @ts-expect-error I don't know why error happening here
  sucrase({
    exclude: ['node_modules/**'],
    transforms: ['typescript'],
  }),
] satisfies Plugin[];

export default [
  {
    plugins,
    input: 'lib/injections/reload.ts',
    output: {
      format: 'esm',
      file: 'dist/lib/injections/reload.js',
    },
  },
  {
    plugins,
    input: 'lib/injections/refresh.ts',
    output: {
      format: 'esm',
      file: 'dist/lib/injections/refresh.js',
    },
  },
] satisfies RollupOptions[];
