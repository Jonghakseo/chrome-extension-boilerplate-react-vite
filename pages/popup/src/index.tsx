import { createRoot } from 'react-dom/client';
import Popup from '@src/Popup';
import '@src/index.css';

const init = () => {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);

  root.render(<Popup />);
};

init();
