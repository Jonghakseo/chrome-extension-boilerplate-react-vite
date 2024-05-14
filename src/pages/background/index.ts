import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import chrome from 'webextension-polyfill';

reloadOnUpdate('pages/background');
reloadOnUpdate('pages/content/style.scss');
console.log('background loaded');
chrome.runtime.onMessage.addListener(message => {
  if (message.type === 'DATA_FROM_PAGE') {
    console.log('Received data from content script:', message.payload);
  }
});
