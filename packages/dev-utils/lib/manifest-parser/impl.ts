import type { ManifestParserInterface, Manifest } from './type';

export const ManifestParserImpl: ManifestParserInterface = {
  convertManifestToString: (manifest, env) => {
    if (env === 'firefox') {
      manifest = convertToFirefoxCompatibleManifest(manifest);
    }
    return JSON.stringify(manifest, null, 2);
  },
};

function convertToFirefoxCompatibleManifest(manifest: Manifest) {
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
  manifestCopy.browser_specific_settings = {
    gecko: {
      id: 'example@example.com',
      strict_min_version: '109.0',
    },
  };
  delete manifestCopy.options_page;
  return manifestCopy as Manifest;
}
