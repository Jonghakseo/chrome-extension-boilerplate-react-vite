import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';
import * as util from '@root/utils/utils';

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');

console.log('background loaded');

const addSecretsToStorage = secrets => {
  secrets.forEach(async secret => {
    const { domain, value } = secret;
    console.log('Adding secret to storage:', domain, value);
    await util.setSessionStorageItem(domain, value);
  });
};
const addSecretToStorage = async secret => {
  const { domain, value } = secret;
  console.log('Adding secret to storage:', domain, value);
  await util.setSessionStorageItem(domain, value);
};

const getSecretForDomain = async domain => {
  return (await util.getSessionStorageItem(domain)) || null;
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('We received a message!');
  if (request.action == 'getSecret') {
    console.log('Getting secret for domain from storage:', request.domain);
    const domain = request.domain;
    getSecretForDomain(domain).then(secret => {
      let response;
      if (secret) {
        response = { success: true, secret: secret };
      } else {
        response = { success: false, secret: null };
      }
      sendResponse(response);
    });
    return true;
  }
  if (request.action == 'addSecretsToMemory') {
    const secrets = request.secrets;
    addSecretsToStorage(secrets);
    sendResponse({ success: true });
    return true;
  }
  if (request.action == 'addSecretToMemory') {
    const secret = request.secret;
    addSecretToStorage(secret);
    sendResponse({ success: true });
    return true;
  }
});
