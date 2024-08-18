import type { BUILD_COMPLETE, DO_UPDATE, DONE_UPDATE } from './constant';

type UpdateRequestMessage = {
  type: typeof DO_UPDATE;
  id: string;
};

type UpdateCompleteMessage = { type: typeof DONE_UPDATE };
type BuildCompletionMessage = { type: typeof BUILD_COMPLETE; id: string };

export type SerializedMessage = string;

export type WebSocketMessage = UpdateCompleteMessage | UpdateRequestMessage | BuildCompletionMessage;

export type PluginConfig = {
  onStart?: () => void;
  reload?: boolean;
  refresh?: boolean;
};
