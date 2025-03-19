import { createRoot } from 'react-dom/client';
import Panel from '@src/Panel';
import '@src/index.css';

const init = () => {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);

  root.render(<Panel />);
};

init();
