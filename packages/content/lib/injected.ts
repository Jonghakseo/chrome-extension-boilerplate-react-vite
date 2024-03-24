import '@chrome-extension-boilerplate/hmr-old/build/injections/refresh';
import { toggleTheme } from '@lib/toggleTheme';

console.log('content script loaded');

void toggleTheme();
