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

  socket.addEventListener("message", (event) => {
    const message = Interpreter.Receive(String(event.data));

    switch (message.type) {
      case UPDATE_REQUEST_MESSAGE: {
        if (needToUpdate) {
          socket.send(Interpreter.Send({ type: UPDATE_COMPLETE_MESSAGE }));
          needToUpdate = false;
          onUpdate();
        }
        return;
      }
      case UPDATE_PENDING_MESSAGE: {
        needToUpdate = message.path.includes(watchPath);
        return;
      }
    }
  });

  return socket;
}
