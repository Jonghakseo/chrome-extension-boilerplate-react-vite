import '@src/NewTab.css';
import '@src/NewTab.scss';
import { useStorageSuspense, withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import { exampleThemeStorage } from '@chrome-extension-boilerplate/storage';
import { Button } from '@chrome-extension-boilerplate/ui';

const NewTab = () => {
  const theme = useStorageSuspense(exampleThemeStorage);

  return (
    <div className="App" style={{ backgroundColor: theme === 'light' ? '#eee' : '#222' }}>
      <header className="App-header" style={{ color: theme === 'light' ? '#222' : '#eee' }}>
        <img src={chrome.runtime.getURL('new-tab/logo.svg')} className="App-logo" alt="logo" />
        <p>
          Edit <code>pages/new-tab/src/NewTab.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: theme === 'light' ? '#0281dc' : '', marginBottom: '10px' }}>
          Learn React
        </a>
        <h6>The color of this paragraph is defined using SASS.</h6>
        <Button onClick={exampleThemeStorage.toggle} theme={theme}>
          Toggle Theme
        </Button>
      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(NewTab, <div> Loading ... </div>), <div> Error Occur </div>);
