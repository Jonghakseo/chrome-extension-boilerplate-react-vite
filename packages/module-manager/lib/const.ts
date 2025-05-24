const CHOICE_QUESTION = 'Choose feature to';
export const RECOVER_CHOICE_QUESTION = `${CHOICE_QUESTION} recover`;
export const DELETE_CHOICE_QUESTION = `${CHOICE_QUESTION} delete`;

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
  { name: 'All tests', value: 'tests' },
] as const;

export const DEFAULT_CHOICES_VALUES = DEFAULT_CHOICES.map(item => item.value);

export const HELP_EXAMPLES = [
  ['-d content-ui content-runtime', 'Delete content-ui and content-runtime'],
  ['--de content devtools', 'Delete everything exclude content and devtools'],
  ['-r options side-panel', 'Recover options and side-panel'],
  ['--re popup new-tab', 'Recover everything exclude popup and new-tab'],
] as const;

export const CLI_OPTIONS = [
  { alias: 'd', type: 'array', description: 'Delete specified features' },
  { alias: 'r', type: 'array', description: 'Recover specified features' },
  { alias: 'de', type: 'array', description: 'Delete all features except specified' },
  { alias: 're', type: 'array', description: 'Recover all features except specified' },
] as const;

export const MANAGER_ACTION_PROMPT_CONFIG = {
  message: 'Choose a tool',
  choices: [
    { name: 'Delete Feature', value: 'delete' },
    { name: 'Recover Feature', value: 'recover' },
  ],
} as const;

export const MODULE_CONFIG = {
  content: {
    content_scripts: [
      {
        matches: ['http://*/*', 'https://*/*', '<all_urls>'],
        js: ['content/all.iife.js'],
      },
      {
        matches: ['https://example.com/*'],
        js: ['content/example.iife.js'],
      },
    ],
  },
  'content-ui': {
    content_scripts: [
      {
        matches: ['http://*/*', 'https://*/*', '<all_urls>'],
        js: ['content-ui/all.iife.js'],
      },
      {
        matches: ['https://example.com/*'],
        js: ['content-ui/example.iife.js'],
      },
    ],
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
