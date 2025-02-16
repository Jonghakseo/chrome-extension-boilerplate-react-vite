import type { Manifest, ManifestParserInterface } from './types.js';

export const ManifestParserImpl: ManifestParserInterface = {
  convertManifestToString: (manifest, isFirefox) => {
    if (isFirefox) {
      manifest = convertToFirefoxCompatibleManifest(manifest);
    }

    return JSON.stringify(manifest, null, 2);
  },
};

const convertToFirefoxCompatibleManifest = (manifest: Manifest) => {
  const manifestCopy = {
    ...manifest,
  } as { [key: string]: unknown };

  if (manifest.background?.service_worker) {
    manifestCopy.background = {
      scripts: [manifest.background.service_worker],
      type: 'module',
    };
  }
  if (manifest.options_page) {
    manifestCopy.options_ui = {
      page: manifest.options_page,
      browser_style: false,
    };
  }
  manifestCopy.content_security_policy = {
    extension_pages: "script-src 'self'; object-src 'self'",
  };
  manifestCopy.permissions = (manifestCopy.permissions as string[]).filter(value => value !== 'sidePanel');

  delete manifestCopy.options_page;
  delete manifestCopy.side_panel;
  return manifestCopy as Manifest;
};
