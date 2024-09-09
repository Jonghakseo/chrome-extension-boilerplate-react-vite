describe('Webextension Content Runtime Script', () => {
  before(function () {
    if ((browser.capabilities as WebdriverIO.Capabilities).browserName === 'chrome') {
      // Chrome doesn't allow content scripts on the extension pages
      this.skip();
    }
  });

  it('should create runtime element on the page', async () => {
    // Open the popup
    const extensionPath = await browser.getExtensionPath();
    const popupUrl = `${extensionPath}/popup/index.html`;
    await browser.url(popupUrl);

    await expect(browser).toHaveTitle('Popup');

    // Trigger the content script on the popup
    // button contains "Content Script" text
    const contentScriptButton = await $('button*=Content Script').getElement();

    await contentScriptButton.click();

    // Check if id chrome-extension-boilerplate-react-vite-runtime-content-view-root exists on page
    const runtimeElement = await $('#chrome-extension-boilerplate-react-vite-runtime-content-view-root').getElement();

    await expect(runtimeElement).toBeExisting();
  });
});
