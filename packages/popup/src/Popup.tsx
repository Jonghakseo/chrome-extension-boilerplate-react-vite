import '@src/Popup.css';
import {
  exampleThemeStorage,
  useStorageSuspense,
  withErrorBoundary,
  withSuspense,
} from '@chrome-extension-boilerplate/shared';

const Popup = () => {
  const theme = useStorageSuspense(exampleThemeStorage);

  return (
    <div
      className="App"
      style={{
        backgroundColor: theme === 'light' ? '#eee' : '#222',
      }}>
      <header className="App-header" style={{ color: theme === 'light' ? '#222' : '#eee' }}>
        <img src={chrome.runtime.getURL('newtab/logo.svg')} className="App-logo" alt="logo" />

        <p>
          Edit <code>pages/popup/src/Popup.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: theme === 'light' ? '#0281dc' : undefined, marginBottom: '10px' }}>
          Learn React!
        </a>
        <button
          style={{
            backgroundColor: theme === 'light' ? '#eee' : '#222',
            color: theme === 'light' ? '#222' : '#eee',
          }}
          onClick={exampleThemeStorage.toggle}>
          Toggle theme
        </button>
      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
