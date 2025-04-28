import { ManifestParser } from '@extension/dev-utils';
import { IS_DEV, IS_FIREFOX } from '@extension/env';
import { colorfulLog } from '@extension/shared';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { platform } from 'node:process';
import { pathToFileURL } from 'node:url';
import type { ManifestType } from '@extension/shared';
import type { PluginOption } from 'vite';

const manifestFile = resolve(import.meta.dirname, '..', '..', 'manifest.js');
const refreshFilePath = resolve(
  import.meta.dirname,
  '..',
  '..',
  '..',
  'packages',
  'hmr',
  'dist',
  'lib',
  'injections',
  'refresh.js',
);

const withHMRId = (code: string) => `(function() {let __HMR_ID = 'chrome-extension-hmr';${code}\n})();`;

const getManifestWithCacheBurst = async () => {
  const withCacheBurst = (path: string) => `${path}?${Date.now().toString()}`;

  /**
   * In Windows, import() doesn't work without file:// protocol.
   * So, we need to convert path to file:// protocol. (url.pathToFileURL)
   */
  if (platform === 'win32') {
    return (await import(withCacheBurst(pathToFileURL(manifestFile).href))).default;
  } else {
    return (await import(withCacheBurst(manifestFile))).default;
  }
};

const addRefreshContentScript = (manifest: ManifestType) => {
  manifest.content_scripts = manifest.content_scripts || [];
  manifest.content_scripts.push({
    matches: ['http://*/*', 'https://*/*', '<all_urls>'],
    js: ['refresh.js'], // for public's HMR(refresh) support
  });
};

export default (config: { outDir: string }): PluginOption => {
  const makeManifest = (manifest: ManifestType, to: string) => {
    if (!existsSync(to)) {
      mkdirSync(to);
    }

    const manifestPath = resolve(to, 'manifest.json');

    if (IS_DEV) {
      addRefreshContentScript(manifest);
    }

    writeFileSync(manifestPath, ManifestParser.convertManifestToString(manifest, IS_FIREFOX));

    const refreshFileString = readFileSync(refreshFilePath, 'utf-8');

    if (IS_DEV) {
      writeFileSync(resolve(to, 'refresh.js'), withHMRId(refreshFileString));
    }

    colorfulLog(`Manifest file copy complete: ${manifestPath}`, 'success');
  };

  return {
    name: 'make-manifest',
    buildStart() {
      this.addWatchFile(manifestFile);
    },
    async writeBundle() {
      const outDir = config.outDir;
      const manifest = await getManifestWithCacheBurst();
      makeManifest(manifest, outDir);
    },
  };
};
