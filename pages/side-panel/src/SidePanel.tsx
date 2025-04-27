import '@src/SidePanel.css';
import { t } from '@extension/i18n';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import { ErrorDisplay, LoadingSpinner, ToggleButton } from '@extension/ui';

const SidePanel = () => {
  const goGithubSite = () =>
    chrome.tabs.create({ url: 'https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite' });

  return (
    <div className="App bg-slate-50 dark:bg-gray-800">
      <header className="App-header text-gray-900 dark:text-gray-100">
        <button onClick={goGithubSite}>
          <img
            src={chrome.runtime.getURL('side-panel/logo_vertical.svg')}
            className="App-logo dark:hidden"
            alt="logo"
          />
          <img
            src={chrome.runtime.getURL('side-panel/logo_vertical_dark.svg')}
            className="App-logo hidden dark:block"
            alt="logo"
          />
        </button>
        <p>
          Edit <code>pages/side-panel/src/SidePanel.tsx</code>
        </p>
        <ToggleButton onClick={exampleThemeStorage.toggle}>{t('toggleTheme')}</ToggleButton>
      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <LoadingSpinner />), ErrorDisplay);
