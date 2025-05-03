import type { WebSocketMessageType } from '../types.js';

export default {
  send: (message: WebSocketMessageType): string => JSON.stringify(message),
  receive: (serializedMessage: string): WebSocketMessageType => JSON.parse(serializedMessage),
};
