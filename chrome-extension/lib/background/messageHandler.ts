import { messaging } from '@extension/shared';

export function addMessageHandler() {
  messaging.on('foo', async ({ bar }) => `Hello, ${bar}!`);
}
