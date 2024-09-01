import { messaging } from '@extension/messaging';

export function addMessageHandler() {
  messaging.on(
    'foo',
    async ({ bar }) =>
      new Promise(resolve => {
        setTimeout(() => resolve(`Hello, ${bar}!`), 1000);
      }),
  );
}
