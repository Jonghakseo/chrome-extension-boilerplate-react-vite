import '@src/Options.css';
import { useStorageSuspense, withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import { exampleThemeStorage } from '@chrome-extension-boilerplate/storage';
import { ToggleButton } from '@chrome-extension-boilerplate/buttons';

const Options = () => {
  const theme = useStorageSuspense(exampleThemeStorage);

  return (
    <div
      className="App-container"
      style={{
        backgroundColor: theme === 'light' ? '#eee' : '#222',
      }}>
      <img src={chrome.runtime.getURL('options/logo.svg')} className="App-logo" alt="logo" />
      <span style={{ color: theme === 'light' ? '#0281dc' : undefined, marginBottom: '10px' }}>Options</span>
      Edit <code>pages/options/src/Options.tsx</code> and save to reload.
      <ToggleButton>Toggle theme</ToggleButton>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Options, <div> Loading ... </div>), <div> Error Occur </div>);
