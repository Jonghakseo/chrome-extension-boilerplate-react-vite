import { canSwitchTheme } from '../helpers/theme.js';

describe('Webextension Popup', () => {
  it('should open the popup successfully', async () => {
    const extensionPath = await browser.getExtensionPath();
    const popupUrl = `${extensionPath}/popup/index.html`;
    await browser.url(popupUrl);

    await expect(browser).toHaveTitle('Popup');
    await canSwitchTheme();
  });
});
