import { IS_PROD } from '@extension/env';
import { spawn } from 'cross-spawn';
import { resolve } from 'node:path';
import type { Plugin } from 'vite';

const buildTW = async (args: string[]): Promise<void> =>
  new Promise((resolve, reject) => {
    const process = spawn('npx', ['@tailwindcss/cli', ...args], { stdio: 'inherit' });

    process.on('close', (code: number) => {
      if (!code) {
        resolve();
      } else {
        reject(new Error(`Tailwind CLI process exited with code ${code}`));
      }
    });

    process.on('error', (error: unknown) => {
      reject(error);
    });
  });

export const tailwindCssBuilder = ({
  folder,
  rootDir,
  name,
}: {
  folder: string;
  rootDir: string;
  name: string;
}): Plugin => ({
  name: 'tailwindcss-builder-plugin',
  async buildStart() {
    const args = [
      '--input',
      resolve(folder, 'index.css'),
      '--output',
      resolve(rootDir, 'dist', name, 'index.css'),
      IS_PROD ? '--minify' : '',
    ].filter(Boolean);

    await buildTW(args);
  },
});
