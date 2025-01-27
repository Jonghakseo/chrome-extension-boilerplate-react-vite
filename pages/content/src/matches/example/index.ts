const MATCHES_URLS = ['http://*/*', 'https://*/*', '<all_urls>'];

import { toggleTheme } from '@src/toggleTheme';

console.log('example content script loaded');

void toggleTheme();
