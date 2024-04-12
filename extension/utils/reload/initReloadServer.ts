import { WebSocket, WebSocketServer } from 'ws';
import chokidar from 'chokidar';
import { LOCAL_RELOAD_SOCKET_PORT, LOCAL_RELOAD_SOCKET_URL } from './constant';
import MessageInterpreter from './interpreter';
import { debounce } from './utils';

const clientsThatNeedToUpdate: Set<WebSocket> = new Set();
let needToForceReload = false;

function initReloadServer() {
  const wss = new WebSocketServer({ port: LOCAL_RELOAD_SOCKET_PORT });

  wss.on('listening', () => console.log(`[HRS] Server listening at ${LOCAL_RELOAD_SOCKET_URL}`));

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
        clientsThatNeedToUpdate.forEach((ws: WebSocket) => ws.send(MessageInterpreter.send({ type: 'do_update' })));
        if (needToForceReload) {
          needToForceReload = false;
          clientsThatNeedToUpdate.forEach((ws: WebSocket) =>
            ws.send(MessageInterpreter.send({ type: 'force_reload' })),
          );
        }
      }
    });
  });
}

/** CHECK:: src file was updated **/
const debounceSrc = debounce(function (path: string) {
  // Normalize path on Windows
  const pathConverted = path.replace(/\\/g, '/');
  clientsThatNeedToUpdate.forEach((ws: WebSocket) =>
    ws.send(MessageInterpreter.send({ type: 'wait_update', path: pathConverted })),
  );
}, 100);
chokidar.watch('src', { ignorePermissionErrors: true }).on('all', (_, path) => debounceSrc(path));

/** CHECK:: manifest.js was updated **/
chokidar.watch('manifest.js', { ignorePermissionErrors: true }).on('all', () => {
  needToForceReload = true;
});

initReloadServer();
