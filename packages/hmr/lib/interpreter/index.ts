import type { SerializedMessage, WebSocketMessage } from '../types.js';

export default {
  send: (message: WebSocketMessage): SerializedMessage => JSON.stringify(message),
  receive: (serializedMessage: SerializedMessage): WebSocketMessage => JSON.parse(serializedMessage),
};
