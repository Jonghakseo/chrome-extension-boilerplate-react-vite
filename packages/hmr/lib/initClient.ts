import { LOCAL_RELOAD_SOCKET_URL } from './constant';
import MessageInterpreter from './interpreter';

export default function initReloadClient({
  onUpdate,
  onForceReload,
}: {
  onUpdate: () => void;
  onForceReload?: () => void;
}): WebSocket {
  const socket = new WebSocket(LOCAL_RELOAD_SOCKET_URL);

  function sendUpdateCompleteMessage() {
    socket.send(MessageInterpreter.send({ type: 'done_update' }));
  }

  socket.addEventListener('message', event => {
    const message = MessageInterpreter.receive(String(event.data));

    switch (message.type) {
      case 'do_update': {
        sendUpdateCompleteMessage();
        onUpdate();
        return;
      }
      case 'force_reload': {
        onForceReload?.();
        return;
      }
    }
  });

  socket.onclose = () => {
    console.log(
      `Reload server disconnected.\nPlease check if the WebSocket server is running properly on ${LOCAL_RELOAD_SOCKET_URL}. This feature detects changes in the code and helps the browser to reload the extension or refresh the current tab.`,
    );
    setTimeout(() => {
      initReloadClient({ onUpdate });
    }, 1000);
  };

  return socket;
}
