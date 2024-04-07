import initClient from '../initClient';

function addReload() {
  const reload = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
