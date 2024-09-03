import type { SerializedMessage, WebSocketMessage } from '../types';

export default class MessageInterpreter {
  private constructor() {}

  static send(message: WebSocketMessage): SerializedMessage {
    return JSON.stringify(message);
  }

  static receive(serializedMessage: SerializedMessage): WebSocketMessage {
    return JSON.parse(serializedMessage);
  }
}
