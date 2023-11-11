import * as fs from 'fs';
import * as path from 'path';
import colorLog from '../log';
import ManifestParser from '../manifest-parser';
import type { PluginOption } from 'vite';

const { resolve } = path;

const rootDir = resolve(__dirname, '..', '..');
const distDir = resolve(rootDir, 'dist');
const manifestFile = resolve(rootDir, 'manifest.js');

export default function makeManifest(config: {
  getManifest: () => Promise<{ default: chrome.runtime.ManifestV3 }>;
  contentScriptCssKey?: string;
}): PluginOption {
  function makeManifest(manifest: chrome.runtime.ManifestV3, to: string) {
    if (!fs.existsSync(to)) {
      fs.mkdirSync(to);
    }
    const manifestPath = resolve(to, 'manifest.json');

    // Naming change for cache invalidation
    if (config.contentScriptCssKey) {
      manifest.content_scripts.forEach(script => {
        script.css = script.css.map(css => css.replace('<KEY>', config.contentScriptCssKey));
      });
    }

    fs.writeFileSync(manifestPath, ManifestParser.convertManifestToString(manifest));

    colorLog(`Manifest file copy complete: ${manifestPath}`, 'success');
  }

  return {
    name: 'make-manifest',
    buildStart() {
      this.addWatchFile(manifestFile);
    },
    async writeBundle() {
      const manifest = await config.getManifest();
      makeManifest(manifest.default, distDir);
    },
  };
}
