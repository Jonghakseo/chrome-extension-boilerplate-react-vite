import { LOCAL_RELOAD_SOCKET_URL } from './constant';
import MessageInterpreter from './interpreter';

export default function initReloadClient({ id, onUpdate }: { id: string; onUpdate: () => void }) {
  let ws: WebSocket | null = null;
  try {
    ws = new WebSocket(LOCAL_RELOAD_SOCKET_URL);
    ws.onopen = () => {
      ws?.addEventListener('message', event => {
        const message = MessageInterpreter.receive(String(event.data));
        if (message.type === 'ping') {
          console.log('[HMR] Client OK');
        }
        if (message.type === 'do_update' && message.id === id) {
          sendUpdateCompleteMessage();
          onUpdate();
          return;
        }
      });
    };

    ws.onclose = () => {
      console.log(
        `Reload server disconnected.\nPlease check if the WebSocket server is running properly on ${LOCAL_RELOAD_SOCKET_URL}. This feature detects changes in the code and helps the browser to reload the extension or refresh the current tab.`,
      );
      setTimeout(() => {
        initReloadClient({ onUpdate, id });
      }, 1000);
    };
  } catch (e) {
    setTimeout(() => {
      initReloadClient({ onUpdate, id });
    }, 1000);
  }

  function sendUpdateCompleteMessage() {
    ws?.send(MessageInterpreter.send({ type: 'done_update' }));
  }
}
