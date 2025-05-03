import type { BUILD_COMPLETE, DO_UPDATE, DONE_UPDATE } from './consts.js';

type UpdateRequestMessageType = {
  type: typeof DO_UPDATE;
  id: string;
};

type UpdateCompleteMessageType = { type: typeof DONE_UPDATE };
type BuildCompletionMessageType = { type: typeof BUILD_COMPLETE; id: string };

export type WebSocketMessageType = UpdateCompleteMessageType | UpdateRequestMessageType | BuildCompletionMessageType;

export type PluginConfigType = {
  onStart?: () => void;
  reload?: boolean;
  refresh?: boolean;
  id?: string;
};
