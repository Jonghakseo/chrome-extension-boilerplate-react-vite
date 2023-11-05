console.log('content loaded');

/**
 * @description
 * Chrome extensions don't support modules in content scripts.
 */
import('./components/Demo');

/**
 * @description
 * If you want to use other modules in content scripts, you need to import them here.
 */
import('@pages/content/toggleTheme');
