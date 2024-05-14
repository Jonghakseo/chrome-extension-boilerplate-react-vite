import('@pages/content/ui/root');

import chrome from 'webextension-polyfill';

function sendDataToPanel(data) {
  chrome.runtime.sendMessage({ type: 'DATA_FROM_PAGE', payload: data });
}

chrome.runtime.onMessage.addListener(message => {
  if (message.type === 'FILL_FORM') {
    const usernameInput = document.querySelector('#username') as HTMLInputElement;
    if (usernameInput) {
      usernameInput.value = message.payload.username;
    }

    const passwordInput = document.querySelector('#password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.value = message.payload.password;
    }
  }
});

window.onload = () => {
  const pageData = document.body.textContent;
  sendDataToPanel(pageData);
};
