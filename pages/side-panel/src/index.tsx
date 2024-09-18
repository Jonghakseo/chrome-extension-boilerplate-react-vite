import { createRoot } from 'react-dom/client';
import '../dist/global-out.css';
import SidePanel from '@src/SidePanel';

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);
  root.render(<SidePanel />);
}

init();
