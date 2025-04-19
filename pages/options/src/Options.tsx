import '@src/Options.css';
import { t } from '@extension/i18n';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import { cn, LoadingSpinner, ToggleButton } from '@extension/ui';

const Options = () => {
  const { isLight } = useStorage(exampleThemeStorage);
  const logo = isLight ? 'options/logo_horizontal.svg' : 'options/logo_horizontal_dark.svg';

  const goGithubSite = () =>
    chrome.tabs.create({ url: 'https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite' });

  return (
    <div className={cn('App', isLight ? 'bg-slate-50 text-gray-900' : 'bg-gray-800 text-gray-100')}>
      <button onClick={goGithubSite}>
        <img src={chrome.runtime.getURL(logo)} className="App-logo" alt="logo" />
      </button>
      <p>
        Edit <code>pages/options/src/Options.tsx</code>
      </p>
      <ToggleButton onClick={exampleThemeStorage.toggle}>{t('toggleTheme')}</ToggleButton>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Options, <LoadingSpinner />), <div> Error Occur </div>);
