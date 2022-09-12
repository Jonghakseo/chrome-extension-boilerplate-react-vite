import {
  LOCAL_RELOAD_SOCKET_URL,
  UPDATE_COMPLETE_MESSAGE,
  UPDATE_REQUEST_MESSAGE,
} from "./constant";

export default function initReloadClient({
  onUpdate,
}: {
  onUpdate: () => void;
}): WebSocket {
  const socket = new WebSocket(LOCAL_RELOAD_SOCKET_URL);

  socket.addEventListener("message", (event) => {
    if (event.data !== UPDATE_REQUEST_MESSAGE) {
      return;
    }
    socket.send(UPDATE_COMPLETE_MESSAGE);
    onUpdate();
  });

  return socket;
}
