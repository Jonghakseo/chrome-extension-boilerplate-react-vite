import sucrase from '@rollup/plugin-sucrase';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

const plugins = [
  sucrase({
    exclude: ['node_modules/**'],
    transforms: ['typescript'],
  }),
  typescript({
    compilerOptions: {
      module: 'CommonJS'
    },
  }),
  commonjs({ extensions: ['.js', '.ts'] }),
];

/**
 * @type {import("rollup").RollupOptions[]}
 */
export default [
  {
    plugins,
    input: 'index.ts',
    output: {
      format: 'iife',
      file: 'dist/index.js',
    },
  },
];
