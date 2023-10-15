import React from 'react';
import { createRoot } from 'react-dom/client';
import Panel from '@pages/panel/Panel';
import '@pages/panel/index.css';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import { attachTwindStyle } from '@src/shared/style/twind';

refreshOnUpdate('pages/panel');

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  attachTwindStyle(appContainer, document);
  const root = createRoot(appContainer);
  root.render(<Panel />);
}

init();
