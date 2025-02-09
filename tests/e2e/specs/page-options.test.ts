import { canSwitchTheme } from '../helpers/theme.js';

describe('Webextension Options Page', () => {
  it('should make options page accessible', async () => {
    const extensionPath = await browser.getExtensionPath();
    const optionsUrl = `${extensionPath}/options/index.html`;

    await browser.url(optionsUrl);

    await expect(browser).toHaveTitle('Options');
    await canSwitchTheme();
  });
});
