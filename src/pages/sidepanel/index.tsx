import { createRoot } from 'react-dom/client';
import '@pages/sidepanel/index.css';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import SidePanel from '@pages/sidepanel/SidePanel';
import chrome from 'webextension-polyfill';
import { sendFormDataToContentScript } from './contentScript';

refreshOnUpdate('pages/sidepanel');

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);
  root.render(<SidePanel />);
}
chrome.runtime.onMessage.addListener(message => {
  window.alert(`Currently loaded page URL: ${message.url}`);
});

const formData = {};
sendFormDataToContentScript(formData);

init();
