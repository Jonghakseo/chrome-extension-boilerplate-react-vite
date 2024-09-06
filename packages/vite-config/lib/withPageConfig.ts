import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';
import { watchRebuildPlugin } from '@extension/hmr';
import react from '@vitejs/plugin-react-swc';
import deepmerge from 'deepmerge';
import { isDev, isProduction } from './env.js';

export const watchOption = isDev
  ? {
      buildDelay: 100,
      chokidar: {
        ignored: [/\/packages\/.*\.(ts|tsx|map)$/],
      },
    }
  : undefined;

export const withPageConfig = (config: UserConfig) =>
  defineConfig(
    deepmerge(
      {
        base: '',
        plugins: [react(), isDev && watchRebuildPlugin({ refresh: true })],
        build: {
          sourcemap: isDev,
          minify: isProduction,
          reportCompressedSize: isProduction,
          emptyOutDir: isProduction,
          watch: watchOption,
          rollupOptions: {
            external: ['chrome'],
          },
        },
        define: {
          'process.env.NODE_ENV': isDev ? `"development"` : `"production"`,
        },
        envDir: '../..',
      },
      config,
    ),
  );
