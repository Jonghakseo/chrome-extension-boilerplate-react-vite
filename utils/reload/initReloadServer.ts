import { WebSocket, WebSocketServer } from 'ws';
import chokidar from 'chokidar';
import { debounce } from './utils';
import {
  LOCAL_RELOAD_SOCKET_PORT,
  LOCAL_RELOAD_SOCKET_URL,
  UPDATE_COMPLETE_MESSAGE,
  UPDATE_PENDING_MESSAGE,
  UPDATE_REQUEST_MESSAGE,
} from './constant';
import MessageInterpreter from './interpreter';

const clientsThatNeedToUpdate: Set<WebSocket> = new Set();

function initReloadServer() {
  const wss = new WebSocketServer({ port: LOCAL_RELOAD_SOCKET_PORT });

  wss.on('listening', () => console.log(`[HRS] Server listening at ${LOCAL_RELOAD_SOCKET_URL}`));

  wss.on('connection', ws => {
    clientsThatNeedToUpdate.add(ws);

    ws.addEventListener('close', () => clientsThatNeedToUpdate.delete(ws));
    ws.addEventListener('message', event => {
      const message = MessageInterpreter.receive(String(event.data));
      if (message.type === UPDATE_COMPLETE_MESSAGE) {
        ws.close();
      }
    });
  });
}

/** CHECK:: src file was updated **/
const debounceSrc = debounce(function (path: string) {
  // Normalize path on Windows
  const pathConverted = path.replace(/\\/g, '/');
  clientsThatNeedToUpdate.forEach((ws: WebSocket) =>
    ws.send(
      MessageInterpreter.send({
        type: UPDATE_PENDING_MESSAGE,
        path: pathConverted,
      }),
    ),
  );
  // Delay waiting for public assets to be copied
}, 400);
chokidar.watch('src').on('all', (event, path) => debounceSrc(path));

/** CHECK:: build was completed **/
const debounceDist = debounce(() => {
  clientsThatNeedToUpdate.forEach((ws: WebSocket) => {
    ws.send(MessageInterpreter.send({ type: UPDATE_REQUEST_MESSAGE }));
  });
}, 100);
chokidar.watch('dist').on('all', event => {
  // Ignore unlink, unlinkDir and change events
  // that happen in beginning of build:watch and
  // that will cause ws.send() if it takes more than 400ms
  // to build (which it might). This fixes:
  // https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/issues/100
  if (event !== 'add' && event !== 'addDir') return;
  debounceDist();
});

initReloadServer();
