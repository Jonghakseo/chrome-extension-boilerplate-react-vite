import { dirname } from 'node:path';
import type { PluginOption } from 'vite';

export const importMetaPlugin = (): PluginOption => {
  return {
    name: 'vite-plugin-import-meta-properties',
    enforce: 'pre',
    transform(code, id) {
      if (code.includes('import.meta.dirname') || code.includes('import.meta.filename')) {
        const path = id.split('?')[0];
        const dirPath = JSON.stringify(dirname(path));
        const filePath = JSON.stringify(path);

        return {
          code: code.replace(/import\.meta\.dirname/g, dirPath).replace(/import\.meta\.filename/g, filePath),
          map: null,
        };
      }
      return null;
    },
  };
};
