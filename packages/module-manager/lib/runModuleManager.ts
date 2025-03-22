import { deleteFeature } from './deleteFeature.js';
import { recoverFeature } from './recoverFeature.js';
import { promptSelection } from './utils.js';
import manifest from '../../../chrome-extension/manifest.js';
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { ManifestType } from '@extension/shared';

const manifestPath = resolve(import.meta.dirname, '..', '..', '..', 'chrome-extension', 'manifest.ts');

const manifestObject = JSON.parse(JSON.stringify(manifest)) as ManifestType;
const manifestString = readFileSync(manifestPath, 'utf-8');

const runModuleManager = async () => {
  const inputConfig = {
    message: 'Choose a tool',
    choices: [
      { name: 'Delete Feature', value: 'delete' },
      { name: 'Recover Feature', value: 'recover' },
    ],
  } as const;

  const tool = await promptSelection(inputConfig);

  switch (tool) {
    case 'delete':
      await deleteFeature(manifestObject);
      break;
    case 'recover':
      await recoverFeature(manifestObject);
  }

  const updatedManifest = manifestString
    .replace(
      /const manifest = {[\s\S]*?} satisfies/,
      'const manifest = ' + JSON.stringify(manifestObject, null, 2) + ' satisfies',
    )
    .replace(/ {2}"version": "[\s\S]*?",/, '  version: packageJson.version,');

  writeFileSync(manifestPath, updatedManifest);
  execSync('pnpm i && pnpm -F chrome-extension lint:fix && git add .', {
    stdio: 'inherit',
    cwd: resolve('..', '..'),
  });
};

export default runModuleManager;
