import '@src/Newtab.css';
import '@src/Newtab.scss';
import { useStorageSuspense, withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import { exampleThemeStorage } from '@chrome-extension-boilerplate/storage';
import { ComponentPropsWithoutRef } from 'react';

const Newtab = () => {
  const theme = useStorageSuspense(exampleThemeStorage);

  return (
    <div className="App" style={{ backgroundColor: theme === 'light' ? '#eee' : '#222' }}>
      <header className="App-header" style={{ color: theme === 'light' ? '#222' : '#eee' }}>
        <img src={chrome.runtime.getURL('newtab/logo.svg')} className="App-logo" alt="logo" />
        <p>
          Edit <code>pages/newtab/src/Newtab.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: theme === 'light' ? '#0281dc' : undefined, marginBottom: '10px' }}>
          Learn React
        </a>
        <h6>The color of this paragraph is defined using SASS.</h6>
        <ToggleButton>Toggle theme</ToggleButton>
      </header>
    </div>
  );
};

const ToggleButton = (props: ComponentPropsWithoutRef<'button'>) => {
  const theme = useStorageSuspense(exampleThemeStorage);
  return (
    <button
      className={
        props.className +
        ' ' +
        'font-bold mt-4 py-1 px-4 rounded shadow hover:scale-105 ' +
        (theme === 'light' ? 'bg-white text-black' : 'bg-black text-white')
      }
      onClick={exampleThemeStorage.toggle}>
      {props.children}
    </button>
  );
};

export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>);
