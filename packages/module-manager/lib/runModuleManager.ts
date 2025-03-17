import { recoverModules } from './recoverModules.js';
import { deleteModules } from './deleteModules.js';
import manifest from '../../../chrome-extension/manifest.js';
import { EXIT_PROMPT_ERROR } from './const.js';
import { select } from '@inquirer/prompts';
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';
import type { ActionType } from './types.js';

const manifestPath = resolve(import.meta.dirname, '..', '..', '..', 'chrome-extension', 'manifest.ts');

const manifestObject = JSON.parse(JSON.stringify(manifest)) as chrome.runtime.ManifestV3;
const manifestString = readFileSync(manifestPath, 'utf-8');

const runModuleManager = async () => {
  const tool = (await select({
    message: 'Choose a tool',
    choices: [
      { name: 'Delete Feature', value: 'delete' },
      { name: 'Recover Feature', value: 'recover' },
    ],
  }).catch(err => {
    if (err.name === EXIT_PROMPT_ERROR) {
      process.exit(0);
    } else {
      console.error(err.message);
    }
  })) as ActionType;

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
