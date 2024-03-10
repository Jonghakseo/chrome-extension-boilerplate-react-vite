import initReloadClient from '../initReloadClient';

function addHmrIntoScript() {
  const reload = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    chrome.runtime.reload();
  };

  initReloadClient({
    onUpdate: reload,
    onForceReload: reload,
  });
}

addHmrIntoScript();
