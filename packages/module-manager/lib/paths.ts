import path from 'node:path';

const pagesPath = path.resolve(import.meta.dirname, '..', '..', 'pages');

export const moduleManagerPaths = {
  pages: pagesPath,
};
