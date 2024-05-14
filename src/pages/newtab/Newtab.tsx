import React from 'react';
import '@pages/newtab/Newtab.css';
import '@pages/newtab/Newtab.scss';
// import useStorage from '@src/shared/hooks/useStorage';
// import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

const Newtab = () => {
  // const theme = useStorage(exampleThemeStorage);

  return <div>Hello World!</div>;
};

export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>);
