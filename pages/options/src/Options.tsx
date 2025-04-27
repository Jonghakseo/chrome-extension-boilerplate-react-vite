import '@src/Options.css';
import { t } from '@extension/i18n';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { ErrorDisplay, LoadingSpinner, ToggleButton } from '@extension/ui';

const Options = () => {
  const goGithubSite = () =>
    chrome.tabs.create({ url: 'https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite' });

  return (
    <div className="App bg-slate-50 text-gray-900 dark:bg-gray-800 dark:text-gray-100">
      <button onClick={goGithubSite}>
        <img src={chrome.runtime.getURL('options/logo_horizontal.svg')} className="App-logo dark:hidden" alt="logo" />
        <img
          src={chrome.runtime.getURL('options/logo_horizontal_dark.svg')}
          className="App-logo hidden dark:block"
          alt="logo"
        />
      </button>
      <p>
        Edit <code>pages/options/src/Options.tsx</code>
      </p>
      <ToggleButton>{t('toggleTheme')}</ToggleButton>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Options, <LoadingSpinner />), ErrorDisplay);
