import React from 'react';

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

export default Popup;
