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
