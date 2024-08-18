import type { PluginOption } from 'vite';
import fg from 'fast-glob';

export function watchPublicPlugin(): PluginOption {
  return {
    name: 'watch-public-plugin',
    async buildStart() {
      const files = await fg(['public/**/*']);

      for (const file of files) {
        this.addWatchFile(file);
      }
    },
  };
}
