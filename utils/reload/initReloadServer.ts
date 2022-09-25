import { WebSocketServer, WebSocket } from "ws";
import chokidar from "chokidar";
import { clearTimeout } from "timers";
import {
  LOCAL_RELOAD_SOCKET_PORT,
  UPDATE_COMPLETE_MESSAGE,
  UPDATE_PENDING_MESSAGE,
  UPDATE_REQUEST_MESSAGE,
} from "./constant";
import { Interpreter } from "./interpreter";

const clientsThatNeedToUpdate: Set<WebSocket> = new Set();

function initReloadServer() {
  const wss = new WebSocketServer({ port: LOCAL_RELOAD_SOCKET_PORT });

  wss.on("connection", (ws) => {
    clientsThatNeedToUpdate.add(ws);

    ws.addEventListener("close", () => clientsThatNeedToUpdate.delete(ws));
    ws.addEventListener("message", (event) => {
      const message = Interpreter.Receive(String(event.data));
      if (message.type === UPDATE_COMPLETE_MESSAGE) {
        ws.close();
      }
    });
  });
}

chokidar.watch("src").on("all", (event, path) => {
  sendPendingUpdateMessageToAllSocketsWithDebounce(path);
});

chokidar.watch("dist").on("all", () => {
  sendUpdateMessageToAllSocketsWithDebounce();
});

function sendPendingUpdateMessage(ws: WebSocket, path: string) {
  ws.send(Interpreter.Send({ type: UPDATE_PENDING_MESSAGE, path }));
}

function sendPendingUpdateMessageToAllSockets(path: string) {
  const _sendPendingUpdateMessage = (ws: WebSocket) =>
    sendPendingUpdateMessage(ws, path);
  clientsThatNeedToUpdate.forEach(_sendPendingUpdateMessage);
}

const sendPendingUpdateMessageToAllSocketsWithDebounce = debounce(
  sendPendingUpdateMessageToAllSockets,
  200
);

function sendUpdateMessage(ws: WebSocket) {
  ws.send(Interpreter.Send({ type: UPDATE_REQUEST_MESSAGE }));
}
function sendUpdateMessageToAllSockets() {
  clientsThatNeedToUpdate.forEach(sendUpdateMessage);
}

const sendUpdateMessageToAllSocketsWithDebounce = debounce(
  sendUpdateMessageToAllSockets,
  200
);

function debounce<A extends unknown[]>(
  callback: (...args: A) => void,
  delay: number
) {
  let timer: NodeJS.Timeout;
  return function (...args: A) {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
}

initReloadServer();
