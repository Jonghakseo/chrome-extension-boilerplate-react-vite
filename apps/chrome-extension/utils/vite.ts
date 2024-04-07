import { type PluginOption } from 'vite';
import makeManifestPlugin from './plugins/make-manifest-plugin';
// import customDynamicImportPlugin from './plugins/custom-dynamic-import-plugin';
// import inlineVitePreloadScriptPlugin from './plugins/inline-vite-preload-script-plugin';
import { watchRebuildPlugin } from '@chrome-extension-boilerplate/hmr-old';

export const getPlugins = (isDev: boolean, outDir: string): PluginOption[] => [
  makeManifestPlugin({ outDir }),
  isDev && watchRebuildPlugin(),
  // For fix issue#177 (https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/issues/177)
  // inlineVitePreloadScriptPlugin(),
];
