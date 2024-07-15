import { defineConfig } from 'vite';
import { watchRebuildPlugin } from '@chrome-extension-boilerplate/hmr';
import react from '@vitejs/plugin-react-swc';
import deepmerge from 'deepmerge';
import { isDev, isProduction } from './env.mjs';

/**
 * @typedef {import('vite').UserConfig} UserConfig
 * @param {UserConfig} config
 * @returns {UserConfig}
 */
export function withPageConfig(config) {
  return defineConfig(
    deepmerge(
      {
        base: '',
        plugins: [react(), isDev && watchRebuildPlugin({ refresh: true })],
        build: {
          sourcemap: isDev,
          minify: isProduction,
          reportCompressedSize: isProduction,
          emptyOutDir: true,
          rollupOptions: {
            external: ['chrome'],
          },
        },
        define: {
          'process.env.NODE_ENV': isDev ? `"development"` : `"production"`,
        },
      },
      config,
    ),
  );
}
