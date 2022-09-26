import {
  UPDATE_COMPLETE_MESSAGE,
  UPDATE_PENDING_MESSAGE,
  UPDATE_REQUEST_MESSAGE,
} from "./constant";

export const Interpreter = {
  Send: send,
  Receive: receive,
};

function send(message: Messages) {
  return JSON.stringify(message);
}

function receive(message: string): Messages {
  return JSON.parse(message);
}

type UpdatePendingMessage = {
  type: typeof UPDATE_PENDING_MESSAGE;
  path: string;
};

type UpdateRequestMessage = {
  type: typeof UPDATE_REQUEST_MESSAGE;
};

type UpdateCompleteMessage = { type: typeof UPDATE_COMPLETE_MESSAGE };

type Messages =
  | UpdateCompleteMessage
  | UpdateRequestMessage
  | UpdatePendingMessage;
