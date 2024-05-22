import '@pages/sidepanel/index.css';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';

refreshOnUpdate('pages/sidepanel');

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
}

init();

chrome.runtime.sendMessage({ greeting: 'Hello' }, function (response) {
  console.log(response.farewell);
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === 'getContent') {
<<<<<<< HEAD
    const content = 'This is the content from the background script';
    sendResponse({ content: content });
=======
      const content = 'This is the content from the background script';
      sendResponse({content: content});
>>>>>>> 83f2b6e2cd255af07db3a0da46aacba85a21849a
  }
  return true;
});
