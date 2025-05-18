import { resolve } from 'node:path';
import { makeEntryPointPlugin, tailwindBuilder } from '@extension/hmr';
import { getContentScriptEntries, withPageConfig } from '@extension/vite-config';
import { IS_DEV } from '@extension/env';
import { build } from 'vite';

const rootDir = resolve(import.meta.dirname);
const srcDir = resolve(rootDir, 'src');
const matchesDir = resolve(srcDir, 'matches');

const configs = Object.entries(getContentScriptEntries(matchesDir)).map(([name, entry]) => ({
  name,
  config: withPageConfig({
    mode: IS_DEV ? 'development' : undefined,
    resolve: {
      alias: {
        '@src': srcDir,
      },
    },
    publicDir: resolve(rootDir, 'public'),
    plugins: [IS_DEV && makeEntryPointPlugin(), tailwindBuilder({ name, rootDir, folder: resolve(matchesDir, name) })],
    build: {
      lib: {
        name: name,
        formats: ['iife'],
        entry,
        fileName: name,
      },
      outDir: resolve(rootDir, '..', '..', 'dist', 'content-ui'),
    },
  }),
}));

const builds = configs.map(async ({ config }) => {
  //@ts-expect-error This is hidden property from vite's resolveConfig()
  config.configFile = false;
  await build(config);
});

await Promise.all(builds);
