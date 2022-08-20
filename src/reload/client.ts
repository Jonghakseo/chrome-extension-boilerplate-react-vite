let needToReload = false;

export default function reloadOnUpdated() {
  // reload
  function reload() {
    window.location.reload();
    socket.send("remove");
  }

  // reload when document visible
  document.addEventListener("visibilitychange", () => {
    !document.hidden && needToReload && reload();
  });

  // reload server setting
  const socket = new WebSocket("ws://localhost:8081");
  socket.addEventListener("open", () => {
    socket.send("add");
  });
  socket.addEventListener("message", (event) => {
    if (event.data !== "update") {
      return;
    }
    // disable reload when document hidden
    if (document.hidden) {
      needToReload = true;
      return;
    }
    reload();
  });
}
