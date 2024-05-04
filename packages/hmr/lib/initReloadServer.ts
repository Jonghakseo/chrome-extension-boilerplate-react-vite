#!/usr/bin/env node

import { WebSocket, WebSocketServer } from 'ws';
import { LOCAL_RELOAD_SOCKET_PORT, LOCAL_RELOAD_SOCKET_URL } from './constant';
import MessageInterpreter from './interpreter';

const clientsThatNeedToUpdate: Set<WebSocket> = new Set();

function initReloadServer() {
  try {
    const wss = new WebSocketServer({ port: LOCAL_RELOAD_SOCKET_PORT });

    wss.on('listening', () => console.log(`[HMR] Server listening at ${LOCAL_RELOAD_SOCKET_URL}`));

    wss.on('connection', ws => {
      clientsThatNeedToUpdate.add(ws);

      ws.addEventListener('close', () => clientsThatNeedToUpdate.delete(ws));
      ws.addEventListener('message', event => {
        if (typeof event.data !== 'string') return;

        const message = MessageInterpreter.receive(event.data);

        if (message.type === 'done_update') {
          ws.close();
        }
        if (message.type === 'build_complete') {
          clientsThatNeedToUpdate.forEach((ws: WebSocket) =>
            ws.send(MessageInterpreter.send({ type: 'do_update', id: message.id })),
          );
        }
      });
    });

    ping();
  } catch {
    console.error(`[HMR] Failed to start server at ${LOCAL_RELOAD_SOCKET_URL}`);
    console.error('PLEASE MAKE SURE YOU ARE RUNNING `pnpm dev-server`');
  }
}

initReloadServer();

function ping() {
  clientsThatNeedToUpdate.forEach(ws => ws.send(MessageInterpreter.send({ type: 'ping' })));
  setTimeout(() => {
    ping();
  }, 15_000);
}
