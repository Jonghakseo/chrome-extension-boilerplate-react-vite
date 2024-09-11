import { canSwitchTheme } from '../helpers/theme.js';

describe('Webextension New Tab', () => {
  it('should open the extension page when a new tab is opened', async () => {
    const extensionPath = await browser.getExtensionPath();
    const newTabUrl =
      process.env.CLI_CEB_FIREFOX === 'true' ? `${extensionPath}/new-tab/index.html` : 'chrome://newtab';

    await browser.url(newTabUrl);

    const appDiv = await $('.App').getElement();
    await expect(appDiv).toBeExisting();
    await canSwitchTheme();
  });
});
