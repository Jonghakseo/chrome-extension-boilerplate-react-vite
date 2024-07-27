import { WebSocket } from 'ws';
import { LOCAL_RELOAD_SOCKET_URL } from './constant';

export function initializeWSS() {
  let ws: WebSocket | null = null;
  if (!ws) {
    ws = new WebSocket(LOCAL_RELOAD_SOCKET_URL);
    ws.onopen = () => {
      console.log(`[HMR] Connected to dev-server at ${LOCAL_RELOAD_SOCKET_URL}`);
    };
    ws.onerror = () => {
      console.error(`[HMR] Failed to start server at ${LOCAL_RELOAD_SOCKET_URL}`);
      console.warn('Retrying in 5 seconds...');
      ws = null;
      setTimeout(() => initializeWSS(), 5_000);
    };
  }
  return ws;
}
