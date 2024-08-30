import type { Message } from './type';

type Payload<Type> = Type extends Message['type'] ? (Message & { type: Type })['payload'] : never;
type Response<Type> = Type extends Message['type'] ? (Message & { type: Type })['response'] : never;

const ERROR_SUFFIX = '__Error';

function sendMessageByPort<T extends Message['type']>(type: T, payload?: Payload<T>): Promise<Response<T>> {
  return new Promise((resolve, reject) => {
    const port = chrome.runtime.connect();

    port.onMessage.addListener((message: Message) => {
      if (message.type.endsWith(ERROR_SUFFIX)) {
        reject(message.response);
      } else {
        resolve(message.response as Response<T>);
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

function sendMessage<T extends Message['type']>(type: T, payload?: Payload<T>): Promise<Response<T>> {
  return new Promise((resolve, reject) => {
    try {
      chrome.runtime.sendMessage({ type, payload }, response => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(response as Response<T>);
        }
      });
    } catch (error) {
      console.error('Error in `sendMessage`', error);
    }
  });
}

const sendMessageToCurrentTab = <M extends Message>(type: M['type'], payload?: M['payload']) => {
  chrome.tabs.query({ active: true, currentWindow: true }, pages => {
    const currentTabId = pages.at(0)?.id;
    if (currentTabId) {
      void chrome.tabs.sendMessage(currentTabId, { type, payload });
    }
  });
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
      response({ type: (message.type + ERROR_SUFFIX) as Message['type'], response: error.toString() });
    } else {
      response({ type: (message.type + ERROR_SUFFIX) as Message['type'], response: 'Unknown error' });
    }
  }

  return {
    response,
    handleError,
  };
};

type Handlers = {
  [Type in Message['type']]?: (
    payload: Payload<Type>,
    sender?: chrome.runtime.MessageSender,
  ) => Promise<Response<Type>> | Response<Type>;
};

function addHandlerBySendMessage(handlers: Handlers) {
  chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
    const { response, handleError } = createPortUtils(sendResponse);
    const handler = handlers[message.type];
    if (handler) {
      (async () => {
        try {
          // @ts-expect-error `handler` guaranteed to be defined
          response({ type: message.type, response: await handler(message.payload, sender) });
        } catch (error) {
          handleError(message, error);
        }
      })();
    }
    return true;
  });
}

function addHandlerByPort(handlers: Handlers) {
  chrome.runtime.onConnect.addListener(port => {
    const { response, handleError } = createPortUtils(message => port.postMessage(message));
    port.onMessage.addListener(async (message: Message) => {
      try {
        const handler = handlers[message.type];
        if (handler) {
          // @ts-expect-error `handler` guaranteed to be defined
          response({ type: message.type, response: await handler(message.payload, port.sender) });
        }
      } catch (error) {
        handleError(message, error);
      }
    });
  });
}

function addMessageHandler(handlers: Handlers) {
  addHandlerBySendMessage(handlers);
  addHandlerByPort(handlers);
}

export const messaging = {
  sendMessageByPort,
  sendMessage,
  sendMessageToCurrentTab,
  addHandlerByPort,
  addHandlerBySendMessage,
  addMessageHandler,
};
