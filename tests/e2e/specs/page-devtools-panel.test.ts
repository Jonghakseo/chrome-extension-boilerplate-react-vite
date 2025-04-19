import { canSwitchTheme } from '../helpers/theme.js';

describe('Webextension DevTools Panel', () => {
  it('should make DevTools panel available', async () => {
    const extensionPath = await browser.getExtensionPath();
    const devtoolsPanelUrl = `${extensionPath}/devtools-panel/index.html`;

    await browser.url(devtoolsPanelUrl);
    await expect(browser).toHaveTitle('Devtools Panel');
    await canSwitchTheme();
  });
});
