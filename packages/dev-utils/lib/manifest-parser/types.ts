import type { ManifestType } from '@extension/shared';

export interface IManifestParser {
  convertManifestToString: (manifest: ManifestType, isFirefox: boolean) => string;
}
