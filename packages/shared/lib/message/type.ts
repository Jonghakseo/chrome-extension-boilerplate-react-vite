export type MessageType = keyof Messages extends never ? string : keyof Messages;
// @ts-expect-error This is a placeholder type
export type Message<K extends MessageType = unknown> = PayloadAndResponse & Messages[K] & { type: K };

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export type Payload<Type extends MessageType> = Messages[Type] extends PayloadAndResponse<infer P, unknown> ? P : never;

export type Response<Type extends MessageType> =
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Messages[Type] extends PayloadAndResponse<unknown, infer D> ? D : never;

export interface PayloadAndResponse<P = unknown, D = unknown> {
  payload: P;
  response: D;
}

/**
 * Define the type of messages
 * If you want to add a new message type, you can add it here.
 */
export interface Messages {
  foo: PayloadAndResponse<{ bar: string }, string>;
}
