const LOCAL_RELOAD_SOCKET_URL = "ws://localhost:8081";
const UPDATE_REQUEST_MESSAGE = "do_update";
const UPDATE_COMPLETE_MESSAGE = "done_update";

function initSocket({ onUpdate }: { onUpdate: () => void }): WebSocket {
  const socket = new WebSocket(LOCAL_RELOAD_SOCKET_URL);

  socket.addEventListener("message", (event) => {
    if (event.data !== UPDATE_REQUEST_MESSAGE) {
      return;
    }
    onUpdate();
  });

  return socket;
}

export default function reloadOnUpdated() {
  let pendingReload = false;

  const socket = initSocket({
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
    socket.send(UPDATE_COMPLETE_MESSAGE);
    window.location.reload();
  }

  // reload when tab is visible
  function reloadWhenTabIsVisible(): void {
    !document.hidden && pendingReload && reload();
  }
  document.addEventListener("visibilitychange", reloadWhenTabIsVisible);
}
