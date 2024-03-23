import type { PluginOption } from 'vite';
import MagicString from 'magic-string';

/**
 * solution for multiple content scripts
 * https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/issues/177#issuecomment-1784112536
 */
export default function inlineVitePreloadScriptPlugin(): PluginOption {
  let __vitePreload = '';
  return {
    name: 'replace-vite-preload-script-plugin',
    async renderChunk(code, chunk, options, meta) {
      if (!/content/.test(chunk.fileName)) {
        return null;
      }
      if (!__vitePreload) {
        const chunkName: string | undefined = Object.keys(meta.chunks).find(key => /preload/.test(key));
        if (!chunkName) {
          return null;
        }
        const modules = meta.chunks?.[chunkName]?.modules;
        const firstModuleId = Object.keys(modules)?.at(0);
        if (!firstModuleId) {
          return null;
        }
        const replacedCode = modules[firstModuleId]?.code;
        if (!replacedCode) {
          return null;
        }
        __vitePreload = replacedCode.replaceAll('const ', 'var ');
      }
      return {
        code: __vitePreload + code.split(`\n`).slice(1).join(`\n`),
        map: new MagicString(code).generateMap({ hires: true }),
      };
    },
  };
}
