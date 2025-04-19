import { MANAGER_ACTION_PROMPT_CONFIG } from './const.js';
import { deleteFeature } from './deleteFeature.js';
import { recoverFeature } from './recoverFeature.js';
import { promptSelection } from './utils.js';
import manifest from '../../../chrome-extension/manifest.js';
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { CliActionType, ModuleNameType } from './types.js';
import type { ManifestType } from '@extension/shared';

const manifestPath = resolve(import.meta.dirname, '..', '..', '..', 'chrome-extension', 'manifest.ts');

const manifestObject = JSON.parse(JSON.stringify(manifest)) as ManifestType;
const manifestString = readFileSync(manifestPath, 'utf-8');

const runModuleManager = async (moduleName?: ModuleNameType, action?: CliActionType) => {
  if (!action) {
    action = (await promptSelection(MANAGER_ACTION_PROMPT_CONFIG)) as Awaited<CliActionType>;
  }

  switch (action) {
    case 'delete':
      await deleteFeature(manifestObject, moduleName);
      break;
    case 'recover':
      await recoverFeature(manifestObject, moduleName);
  }

  const updatedManifest = manifestString
    .replace(
      /const manifest = {[\s\S]*?} satisfies/,
      'const manifest = ' + JSON.stringify(manifestObject, null, 2) + ' satisfies',
    )
    .replace(/ {2}"version": "[\s\S]*?",/, '  version: packageJson.version,');

  writeFileSync(manifestPath, updatedManifest);
  execSync('pnpm i', {
    stdio: 'inherit',
    cwd: resolve('..', '..'),
  });

  execSync('pnpm -F chrome-extension lint:fix', {
    stdio: 'inherit',
    cwd: resolve('..', '..'),
  });
};

export default runModuleManager;
