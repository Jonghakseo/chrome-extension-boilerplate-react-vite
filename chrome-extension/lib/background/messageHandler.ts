import { messaging } from '@extension/messaging';

export function addMessageHandler() {
  messaging.on('foo', async ({ bar }) => `Hello, ${bar}!`);
}
