describe('Webextension Content Runtime Script', () => {
  before(function () {
    // Chrome doesn't allow content scripts on the extension pages
    if ((browser.capabilities as WebdriverIO.Capabilities).browserName === 'chrome') {
      this.skip();
    }
  });

  it('should create all runtime elements on the page', async () => {
    // Open the popup
    const extensionPath = await browser.getExtensionPath();
    const popupUrl = `${extensionPath}/popup/index.html`;
    await browser.url(popupUrl);

    await expect(browser).toHaveTitle('Popup');

    // Trigger inject button on popup
    const contentScriptsButton = await $('button*=Content Scripts').getElement();

    await contentScriptsButton.click();

    // Check if id exists on the page
    const runtimeExampleElement = await $('#CEB-extension-runtime-example').getElement();
    const runtimeAllElement = await $('#CEB-extension-runtime-all').getElement();

    await expect(runtimeExampleElement).toBeExisting();
    await expect(runtimeAllElement).toBeExisting();
  });
});
