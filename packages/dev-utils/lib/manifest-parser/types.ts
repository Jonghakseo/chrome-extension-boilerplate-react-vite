export type Manifest = chrome.runtime.ManifestV3;

export interface ManifestParserInterface {
  convertManifestToString: (manifest: Manifest, isFirefox: boolean) => string;
}
