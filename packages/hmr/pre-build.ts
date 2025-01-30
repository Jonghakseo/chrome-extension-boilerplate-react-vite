import { build } from 'esbuild';
import env from '@extension/env';

const injectionsDir = 'lib/injections';

await build({
  entryPoints: [`${injectionsDir}/reload.ts`, `${injectionsDir}/refresh.ts`],
  bundle: true,
  format: 'esm',
  outdir: 'dist/lib/injections',
  platform: 'node',
  alias: {
    '@extension/env': '../env/dist/index.mjs',
  },
  define: {
    'process.env': JSON.stringify(env),
  },
});
