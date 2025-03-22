import { EXIT_PROMPT_ERROR } from './const.js';
import { zipFolder } from './zipUtils.js';
import { select } from '@inquirer/prompts';
import { rimraf } from 'rimraf';
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { InputConfigType, ModuleNameType } from './types.js';

export const promptSelection = async (inputConfig: InputConfigType) => {
  if (!inputConfig.choices.length) {
    console.log('No choices available');
    process.exit(0);
  }

  return select(inputConfig).catch(err => {
    if (err.name === EXIT_PROMPT_ERROR) {
      process.exit(0);
    } else {
      console.error(err.message);
    }
  }) as Promise<string>;
};

export const removeContentRuntimeReferencesFromPopup = async (pagesPath: string, archivePath: string) => {
  const popupTsxPath = resolve(pagesPath, 'popup', 'src', 'Popup.tsx');
  const popupContent = readFileSync(popupTsxPath, 'utf-8');

  await zipFolder(resolve(pagesPath, 'popup'), resolve(archivePath, 'popup.zip'));

  const updatedContent = popupContent
    .replace(/const injectContentScript = async \(\) => {[\s\S]*?};(\r?\n)*/, '')
    .replace(/<button[^>]*onClick=\{injectContentScript}[^>]*>[^<]*<\/button>(\r?\n)*/, '')
    .replace(/const notificationOptions = {[\s\S]*?} as const;(\r?\n)*/, '');

  writeFileSync(popupTsxPath, updatedContent);
  execSync('pnpm lint:fix', { stdio: 'inherit', cwd: resolve('..', '..', 'pages', 'popup') });
};

export const zipAndDeleteModuleWithTest = async (
  moduleName: ModuleNameType,
  pagesPath: string,
  archivePath: string,
  testsPath: string,
) => {
  const moduleTestName = `page-${moduleName}.test.ts`;

  await zipFolder(resolve(pagesPath, moduleName), resolve(archivePath, `${moduleName}.zip`));
  await zipFolder(testsPath, resolve(archivePath, `${moduleName}.test.zip`), [moduleTestName]);

  const modulePath = resolve(pagesPath, moduleName);
  const moduleTestsPath = resolve(testsPath, moduleTestName);

  void rimraf([modulePath, moduleTestsPath]);
};
