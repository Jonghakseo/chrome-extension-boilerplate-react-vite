import { resolve } from 'node:path';
import { readdirSync, statSync } from 'node:fs';

export const getEntryPoints = (matchesDir: string) => {
  const entryPoints: Record<string, string> = {};
  const entries = readdirSync(matchesDir);

  entries.forEach((folder: string) => {
    const filePath = resolve(matchesDir, folder);
    const isFolder = statSync(filePath).isDirectory();
    const haveIndexFile = isFolder && readdirSync(filePath).includes('index.ts');

    if (!haveIndexFile) {
      throw new Error(`${folder} in \`matches\` doesn't have index.ts file`);
    } else {
      entryPoints[folder] = resolve(filePath, 'index.ts');
    }
  });

  return entryPoints;
};
