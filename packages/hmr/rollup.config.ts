import sucrase from '@rollup/plugin-sucrase';
import type { RollupOptions } from 'rollup';

const plugins = [
  sucrase({
    exclude: ['node_modules/**'],
    transforms: ['typescript'],
  }),
];

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
] as RollupOptions[];
