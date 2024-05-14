import chrome from 'webextension-polyfill';

export function sendFormDataToContentScript(formData) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'FILL_FORM', payload: formData });
  });
}
