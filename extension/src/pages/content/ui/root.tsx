import { createRoot } from 'react-dom/client';
import App from '@pages/content/ui/app';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import injectedStyle from './injected.css?inline';
import { EthereumProvider } from '@src/shared/providers/EthereumContext';

refreshOnUpdate('pages/content');

const root = document.createElement('div');
root.id = 'blocklock-content-view-root';

document.body.append(root);

const rootIntoShadow = document.createElement('div');
rootIntoShadow.id = 'shadow-root';

const shadowRoot = root.attachShadow({ mode: 'open' });
shadowRoot.appendChild(rootIntoShadow);

/** Inject styles into shadow dom */
const styleElement = document.createElement('style');
styleElement.innerHTML = injectedStyle;
shadowRoot.appendChild(styleElement);

const linkElement = document.createElement('link');
linkElement.href = 'https://kit.fontawesome.com/cd3d201a06.css';
linkElement.rel = 'stylesheet';
linkElement.crossOrigin = 'anonymous';

shadowRoot.appendChild(linkElement);

/**
 * https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/pull/174
 *
 * In the firefox environment, the adoptedStyleSheets bug may prevent contentStyle from being applied properly.
 * Please refer to the PR link above and go back to the contentStyle.css implementation, or raise a PR if you have a better way to improve it.
 */

createRoot(rootIntoShadow).render(
  <EthereumProvider>
    <App />
  </EthereumProvider>,
);
