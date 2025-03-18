import { resolve } from "node:path";
import { getContentScriptEntries } from "@extension/vite-config";
import { build } from "tailwindcss/lib/cli/build";

const rootDir = resolve(import.meta.dirname);
const srcDir = resolve(rootDir, 'src');
const matchesDir = resolve(srcDir, 'matches');

const builds = Object.entries(getContentScriptEntries(matchesDir)).map(async ([name]) => {
  const folder = resolve(matchesDir, name)
  const args = {
    ['--input']: resolve(folder, 'index.css'),
    ['--output']: resolve(rootDir, 'dist', name, 'index.css'),
    ['--config']: resolve(rootDir, 'tailwind.config.ts'),
  }
  await build(args)
});

await Promise.all(builds);
