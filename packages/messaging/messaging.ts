import type { Messages, PayloadAndResponse } from './type';

type MessageType = keyof Messages extends never ? string : keyof Messages;
// @ts-expect-error This is a placeholder type
type Message<K extends MessageType = unknown> = PayloadAndResponse & Messages[K] & { type: K };

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type Payload<Type extends MessageType> = Messages[Type] extends PayloadAndResponse<infer P, unknown> ? P : never;

export type Response<Type extends MessageType> =
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Messages[Type] extends PayloadAndResponse<unknown, infer D> ? D : never;

const ERROR_SUFFIX = '__Error';

function sendByPort<T extends MessageType>(type: T, payload?: Payload<T>): Promise<Response<T>> {
  return new Promise((resolve, reject) => {
    const port = chrome.runtime.connect();

    port.onMessage.addListener((message: Message<T>) => {
      const type = message.type;
      const response = message.response as Response<T>;
      if (type.endsWith(ERROR_SUFFIX)) {
        reject(response);
      } else {
        resolve(response);
      }
      port.disconnect();
    });

    try {
      port.postMessage({ type, payload });
    } catch (error) {
      console.error('Error in `post`', error);
    }
  });
}

function sendBySendMessage<T extends MessageType>(type: T, payload?: Payload<T>): Promise<Response<T>> {
  return new Promise((resolve, reject) => {
    try {
      chrome.runtime.sendMessage({ type, payload }, ({ type, response }) => {
        if (type.endsWith(ERROR_SUFFIX)) {
          reject(response);
        } else {
          resolve(response as Response<T>);
        }
      });
    } catch (error) {
      console.error('Error in `sendMessage`', error);
    }
  });
}

const sendToCurrentTab = <T extends MessageType>(type: T, payload?: Payload<T>) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, pages => {
      const currentTabId = pages.at(0)?.id;
      if (currentTabId) {
        chrome.tabs.sendMessage(currentTabId, { type, payload }).then(resolve).catch(reject);
      }
    });
  });
};

type SendOptions = {
  /** @default 'port' */
  by?: 'port' | 'sendMessage';
};

const send = <T extends MessageType>(type: T, payload?: Payload<T>, options?: SendOptions): Promise<Response<T>> => {
  const { by = 'port' } = options ?? {};

  if (by === 'sendMessage') {
    return sendBySendMessage<T>(type, payload);
  }
  return sendByPort<T>(type, payload);
};

const createPortUtils = (sendMessage: (message: unknown) => unknown) => {
  function response<M extends Message>(message: Omit<M, 'payload'>) {
    try {
      sendMessage(message);
    } catch (error) {
      console.error('Error in `sendResponse`', error);
    }
  }

  function handleError<M extends Message>(message: M, error: unknown) {
    if (error instanceof Error) {
      response({ type: (message.type + ERROR_SUFFIX) as MessageType, response: error.toString() });
    } else {
      response({ type: (message.type + ERROR_SUFFIX) as MessageType, response: 'Unknown error' });
    }
  }

  return {
    response,
    handleError,
  };
};

function addHandlerByPort<T extends MessageType>(
  type: T,
  handleMessage: (payload: Payload<T>, sender?: chrome.runtime.MessageSender) => Promise<Response<T>> | Response<T>,
) {
  chrome.runtime.onConnect.addListener(port => {
    const { response, handleError } = createPortUtils(message => port.postMessage(message));
    port.onMessage.addListener(async (message: Message) => {
      if (message.type !== type) {
        return;
      }
      try {
        response({ type: message.type, response: await handleMessage(message.payload as Payload<T>, port.sender) });
      } catch (error) {
        handleError(message, error);
      }
    });
  });
}

function addHandlerBySendMessage<T extends MessageType>(
  type: T,
  handleMessage: (payload: Payload<T>, sender?: chrome.runtime.MessageSender) => Promise<Response<T>> | Response<T>,
) {
  chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
    const { response, handleError } = createPortUtils(sendResponse);
    if (message.type !== type) {
      return;
    }
    (async () => {
      try {
        response({ type: message.type, response: await handleMessage(message.payload as Payload<T>, sender) });
      } catch (error) {
        handleError(message, error);
      }
    })();
    return true;
  });
}

type AddMessageHandlerOptions = {
  /** @default 'both' */
  by?: 'port' | 'sendMessage' | 'both';
};

function on<T extends MessageType>(
  type: T,
  handleMessage: (payload: Payload<T>, sender?: chrome.runtime.MessageSender) => Promise<Response<T>> | Response<T>,
  options?: AddMessageHandlerOptions,
) {
  const { by = 'both' } = options ?? {};
  if (by === 'sendMessage' || by === 'both') {
    addHandlerBySendMessage(type, handleMessage);
  }
  if (by === 'port' || by === 'both') {
    addHandlerByPort(type, handleMessage);
  }
}

export const messaging = {
  sendToCurrentTab,
  send,
  sendByPort,
  sendBySendMessage,
  on,
  onByPort: addHandlerByPort,
  onBySendMessage: addHandlerBySendMessage,
};
