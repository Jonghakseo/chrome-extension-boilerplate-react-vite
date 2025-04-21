import '@src/NewTab.css';
import '@src/NewTab.scss';
import { ErrorDisplay, LoadingSpinner, ToggleButton } from '@extension/ui';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { t } from '@extension/i18n';

const NewTab = () => {
  const goGithubSite = () =>
    chrome.tabs.create({ url: 'https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite' });

  console.log(t('hello', 'World'));
  return (
    <div className="App bg-slate-50 dark:bg-gray-800">
      <header className="App-header text-gray-900 dark:text-gray-100">
        <button onClick={goGithubSite}>
          <img src={chrome.runtime.getURL('new-tab/logo_horizontal.svg')} className="App-logo dark:hidden" alt="logo" />
          <img
            src={chrome.runtime.getURL('new-tab/logo_horizontal_dark.svg')}
            className="App-logo hidden dark:block"
            alt="logo"
          />
        </button>
        <p>
          Edit <code>pages/new-tab/src/NewTab.tsx</code>
        </p>
        <h6>The color of this paragraph is defined using SASS.</h6>
        <ToggleButton>{t('toggleTheme')}</ToggleButton>
      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(NewTab, <LoadingSpinner />), ErrorDisplay);
