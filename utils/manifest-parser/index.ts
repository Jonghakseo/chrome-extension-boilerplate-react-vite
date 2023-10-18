type Manifest = chrome.runtime.ManifestV3;

class ManifestParser {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static convertManifestToString(manifest: Manifest): string {
    if (process.env.__FIREFOX__) {
      manifest = this.convertToFirefoxCompatibleManifest(manifest);
    }
    return JSON.stringify(manifest, null, 2);
  }

  static convertToFirefoxCompatibleManifest(manifest: Manifest) {
    const manifestCopy = {
      ...manifest,
    } as { [key: string]: unknown };

    manifestCopy.background = {
      scripts: [manifest.background?.service_worker],
      type: 'module',
    };
    manifestCopy.options_ui = {
      page: manifest.options_page,
      browser_style: false,
    };
    manifestCopy.content_security_policy = {
      extension_pages: "script-src 'self'; object-src 'self'",
    };
    delete manifestCopy.options_page;
    return manifestCopy as Manifest;
  }
}

export default ManifestParser;
