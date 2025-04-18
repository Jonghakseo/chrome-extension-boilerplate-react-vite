export const DEFAULT_CHOICES = [
  { name: 'Content Script (Execute JS on Web Page)', value: 'content' },
  { name: 'Content Script UI (Render Custom React Component on Web Page)', value: 'content-ui' },
  { name: 'Content Script Runtime (Inject JS on Specific Actions like Popup Click)', value: 'content-runtime' },
  { name: 'Background Script', value: 'background' },
  { name: 'New Tab Override', value: 'new-tab' },
  { name: 'Popup (On Extension Icon Click)', value: 'popup' },
  { name: 'DevTools (Include DevTools Panel)', value: 'devtools' },
  { name: 'Side Panel', value: 'side-panel' },
  { name: 'Options Page', value: 'options' },
] as const;

export const MODULE_CONFIG = {
  content: {
    content_scripts: {
      matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      js: [`content/index.iife.js`],
    },
  },
  'content-ui': {
    content_scripts: {
      matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      js: [`content-ui/index.iife.js`],
    },
  },
  background: {
    background: {
      service_worker: 'background.js',
      type: 'module',
    },
  },
  'new-tab': {
    chrome_url_overrides: {
      newtab: 'new-tab/index.html',
    },
  },
  popup: {
    action: {
      default_popup: 'popup/index.html',
      default_icon: 'icon-34.png',
    },
  },
  devtools: {
    devtools_page: 'devtools/index.html',
  },
  'side-panel': {
    side_panel: {
      default_path: 'side-panel/index.html',
    },
    permissions: ['sidePanel'],
  },
  options: {
    options_page: 'options/index.html',
  },
} as const;

export const EXIT_PROMPT_ERROR = 'ExitPromptError';
