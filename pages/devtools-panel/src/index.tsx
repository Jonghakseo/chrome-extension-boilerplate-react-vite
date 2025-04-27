import '@src/index.css';
import { exampleThemeStorage } from '@extension/storage/lib';
import Panel from '@src/Panel';
import { createRoot } from 'react-dom/client';
import type { ThemeState } from '@extension/storage/lib/types';

const init = () => {
  const toggleTheme = (theme?: ThemeState['theme']) => {
    if (!theme) {
      return;
    }

    document.querySelector('html')?.classList.toggle('dark', theme === 'dark');
  };

  exampleThemeStorage.get().then(themeState => toggleTheme(themeState.theme));

  chrome.storage.local.onChanged.addListener(changes => {
    toggleTheme(changes['theme-storage-key'].newValue.theme as ThemeState['theme']);
  });

  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);

  root.render(<Panel />);
};

init();
