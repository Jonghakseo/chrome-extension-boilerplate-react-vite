import '@src/Panel.css';
import { t } from '@extension/i18n';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage/lib';
import { cn, ErrorDisplay, LoadingSpinner } from '@extension/ui';
import type { ComponentPropsWithoutRef } from 'react';

const Panel = () => {
  const goGithubSite = () =>
    chrome.tabs.create({ url: 'https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite' });

  return (
    <div className="App bg-slate-50 dark:bg-gray-800">
      <header className="App-header text-gray-900 dark:text-gray-100">
        <button onClick={goGithubSite}>
          <img
            src={chrome.runtime.getURL('devtools-panel/logo_horizontal.svg')}
            className="App-logo dark:hidden"
            alt="logo"
          />
          <img
            src={chrome.runtime.getURL('devtools-panel/logo_horizontal_dark.svg')}
            className="App-logo hidden dark:block"
            alt="logo"
          />
        </button>
        <p>
          Edit <code>pages/devtools-panel/src/Panel.tsx</code>
        </p>
        <ToggleButton>{t('toggleTheme')}</ToggleButton>
      </header>
    </div>
  );
};

const ToggleButton = (props: ComponentPropsWithoutRef<'button'>) => {
  return (
    <button
      className={cn(
        props.className,
        'font-bold mt-4 py-1 px-4 rounded shadow hover:scale-105 ',
        'bg-white text-black dark:bg-black dark:text-white',
      )}
      onClick={exampleThemeStorage.toggle}>
      {props.children}
    </button>
  );
};

export default withErrorBoundary(withSuspense(Panel, <LoadingSpinner />), ErrorDisplay);
