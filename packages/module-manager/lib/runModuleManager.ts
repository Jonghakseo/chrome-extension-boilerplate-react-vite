import { select } from '@inquirer/prompts';
import * as fs from 'node:fs';
import * as path from 'node:path';
import manifest from '../../../chrome-extension/manifest.ts';
import deleteModules from './deleteModules.js';
import recoverModules from './recoverModules.ts';
import { execSync } from 'node:child_process';

const manifestPath = path.resolve(import.meta.dirname, '..', '..', '..', 'chrome-extension', 'manifest.ts');

const manifestObject = JSON.parse(JSON.stringify(manifest)) as chrome.runtime.ManifestV3;
const manifestString = fs.readFileSync(manifestPath, 'utf-8');

async function runModuleManager() {
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
      break;
  }

  const updatedManifest = manifestString
    .replace(
      /const manifest = {[\s\S]*?} satisfies/,
      'const manifest = ' + JSON.stringify(manifestObject, null, 2) + ' satisfies',
    )
    .replace(/ {2}"version": "[\s\S]*?",/, '  version: packageJson.version,');

  fs.writeFileSync(manifestPath, updatedManifest);
  execSync('eslint --fix ' + manifestPath, { stdio: 'inherit' });
  await new Promise(resolve => {
    setTimeout(resolve, 1500);
  });
  execSync('pnpm install', { stdio: 'inherit' });
}

export default runModuleManager;
