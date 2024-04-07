import type { WebSocketMessage, SerializedMessage } from './types';

export default class MessageInterpreter {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static send(message: WebSocketMessage): SerializedMessage {
    return JSON.stringify(message);
  }
  static receive(serializedMessage: SerializedMessage): WebSocketMessage {
    return JSON.parse(serializedMessage);
  }
}
