import '@src/Options.css';
import { useStorageSuspense, withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import { exampleThemeStorage } from '@chrome-extension-boilerplate/storage';
import { Button } from '@chrome-extension-boilerplate/ui';

const Options = () => {
  const theme = useStorageSuspense(exampleThemeStorage);
  return (
    <div
      className="App-container"
      style={{
        backgroundColor: theme === 'light' ? '#eee' : '#222',
      }}>
      <img src={chrome.runtime.getURL('options/logo.svg')} className="App-logo" alt="logo" />
      <span style={{ color: theme === 'light' ? '#0281dc' : '', marginBottom: '10px' }}>Options</span>
      Edit <code className={'bg-rose-50'}>pages/options/src/Options.tsx</code> and save to reload.
      <Button onClick={exampleThemeStorage.toggle} theme={theme}>
        Toggle Theme
      </Button>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Options, <div> Loading ... </div>), <div> Error Occur </div>);
