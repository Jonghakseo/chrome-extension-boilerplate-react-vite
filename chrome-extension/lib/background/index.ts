import 'webextension-polyfill';
import { exampleThemeStorage } from '@extension/storage';
import { addMessageHandler } from '@lib/background/messageHandler';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

console.log('background loaded');
console.log("Edit 'chrome-extension/lib/background/index.ts' and save to reload.");

addMessageHandler();
