/**
 * Returns the Chrome extension path.
 * @param browser
 * @returns path to the Chrome extension
 */
export const getChromeExtensionPath = async (browser: WebdriverIO.Browser) => {
  await browser.url('chrome://extensions/');
  /**
   * https://webdriver.io/docs/extension-testing/web-extensions/#test-popup-modal-in-chrome
   * ```ts
   * const extensionItem = await $('extensions-item').getElement();
   * ```
   * The above code is not working. I guess it's because the shadow root is not accessible.
   * So I used the following code to access the shadow root manually.
   *
   *  @url https://github.com/webdriverio/webdriverio/issues/13521
   *  @url https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/issues/786
   */
  const extensionItem = await (async () => {
    const extensionsManager = await $('extensions-manager').getElement();
    const itemList = await extensionsManager.shadow$('#container > #viewManager > extensions-item-list');
    return itemList.shadow$('extensions-item');
  })();

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
