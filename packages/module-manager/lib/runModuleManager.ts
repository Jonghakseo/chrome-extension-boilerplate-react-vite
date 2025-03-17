import { recoverModules } from './recoverModules.js';
import { deleteModules } from './deleteModules.js';
import manifest from '../../../chrome-extension/manifest.js';
import { EXIT_PROMPT_ERROR } from './const.js';
import { promptSelection } from './utils.js';
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';

const manifestPath = resolve(import.meta.dirname, '..', '..', '..', 'chrome-extension', 'manifest.ts');

const manifestObject = JSON.parse(JSON.stringify(manifest)) as chrome.runtime.ManifestV3;
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
  execSync('eslint --fix ' + manifestPath, { stdio: 'inherit' });

  await new Promise(resolve => {
    setTimeout(resolve, 1500);
  });
  execSync('pnpm i', { stdio: 'inherit' });
};

export default runModuleManager;
