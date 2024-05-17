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
