import type { PluginOption } from 'vite';

export default function customDynamicImport(): PluginOption {
  return {
    name: 'custom-dynamic-import',
    renderDynamicImport({ moduleId }) {
      if (!moduleId.includes('node_modules') && process.env.__FIREFOX__) {
        return {
          left: `import(browser.runtime.getURL('./') + `,
          right: ".split('../').join(''));",
        };
      }
      return {
        left: 'import(',
        right: ')',
      };
    },
  };
}
