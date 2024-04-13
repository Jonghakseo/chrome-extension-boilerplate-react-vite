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

const addSecretsToStorage = async secrets => {
  let keys = [];

  const pushAndStore = async domain => {
    keys.push(domain);
    await util.setSessionStorageItem('allKeys', JSON.stringify(keys));
  };

  for (const secret of secrets) {
    const { domain, value } = secret;
    console.log('Adding secret to storage:', domain, value);

    // Also add the keys to all keys item
    const keysStr = await util.getSessionStorageItem('allKeys');
    if (!keysStr) {
      pushAndStore(domain);
    } else {
      keys = JSON.parse(keysStr as string);
      if (!keys.includes(domain)) {
        pushAndStore(domain);
      }
    }

    await util.setSessionStorageItem(domain, value);
  }
};

const addSecretToStorage = async secret => {
  const { domain, value } = secret;
  console.log('Adding secret to storage:', domain, value);
  await util.setSessionStorageItem(domain, value);
};

const deleteSecretFromStorage = async domain => {
  console.log('Removing secret from storage:', domain);
  await util.deleteSessionStorageItem(domain);
};

const getSecretForDomain = async domain => {
  return (await util.getSessionStorageItem(domain)) || null;
};

const getAllSecrets = async () => {
  const keysStr = await util.getSessionStorageItem('allKeys');
  if (!keysStr) {
    return null;
  }
  const keys = JSON.parse((await util.getSessionStorageItem('allKeys')) as string);
  const secrets = [];
  for (const key of keys) {
    const value = await util.getSessionStorageItem(key);
    secrets.push({ domain: key, value });
  }
  return secrets;
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
  if (request.action == 'getSecretsFromMemory') {
    console.log('Getting all secrets from storage');
    getAllSecrets().then(secrets => {
      let response;
      if (secrets) {
        response = { success: true, secrets: secrets };
      } else {
        response = { success: false, secrets: null };
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
  if (request.action == 'deleteSecretFromStorage') {
    const domain = request.domain;
    deleteSecretFromStorage(domain);
    sendResponse({ success: true });
    return true;
  }
});
