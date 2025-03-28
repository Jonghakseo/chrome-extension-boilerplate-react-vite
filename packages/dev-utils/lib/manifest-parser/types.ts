import type { ManifestType } from '../shared-types.js';

export interface ManifestParserInterface {
  convertManifestToString: (manifest: ManifestType, isFirefox: boolean) => string;
}
