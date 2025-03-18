describe('Content UI Injection', () => {
  it('should locate the injected content UI div on example.com and not find google div', async () => {
    await browser.url('https://www.example.com');

    const contentDiv = await $('#CEB-extension-all').getElement();
    await expect(contentDiv).toBeDisplayed();

    const contentDivOnGoogle = await $('#CEB-extension-google').getElement();
    await expect(contentDivOnGoogle).not.toBeDisplayed();
  });

  it('should locate the injected content UI div on google.com and all div', async () => {
    await browser.url('https://www.google.com');

    const contentDivOnGoogle = await $('#CEB-extension-google').getElement();
    await expect(contentDivOnGoogle).toBeDisplayed();

    const contentDiv = await $('#CEB-extension-all').getElement();
    await expect(contentDiv).toBeDisplayed();
  });
});
