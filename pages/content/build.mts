import { resolve } from 'node:path';
import { makeEntryPointPlugin } from '@extension/hmr';
import { withPageConfig } from '@extension/vite-config';
import { IS_DEV } from '@extension/env';
import glob from 'fast-glob';
import { build } from "vite";

const rootDir = resolve(import.meta.dirname);
const srcDir = resolve(rootDir, 'src');
const matchesDir = resolve(srcDir, 'matches');

// Suppress fs.Stats deprecation warning
// @ts-ignore
process.noDeprecation = true;

// Dynamically find all entry points
const entryPoints = glob.sync('*/index.ts', { cwd: matchesDir });

// Create separate configs for each entry point
const configs = entryPoints.map((file) => {
  const name = file.split('/')[0];
  return withPageConfig({
    resolve: {
      alias: {
        '@src': srcDir,
      },
    },
    publicDir: resolve(rootDir, 'public'),
    plugins: [IS_DEV && makeEntryPointPlugin()],
    build: {
      lib: {
        name: name,
        formats: ['iife'],
        entry: resolve(matchesDir, file),
        fileName: () => `${name}.iife.js`,
      },
      outDir: resolve(rootDir, '..', '..', 'dist', 'content'),
    },
  });
});


const builds = configs.map(async (config) => {
  //@ts-expect-error this is hidden property into vite's resolveConfig()
  config.configFile = false
  await build(config);
})

await Promise.all(builds);
