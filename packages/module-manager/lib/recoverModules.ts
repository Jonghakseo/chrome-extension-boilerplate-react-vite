import { checkbox } from '@inquirer/prompts';
import { unzipSync } from 'fflate';
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { DEFAULT_CHOICES } from './const.js';
import type { ModuleType } from './modulesHandler.js';
import { recoverModule } from './modulesHandler.js';
import { resolve } from 'node:path';
import { existsSync, readdirSync } from 'node:fs';

const pagesPath = resolve(import.meta.dirname, '..', '..', '..', 'pages');
const archivePath = resolve(import.meta.dirname, '..', 'archive');

const archiveFiles = existsSync(archivePath) ? readdirSync(archivePath) : [];

export const recoverModules = async (manifestObject: chrome.runtime.ManifestV3) => {
  const choices = DEFAULT_CHOICES.filter(choice => {
    if (choice.value === 'background') {
      return !manifestObject.background;
    }
    return archiveFiles.includes(`${choice.value}.zip`);
  });

  if (!choices.length) {
    console.log('No features to recover');
    process.exit(0);
  }

  const answers = await checkbox({
    message: 'Choose the features you want to recover',
    loop: false,
    choices,
  });

  if (!answers.length) {
    console.log('No features selected');
    process.exit(0);
  }

  for (const answer of answers) {
    recoverModule(manifestObject, answer as ModuleType, pagesPath);
  }
  console.log(`Recovered selected features: ${answers.join(', ')}`);
};
