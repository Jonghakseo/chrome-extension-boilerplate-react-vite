import 'webextension-polyfill';
import { exampleThemeStorage } from '@extension/storage';
import { onMessage } from 'webext-bridge/background';
import type { HandshakeResponse } from 'webext-bridge';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

console.log('background loaded');
console.log("Edit 'chrome-extension/src/background/index.ts' and save to reload.");

onMessage('Handshake', async (message): Promise<HandshakeResponse> => {
  console.log('Received message', message);
  return 'Yes';
});
