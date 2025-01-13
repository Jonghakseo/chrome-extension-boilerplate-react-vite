import { existsSync, mkdirSync, writeFileSync, copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { env, platform } from 'node:process';
import type { Manifest } from '@extension/dev-utils';
import { colorLog, ManifestParser } from '@extension/dev-utils';
import type { PluginOption } from 'vite';

const manifestFile = resolve(import.meta.dirname, '..', '..', 'manifest.js');
const refreshFile = resolve(import.meta.dirname, '..', 'refresh.js');

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

export default (config: { outDir: string }): PluginOption => {
  const makeManifest = (manifest: Manifest, to: string) => {
    if (!existsSync(to)) {
      mkdirSync(to);
    }

    const manifestPath = resolve(to, 'manifest.json');
    const isFirefox = env.__FIREFOX__ === 'true';
    const isDev = process.env.__DEV__ === 'true';

    writeFileSync(manifestPath, ManifestParser.convertManifestToString(manifest, isFirefox));

    isDev && addRefreshContentScript(manifest);

    writeFileSync(manifestPath, ManifestParser.convertManifestToString(manifest, isFirefox ? 'firefox' : 'chrome'));

    isDev && copyFileSync(refreshFile, resolve(to, 'refresh.js'));

    colorLog(`Manifest file copy complete: ${manifestPath}`, 'success');
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

function addRefreshContentScript(manifest: Manifest) {
  manifest.content_scripts = manifest.content_scripts || [];
  manifest.content_scripts.push({
    matches: ['http://*/*', 'https://*/*', '<all_urls>'],
    js: ['refresh.js'], // for public's HMR(refresh) support
  });
}
