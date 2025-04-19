import sucrase from '@rollup/plugin-sucrase';
import type { Plugin, RollupOptions } from 'rollup';

const plugins = [
  // @ts-expect-error Because of the lack of calling signature
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
