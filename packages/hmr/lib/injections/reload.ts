import initClient from '../initClient';

function addReload() {
  const reload = () => {
    chrome.runtime.reload();
  };

  initClient({
    // eslint-disable-next-line
    // @ts-ignore
    id: __HMR_ID,
    onUpdate: reload,
  });
}

addReload();
