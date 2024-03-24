import '@src/Options.css';
import {
  exampleThemeStorage,
  useStorageSuspense,
  withErrorBoundary,
  withSuspense,
} from '@chrome-extension-boilerplate/shared';

const Options = () => {
  const theme = useStorageSuspense(exampleThemeStorage);

  return (
    <div
      className="container"
      style={{
        backgroundColor: theme === 'light' ? '#eee' : '#222',
      }}>
      {/*TODO: ADD asset managing module or some other solution */}
      <img src={chrome.runtime.getURL('options/logo.svg')} className="App-logo" alt="logo" />
      <span style={{ color: theme === 'light' ? '#0281dc' : undefined, marginBottom: '10px' }}>Options</span>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Options, <div> Loading ... </div>), <div> Error Occur </div>);
