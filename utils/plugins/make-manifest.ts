import * as fs from 'fs';
import * as path from 'path';
import colorLog from '../log';
import ManifestParser from '../manifest-parser';
import type { PluginOption } from 'vite';

const { resolve } = path;

const distDir = resolve(__dirname, '..', '..', 'dist');

export default function makeManifest(
  manifest: chrome.runtime.ManifestV3,
  config: { contentScriptCssKey?: string },
): PluginOption {
  function makeManifest(to: string) {
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
    writeBundle() {
      makeManifest(distDir);
    },
  };
}
