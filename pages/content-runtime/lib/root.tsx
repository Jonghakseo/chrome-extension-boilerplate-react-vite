import { createRoot } from 'react-dom/client';
import App from '@lib/app';
// eslint-disable-next-line
// @ts-ignore
import injectedStyle from '@lib/index.css?inline';

const root = document.createElement('div');
root.id = 'chrome-extension-boilerplate-react-vite-runtime-content-view-root';

document.body.append(root);

const rootIntoShadow = document.createElement('div');
rootIntoShadow.id = 'shadow-root';

const shadowRoot = root.attachShadow({ mode: 'open' });

/** Inject styles into shadow dom */
const globalStyleSheet = new CSSStyleSheet();
globalStyleSheet.replaceSync(injectedStyle);
shadowRoot.adoptedStyleSheets = [globalStyleSheet];

/**
 * In the firefox environment, the adoptedStyleSheets bug may prevent style from being applied properly.
 *
 * @url https://bugzilla.mozilla.org/show_bug.cgi?id=1770592
 * @url https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/pull/174
 *
 * Please refer to the links above and try the following code if you encounter the issue.
 *
 * ```ts
 * const styleElement = document.createElement('style');
 * styleElement.innerHTML = injectedStyle;
 * shadowRoot.appendChild(styleElement);
 * ```
 */
shadowRoot.appendChild(rootIntoShadow);
createRoot(rootIntoShadow).render(<App />);
