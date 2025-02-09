import initClient from '../initializers/initClient';

function addReload() {
  const reload = () => {
    chrome.runtime.reload();
  };

  initClient({
    // @ts-expect-error That's because of the dynamic code loading
    id: __HMR_ID,
    onUpdate: reload,
  });
}

addReload();
