import initClient from '../initClient';

function addRefresh() {
  let pendingReload = false;

  initClient({
    // eslint-disable-next-line
    // @ts-ignore
    id: __HMR_ID,
    onUpdate: () => {
      // disable reload when tab is hidden
      if (document.hidden) {
        pendingReload = true;
        return;
      }
      reload();
    },
  });

  // reload
  function reload(): void {
    pendingReload = false;
    window.location.reload();
  }

  // reload when tab is visible
  function reloadWhenTabIsVisible(): void {
    !document.hidden && pendingReload && reload();
  }
  document.addEventListener('visibilitychange', reloadWhenTabIsVisible);
}

addRefresh();
