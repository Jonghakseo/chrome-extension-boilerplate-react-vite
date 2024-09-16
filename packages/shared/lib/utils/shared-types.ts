import type { ProtocolWithReturn } from 'webext-bridge';

export type ValueOf<T> = T[keyof T];

declare module 'webext-bridge' {
  export type HandshakeRequest = string;
  export type HandshakeResponse = 'Yes' | 'No';
  export interface ProtocolMap {
    Handshake: ProtocolWithReturn<HandshakeRequest, HandshakeResponse>;
  }
}
