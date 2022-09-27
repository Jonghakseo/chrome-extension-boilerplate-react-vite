import { WebSocketServer, WebSocket } from "ws";
import chokidar from "chokidar";
import { debounce } from "./utils";
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

/** CHECK:: src file was updated **/
chokidar.watch("src").on("all", (event, path) => {
  debounce(sendPendingUpdateMessageToAllSockets, 200)(path);
});

function sendPendingUpdateMessageToAllSockets(path: string) {
  const _sendPendingUpdateMessage = (ws: WebSocket) =>
    sendPendingUpdateMessage(ws, path);

  clientsThatNeedToUpdate.forEach(_sendPendingUpdateMessage);
}

function sendPendingUpdateMessage(ws: WebSocket, path: string) {
  ws.send(Interpreter.Send({ type: UPDATE_PENDING_MESSAGE, path }));
}

/** CHECK:: build was completed **/
chokidar.watch("dist").on("all", () => {
  debounce(sendUpdateMessageToAllSockets, 200)();
});

function sendUpdateMessageToAllSockets() {
  clientsThatNeedToUpdate.forEach(sendUpdateMessage);
}

function sendUpdateMessage(ws: WebSocket) {
  ws.send(Interpreter.Send({ type: UPDATE_REQUEST_MESSAGE }));
}

initReloadServer();
