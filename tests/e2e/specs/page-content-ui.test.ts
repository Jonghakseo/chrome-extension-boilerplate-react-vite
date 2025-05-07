describe('Content UI Injection', () => {
  it('should locate the injected content UI (all and example) div on example.com`', async () => {
    await browser.url('https://example.com');

    const contentAllDiv = await $('#CEB-extension-all').getElement();
    await expect(contentAllDiv).toBeDisplayed();

    const contentExampleDiv = await $('#CEB-extension-example').getElement();
    await expect(contentExampleDiv).toBeDisplayed();
  });

  it('should locate the injected content UI all div and not locate example div on google.com', async () => {
    await browser.url('https://www.google.com');

    const contentAllDiv = await $('#CEB-extension-all').getElement();
    await expect(contentAllDiv).toBeDisplayed();

    const contentExampleDiv = await $('#CEB-extension-example').getElement();
    await expect(contentExampleDiv).not.toBeDisplayed();
  });
});
