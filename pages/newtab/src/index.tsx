import { createRoot } from 'react-dom/client';
import '@src/index.css';
import Newtab from '@src/Newtab';

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);

  root.render(<Newtab />);
}

init();
