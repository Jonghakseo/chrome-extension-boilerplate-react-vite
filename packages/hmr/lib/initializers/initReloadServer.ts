import type { WebSocket } from 'ws';
import { WebSocketServer } from 'ws';
import {
  BUILD_COMPLETE,
  DO_UPDATE,
  DONE_UPDATE,
  LOCAL_RELOAD_SOCKET_PORT,
  LOCAL_RELOAD_SOCKET_URL,
} from '../consts.js';
import MessageInterpreter from '../interpreter/index.js';

const clientsThatNeedToUpdate: Set<WebSocket> = new Set();

(() => {
  const wss = new WebSocketServer({ port: LOCAL_RELOAD_SOCKET_PORT });

  wss.on('listening', () => {
    console.log(`[HMR] Server listening at ${LOCAL_RELOAD_SOCKET_URL}`);
  });

  wss.on('connection', ws => {
    clientsThatNeedToUpdate.add(ws);

    ws.addEventListener('close', () => {
      clientsThatNeedToUpdate.delete(ws);
    });

    ws.addEventListener('message', event => {
      if (typeof event.data !== 'string') return;

      const message = MessageInterpreter.receive(event.data);

      if (message.type === DONE_UPDATE) {
        ws.close();
      }

      if (message.type === BUILD_COMPLETE) {
        clientsThatNeedToUpdate.forEach((ws: WebSocket) =>
          ws.send(MessageInterpreter.send({ type: DO_UPDATE, id: message.id })),
        );
      }
    });
  });

  wss.on('error', error => {
    console.error(`[HMR] Failed to start server at ${LOCAL_RELOAD_SOCKET_URL}`);
    throw error;
  });
})();
