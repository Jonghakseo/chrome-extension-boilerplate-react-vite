import type { ManifestType } from '@extension/shared';

export interface ManifestParserInterface {
  convertManifestToString: (manifest: ManifestType, isFirefox: boolean) => string;
}
