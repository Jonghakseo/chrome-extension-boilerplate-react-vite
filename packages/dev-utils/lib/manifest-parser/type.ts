export type Manifest = chrome.runtime.ManifestV3;

export interface ManifestParserInterface {
  convertManifestToString: (manifest: Manifest, env: 'chrome' | 'firefox') => string;
}
