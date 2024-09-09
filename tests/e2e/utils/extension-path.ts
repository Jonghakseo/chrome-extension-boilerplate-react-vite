/**
 * Returns the Chrome extension path.
 * @param browser
 * @returns path to the Chrome extension
 */
export const getChromeExtensionPath = async (browser: WebdriverIO.Browser) => {
  await browser.url('chrome://extensions/');
  const extensionItem = await $('extensions-item').getElement();
  const extensionId = await extensionItem.getAttribute('id');

  if (!extensionId) {
    throw new Error('Extension ID not found');
  }

  return `chrome-extension://${extensionId}`;
};

/**
 * Returns the Firefox extension path.
 * @param browser
 * @returns path to the Firefox extension
 */
export const getFirefoxExtensionPath = async (browser: WebdriverIO.Browser) => {
  await browser.url('about:debugging#/runtime/this-firefox');
  const uuidElement = await browser.$('//dt[contains(text(), "Internal UUID")]/following-sibling::dd').getElement();
  const internalUUID = await uuidElement.getText();

  if (!internalUUID) {
    throw new Error('Internal UUID not found');
  }

  return `moz-extension://${internalUUID}`;
};
