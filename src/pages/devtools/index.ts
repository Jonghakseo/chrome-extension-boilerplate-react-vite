import { Request } from 'chrome-remote-interface';

try {
  chrome.devtools.panels.create('Dev Tools', 'icon-34.png', 'rc/pages/panel/index.html');
} catch (e) {
  console.error(e);
}

chrome.devtools.network.onRequestFinished.addListener((request: Request) => {
  const message = {
    url: request.request().url(),
  };
  chrome.runtime.sendMessage(message);
});
