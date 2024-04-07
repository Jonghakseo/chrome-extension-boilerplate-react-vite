type UpdateRequestMessage = {
  type: 'do_update';
  id: string;
};
type UpdateCompleteMessage = { type: 'done_update' };
type BuildCompletionMessage = { type: 'build_complete'; id: string };

export type SerializedMessage = string;

export type WebSocketMessage = UpdateCompleteMessage | UpdateRequestMessage | BuildCompletionMessage;
