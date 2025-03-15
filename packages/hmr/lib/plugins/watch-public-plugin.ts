import fg from 'fast-glob';
import type { PluginOption } from 'vite';

export const watchPublicPlugin = (): PluginOption => {
  return {
    name: 'watch-public-plugin',
    async buildStart() {
      const files = await fg(['public/**/*']);

      for (const file of files) {
        this.addWatchFile(file);
      }
    },
  };
};
