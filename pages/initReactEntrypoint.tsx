import type { ReactElement } from 'react';
import { createRoot } from 'react-dom/client';

export const initReactEntrypoint = (rootComponent: ReactElement) => {
  chrome.storage.local.get('theme').then(({ theme }) => {
    if (!theme) {
      return;
    }

    document.querySelector('html')?.classList.toggle('dark', theme === 'dark');
  });

  chrome.storage.local.onChanged.addListener(({ theme }) => {
    document.querySelector('html')?.classList.toggle('dark', theme.newValue === 'dark');
  });

  const appContainer = document.querySelector('#app-container');

  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }

  const root = createRoot(appContainer);

  root.render(rootComponent);
};
