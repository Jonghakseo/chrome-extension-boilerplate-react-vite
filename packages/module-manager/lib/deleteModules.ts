import { posix, resolve } from 'node:path';
import { checkbox } from '@inquirer/prompts';
import fg from 'fast-glob';
import { DEFAULT_CHOICES } from './const.js';
import type { ModuleType } from './modulesHandler.js';
import { deleteModule } from './modulesHandler.js';
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { streamFileToZip } from '@extension/shared';
import { AsyncZipDeflate, Zip } from 'fflate';
import { rimraf } from 'rimraf';
import fs, { createReadStream, createWriteStream } from 'node:fs';
import { posix, resolve } from 'node:path';

const pagesPath = resolve(import.meta.dirname, '..', '..', '..', 'pages');
const archivePath = resolve(import.meta.dirname, '..', 'archive');

const pageFolders = readdirSync(pagesPath);

export default async function deleteModules(manifestObject: chrome.runtime.ManifestV3) {
  const choices = DEFAULT_CHOICES.filter(choice => {
    if (choice.value === 'background') {
      return !!manifestObject.background;
    }
    return pageFolders.includes(choice.value);
  });

  if (!choices.length) {
    console.log('No features to delete');
    process.exit(0);
  }

  const answers = await checkbox({
    message: 'Choose the features you want to delete',
    loop: false,
    choices,
  });

  if (!answers.length) {
    console.log('No features selected');
    process.exit(0);
  }

  if (!existsSync(archivePath)) {
    mkdirSync(archivePath, { recursive: true });
  }

  for (const answer of answers) {
    await deleteModule(manifestObject, answer as ModuleType, pagesPath);
  }
  console.log(`Deleted selected features: ${answers.join(', ')}`);
};
