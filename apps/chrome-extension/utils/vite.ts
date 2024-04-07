import { type PluginOption } from 'vite';
import makeManifestPlugin from './plugins/make-manifest-plugin';
import customDynamicImportPlugin from './plugins/custom-dynamic-import-plugin';
import inlineVitePreloadScriptPlugin from './plugins/inline-vite-preload-script-plugin';
import { watchRebuildPlugin } from '@chrome-extension-boilerplate/hmr-old';

export const getPlugins = (isDev: boolean, outDir: string): PluginOption[] => [
  makeManifestPlugin({ outDir }),
  customDynamicImportPlugin(),
  // You can toggle enable HMR in background script or view
  // addHmrPlugin({ background: true, view: true, isDev }),
  isDev && watchRebuildPlugin({ afterWriteBundle: regenerateCacheInvalidationKey }),
  // For fix issue#177 (https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/issues/177)
  inlineVitePreloadScriptPlugin(),
];

const cacheInvalidationKeyRef = { current: generateKey() };

function regenerateCacheInvalidationKey() {
  cacheInvalidationKeyRef.current = generateKey();
  return cacheInvalidationKeyRef;
}

function generateKey(): string {
  return `${Date.now().toFixed()}`;
}
