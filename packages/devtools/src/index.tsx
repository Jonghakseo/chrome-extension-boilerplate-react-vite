import '@chrome-extension-boilerplate/hmr-old/build/injections/refresh';

try {
  chrome.devtools.panels.create('Dev Tools', 'icon-34.png', 'devtools-panel/index.html');
} catch (e) {
  console.error(e);
}
