import type { PluginOption } from 'vite';
import { resolve } from 'path';
import { WebSocket } from 'ws';
import MessageInterpreter from '../reload/interpreter';
import { LOCAL_RELOAD_SOCKET_URL } from '../reload/constant';

const rootDir = resolve(__dirname, '..', '..');
const manifestFile = resolve(rootDir, 'manifest.ts');
const viteConfigFile = resolve(rootDir, 'vite.config.ts');

const ws = new WebSocket(LOCAL_RELOAD_SOCKET_URL);

export default function watchRebuild(): PluginOption {
  return {
    name: 'watch-rebuild',
    buildStart() {
      this.addWatchFile(manifestFile);
      this.addWatchFile(viteConfigFile);
    },
    writeBundle() {
      /**
       * When the build is complete, send a message to the reload server.
       * The reload server will send a message to the client to reload or refresh the extension.
       */
      ws.send(MessageInterpreter.send({ type: 'build_complete' }));
    },
  };
}
