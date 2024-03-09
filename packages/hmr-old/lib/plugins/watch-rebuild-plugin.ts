import type { PluginOption } from 'vite';
import { WebSocket } from 'ws';
import MessageInterpreter from '../interpreter';
import { LOCAL_RELOAD_SOCKET_URL } from '../constant';

export function watchRebuildPlugin(config: { afterWriteBundle: () => unknown }): PluginOption {
  const ws = new WebSocket(LOCAL_RELOAD_SOCKET_URL);
  return {
    name: 'watch-rebuild',
    writeBundle() {
      /**
       * When the build is complete, send a message to the reload server.
       * The reload server will send a message to the client to reload or refresh the extension.
       */
      ws.send(MessageInterpreter.send({ type: 'build_complete' }));

      sendNextQueue(() => {
        config.afterWriteBundle();
      });
    },
  };
}

function sendNextQueue(callback: () => void) {
  setTimeout(() => {
    callback();
  }, 0);
}
