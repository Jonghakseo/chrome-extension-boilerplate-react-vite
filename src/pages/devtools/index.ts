try {
  chrome.devtools.panels.create('Dev Tools', 'icon-34.png', 'rc/pages/panel/index.html');
} catch (e) {
  console.error(e);
}

chrome.runtime.onInstalled.addListener(() => {
  console.log('hello');
});

chrome.runtime.onMessage.addListener(function (request, sender, response) {
  console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension');
  if (request.greeting === 'hello') response({ farewell: 'goodbye' });
});
