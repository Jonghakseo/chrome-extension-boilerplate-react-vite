import { WebSocketServer, WebSocket } from "ws";
import chokidar from "chokidar";
import { clearTimeout } from "timers";

const LOCAL_RELOAD_SOCKET_PORT = 8081;
const UPDATE_REQUEST_MESSAGE = "do_update";
const UPDATE_COMPLETE_MESSAGE = "done_update";

const wss = new WebSocketServer({ port: LOCAL_RELOAD_SOCKET_PORT });

const clientsThatNeedToUpdate: Set<WebSocket> = new Set();

wss.on("connection", (ws) => {
  clientsThatNeedToUpdate.add(ws);

  ws.addEventListener("close", () => clientsThatNeedToUpdate.delete(ws));
  ws.addEventListener("message", (event) => {
    if (event.data === UPDATE_COMPLETE_MESSAGE) {
      ws.close();
    }
  });
});

chokidar.watch("dist").on("all", () => {
  sendUpdateMessageToAllSocketsWithDebounce();
});

function sendUpdateMessage(ws: WebSocket) {
  ws.send(UPDATE_REQUEST_MESSAGE);
}
function sendUpdateMessageToAllSockets() {
  clientsThatNeedToUpdate.forEach(sendUpdateMessage);
}

const sendUpdateMessageToAllSocketsWithDebounce = debounce(
  sendUpdateMessageToAllSockets,
  200
);

function debounce(callback: () => void, delay: number) {
  let timer: NodeJS.Timeout;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(callback, delay);
  };
}
