import type { Message } from './type';

const ERROR_SUFFIX = '__Error';

/**
 * To receive messages, use `chrome.runtime.onConnect.addListener`.
 *
 * @example
 * ```ts
 * chrome.runtime.onConnect.addListener((port) => {
 *   const { response, handleError } = createPortUtils(port);
 *   port.onMessage.addListener(async (message: Message) => {
 *    try {
 *       switch (message.type) {
 *        case 'Hi': {
 *          response({ type: 'Hi', response: 'Hello' });
 *          break;
 *         }
 *       }
 *    } catch (error) {
 *      handleError(message, error);
 *    }
 *   });
 * });
 * ```
 */
function post<T extends Message['type'], M extends Message & { type: T }>(type: T, payload?: M['payload']) {
  return new Promise<M['response']>((resolve, reject) => {
    const port = chrome.runtime.connect();

    port.onMessage.addListener((message: M) => {
      if (message.type.endsWith(ERROR_SUFFIX)) {
        reject(message.response);
      } else {
        resolve(message.response as M['response']);
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

/**
 * To receive messages, use `chrome.runtime.onMessage.addListener`.
 *
 * @example
 * ```ts
 * chrome.runtime.onMessage.addListener((message: Message) => {
 *   switch (message.type) {
 *   //...
 * });
 * ```
 */
const sendToCurrentTab = <M extends Message>(type: M['type'], payload?: M['payload']) => {
  chrome.tabs.query({ active: true, currentWindow: true }, pages => {
    const currentTabId = pages.at(0)?.id;
    if (currentTabId) {
      void chrome.tabs.sendMessage(currentTabId, { type, payload });
    }
  });
};

const createPortUtils = (port: chrome.runtime.Port) => {
  function response<M extends Message>(message: Omit<M, 'payload'>) {
    try {
      port.postMessage(message);
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

export const message = {
  post,
  sendToCurrentTab,
  createPortUtils,
};
