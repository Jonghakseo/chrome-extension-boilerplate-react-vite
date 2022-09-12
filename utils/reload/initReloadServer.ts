import { WebSocketServer, WebSocket } from "ws";
import chokidar from "chokidar";
import { clearTimeout } from "timers";
import {
  LOCAL_RELOAD_SOCKET_PORT,
  UPDATE_COMPLETE_MESSAGE,
  UPDATE_REQUEST_MESSAGE,
} from "./constant";

const clientsThatNeedToUpdate: Set<WebSocket> = new Set();

function initReloadServer() {
  const wss = new WebSocketServer({ port: LOCAL_RELOAD_SOCKET_PORT });

  wss.on("connection", (ws) => {
    clientsThatNeedToUpdate.add(ws);

    ws.addEventListener("close", () => clientsThatNeedToUpdate.delete(ws));
    ws.addEventListener("message", (event) => {
      if (event.data === UPDATE_COMPLETE_MESSAGE) {
        ws.close();
      }
    });
  });
}

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

initReloadServer();
