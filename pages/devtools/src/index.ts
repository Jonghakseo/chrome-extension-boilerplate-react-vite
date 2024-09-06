try {
  console.log("Edit 'pages/devtools/src/index.mts' and save to reload.");
  chrome.devtools.panels.create('Dev Tools', '/icon-34.png', '/devtools-panel/index.html');
} catch (e) {
  console.error(e);
}
