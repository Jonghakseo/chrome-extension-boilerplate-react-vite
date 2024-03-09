import React from 'react';
import { createRoot } from 'react-dom/client';
import Newtab from '@src/Newtab';
import '@src/index.css';

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);

  root.render(<Newtab />);
}

init();
