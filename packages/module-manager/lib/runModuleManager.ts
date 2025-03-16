import { recoverModules } from './recoverModules.js';
import manifest from '../../../chrome-extension/manifest.ts';
import { deleteModules } from './deleteModules.js';
import { select } from '@inquirer/prompts';
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';

const manifestPath = resolve(import.meta.dirname, '..', '..', '..', 'chrome-extension', 'manifest.ts');

const manifestObject = JSON.parse(JSON.stringify(manifest)) as chrome.runtime.ManifestV3;
const manifestString = readFileSync(manifestPath, 'utf-8');

const runModuleManager = async () => {
  const tool = await select({
    message: 'Choose a tool',
    choices: [
      { name: 'Delete Feature', value: 'delete' },
      { name: 'Recover Feature', value: 'recover' },
    ],
  });

  switch (tool) {
    case 'delete':
      await deleteModules(manifestObject);
      break;
    case 'recover':
      await recoverModules(manifestObject);
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
