import type { PluginOption } from 'vite';
import { WebSocket } from 'ws';
import MessageInterpreter from '../interpreter';
import { LOCAL_RELOAD_SOCKET_URL } from '../constant';
import * as fs from 'fs';
import path from 'path';

type PluginConfig = {
  reload?: boolean;
  refresh?: boolean;
};

const injectionsPath = path.resolve(__dirname, '..', '..', '..', 'build', 'injections');

const refreshCode = fs.readFileSync(path.resolve(injectionsPath, 'refresh.js'), 'utf-8');
const reloadCode = fs.readFileSync(path.resolve(injectionsPath, 'reload.js'), 'utf-8');

export function watchRebuildPlugin(config: PluginConfig): PluginOption {
  const { refresh, reload } = config;
  const ws = new WebSocket(LOCAL_RELOAD_SOCKET_URL);
  const hmrCode = (refresh ? refreshCode : '\n') + (reload ? reloadCode : '\n');
  return {
    name: 'watch-rebuild',
    // TODO: send signal when build started and save this module info to send signal when build completed
    writeBundle() {
      /**
       * When the build is complete, send a message to the reload server.
       * The reload server will send a message to the client to reload or refresh the extension.
       */
      ws.send(MessageInterpreter.send({ type: 'build_complete' }));
    },
    generateBundle(_options, bundle) {
      for (const module of Object.values(bundle)) {
        if (module.type === 'chunk') {
          module.code = hmrCode + module.code;
        }
      }
    },
  };
}
