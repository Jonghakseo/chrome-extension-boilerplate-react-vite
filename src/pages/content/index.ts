console.log('content loaded');

/**
 * @description
 * Chrome extensions don't support modules in content scripts.
 * If you want to use other modules in content scripts, you need to import them via these files.
 */
import('@pages/content/ui');
import('@pages/content/injected');
