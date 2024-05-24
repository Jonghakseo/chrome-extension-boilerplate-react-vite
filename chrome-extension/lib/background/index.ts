import 'webextension-polyfill';
import { exampleThemeStorage } from '@chrome-extension-boilerplate/storage';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

console.log('background loaded');
console.log("Edit 'apps/chrome-extension/lib/background/index.ts' and save to reload.");
