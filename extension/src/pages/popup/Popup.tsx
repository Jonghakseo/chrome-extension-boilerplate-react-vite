import React from 'react';
import { useEffect } from 'react';

const Popup = () => {
  useEffect(() => {
    const url = chrome.runtime.getURL('src/pages/app/index.html');
    chrome.tabs.create({ url });
  }, []);

  return <></>;
};

export default Popup;
