/**
 * solution for multiple content scripts
 * https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/issues/177#issuecomment-1784112536
 */
export default function inlineVitePreloadScript() {
  let __vitePreload = '';
  return {
    name: 'replace-vite-preload-script-plugin',
    async renderChunk(code, chunk, options, meta) {
      if (!/content/.test(chunk.fileName)) {
        return null;
      }
      if (!__vitePreload) {
        const chunkName = Object.keys(meta.chunks).find(key => /preload/.test(key));
        const modules = meta.chunks[chunkName].modules;
        __vitePreload = modules[Object.keys(modules)[0]].code;
        __vitePreload = __vitePreload.replaceAll('const ', 'var ');
      }
      return {
        code: __vitePreload + code.split(`\n`).slice(1).join(`\n`),
      };
    },
  };
}
