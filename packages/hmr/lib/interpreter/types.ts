export const DO_UPDATE = 'do_update';
export const DONE_UPDATE = 'done_update';
export const BUILD_COMPLETE = 'build_complete';
export const ERROR = 'error';

type UpdateRequestMessage = {
  type: typeof DO_UPDATE;
  id: string;
};

type UpdateCompleteMessage = { type: typeof DONE_UPDATE };
type ErrorMessage = { type: typeof ERROR };
type BuildCompletionMessage = { type: typeof BUILD_COMPLETE; id: string };

export type SerializedMessage = string;

export type WebSocketMessage = UpdateCompleteMessage | UpdateRequestMessage | BuildCompletionMessage | ErrorMessage;
