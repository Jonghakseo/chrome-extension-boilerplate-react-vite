import { resolve } from 'node:path';

export const pagesPath = resolve(import.meta.dirname, '..', '..', '..', 'pages');
export const testsPath = resolve(pagesPath, '..', 'tests');
export const specsPath = resolve(testsPath, 'e2e', 'specs');
export const archivePath = resolve(import.meta.dirname, '..', 'archive');
