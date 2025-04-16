import env, { IS_DEV, IS_PROD } from '@extension/env';
import { importMetaPlugin, watchRebuildPlugin } from '@extension/hmr';
import react from '@vitejs/plugin-react-swc';
import deepmerge from 'deepmerge';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import type { UserConfig } from 'vite';

export const watchOption = IS_DEV
  ? {
      exclude: [/\/pages\/content-ui\/dist\/.*\.(css)$/],
      chokidar: {
        awaitWriteFinish: true,
        ignored: [/\/packages\/.*\.(ts|tsx|map)$/, /\/pages\/content-ui\/dist\/.*/],
      },
    }
  : undefined;

export const withPageConfig = (config: UserConfig) =>
  defineConfig(
    deepmerge(
      {
        define: {
          'process.env': env,
        },
        base: '',
        plugins: [react(), IS_DEV && watchRebuildPlugin({ refresh: true }), nodePolyfills(), importMetaPlugin()],
        build: {
          sourcemap: IS_DEV,
          minify: IS_PROD,
          reportCompressedSize: IS_PROD,
          emptyOutDir: IS_PROD,
          watch: watchOption,
          rollupOptions: {
            external: ['chrome'],
          },
        },
      },
      config,
    ),
  );
