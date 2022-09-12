import initReloadClient from "../initReloadClient";

export default function addHmrIntoScript() {
  initReloadClient({
    onUpdate: () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      chrome.runtime.reload();
    },
  });
}
