import initReloadClient from '../initReloadClient';

export default function addHmrIntoScript(watchPath: string) {
  initReloadClient({
    watchPath,
    onUpdate: () => {
      chrome.runtime.reload();
    },
  });
}
