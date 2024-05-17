import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';

reloadOnUpdate('pages/background');

reloadOnUpdate('pages/content/style.scss');

console.log('background loaded');
