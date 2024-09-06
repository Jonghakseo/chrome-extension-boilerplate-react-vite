import 'webextension-polyfill';
import { messaging } from '@extension/messaging';
import { exampleThemeStorage } from '@extension/storage';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

console.log('background loaded');
console.log("Edit 'chrome-extension/src/background/index.ts' and save to reload.");

messaging.on('foo', (payload, sender) => {
  return `background received ${payload} message from ${sender?.url}`;
});
