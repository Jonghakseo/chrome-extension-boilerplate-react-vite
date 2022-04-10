import "chrome";

try {
  chrome.devtools.panels.create("Dev Tools", "icon-34.png", "panel.html");
} catch (e) {
  console.error(e);
}
