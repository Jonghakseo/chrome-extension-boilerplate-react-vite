try {
  console.log("content loaded");
  injectContentViewScript();
} catch (e) {
  console.error(e);
}

/**
 * @description
 * Chrome extensions don't support modules in content scripts.
 * Bundling solves this problem, but not in the case of React, which is imported as JSX automatic conversion.
 * So, I created a tag that brings the 'content view' from the 'content script', and implemented it by bypassing the tag in the form of inserting it into the html.
 * If there is a better implementation (bundling option or other method, etc.), please suggest it.
 */
function injectContentViewScript() {
  const script = createContentViewScript();
  const target = getTargetElement();

  target.insertBefore(script, target.lastChild);
}

function createContentViewScript(): HTMLScriptElement {
  const script = document.createElement("script");
  script.setAttribute("type", "module");
  script.setAttribute(
    "src",
    chrome.runtime.getURL("src/pages/contentView/index.js")
  );
  return script;
}

function getTargetElement(): HTMLElement {
  return (
    document.head ||
    document.getElementsByTagName("head")[0] ||
    document.documentElement
  );
}
