import {
  LOCAL_RELOAD_SOCKET_URL,
  UPDATE_COMPLETE_MESSAGE,
  UPDATE_PENDING_MESSAGE,
  UPDATE_REQUEST_MESSAGE,
} from "./constant";
import { Interpreter } from "./interpreter";

let needToUpdate = false;

export default function initReloadClient({
  watchPath,
  onUpdate,
}: {
  watchPath: string;
  onUpdate: () => void;
}): WebSocket {
  const socket = new WebSocket(LOCAL_RELOAD_SOCKET_URL);

  function sendUpdateCompleteMessage() {
    socket.send(Interpreter.Send({ type: UPDATE_COMPLETE_MESSAGE }));
  }

  socket.addEventListener("message", (event) => {
    const message = Interpreter.Receive(String(event.data));

    switch (message.type) {
      case UPDATE_REQUEST_MESSAGE: {
        if (needToUpdate) {
          sendUpdateCompleteMessage();
          needToUpdate = false;
          onUpdate();
        }
        return;
      }
      case UPDATE_PENDING_MESSAGE: {
        needToUpdate = checkUpdateIsNeeded({
          watchPath,
          updatedPath: message.path,
        });
        return;
      }
    }
  });

  return socket;
}

function checkUpdateIsNeeded({
  watchPath,
  updatedPath,
}: {
  updatedPath: string;
  watchPath: string;
}): boolean {
  return updatedPath.includes(watchPath);
}
