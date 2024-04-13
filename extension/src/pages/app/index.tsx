import React from 'react';
import { createRoot } from 'react-dom/client';
import '@pages/app/index.css';
import App from '@pages/app/App';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import { EthereumProvider } from '@root/src/shared/providers/EthereumContext';

refreshOnUpdate('pages/options');

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);
  root.render(
    <EthereumProvider>
      <App />
    </EthereumProvider>,
  );
}

init();
