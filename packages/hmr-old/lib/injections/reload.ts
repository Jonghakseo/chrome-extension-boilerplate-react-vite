import initClient from '../initClient';

function addReload() {
  const reload = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    chrome.runtime.reload();
  };

  initClient({
    onUpdate: reload,
    onForceReload: reload,
  });
}

addReload();
