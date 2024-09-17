import { config as baseConfig } from './wdio.conf';
import { readFile } from 'node:fs/promises';
import { getChromeExtensionPath, getFirefoxExtensionPath } from '../utils/extension-path';
import { resolve } from 'node:path';

const isFirefox = process.env.__FIREFOX__ === 'true';
const isCI = process.env.CI === 'true';

const archiveName = isFirefox ? 'extension.xpi' : 'extension.zip';
const extPath = resolve(import.meta.dirname, '..', '..', '..', 'dist-zip', archiveName);
const bundledExtension = (await readFile(extPath)).toString('base64');

const chromeCapabilities = {
  browserName: 'chrome',
  browserVersion: 'latest',
  acceptInsecureCerts: true,
  'goog:chromeOptions': {
    args: [
      '--disable-web-security',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      ...(isCI ? ['--headless'] : []),
    ],
    prefs: { 'extensions.ui.developer_mode': true },
    extensions: [bundledExtension],
  },
};

const firefoxCapabilities = {
  browserName: 'firefox',
  browserVersion: 'latest',
  acceptInsecureCerts: true,
  'moz:firefoxOptions': {
    args: [...(isCI ? ['--headless'] : [])],
  },
};

export const config: WebdriverIO.Config = {
  ...baseConfig,
  capabilities: isFirefox ? [firefoxCapabilities] : [chromeCapabilities],

  maxInstances: isCI ? 10 : 1,
  logLevel: 'error',
  execArgv: isCI ? [] : ['--inspect'],
  before: async ({ browserName }: WebdriverIO.Capabilities, _specs, browser: WebdriverIO.Browser) => {
    if (browserName === 'firefox') {
      await browser.installAddOn(bundledExtension, true);

      browser.addCommand('getExtensionPath', async () => getFirefoxExtensionPath(browser));
    } else if (browserName === 'chrome') {
      browser.addCommand('getExtensionPath', async () => getChromeExtensionPath(browser));
    }
  },
  afterTest: async () => {
    if (!isCI) {
      await browser.pause(500);
    }
  },
};
