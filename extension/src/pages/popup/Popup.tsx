import React from 'react';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

const Popup = () => {
  const launchApp = () => {
    const url = chrome.runtime.getURL('src/pages/app/index.html');
    chrome.tabs.create({ url });
  };

  return (
    <div className="p-10">
      <button onClick={launchApp} className="btn btn-primary">
        Launch
      </button>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
