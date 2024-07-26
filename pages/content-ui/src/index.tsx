import { createRoot } from 'react-dom/client';
import App from '@src/app';
// eslint-disable-next-line
// @ts-ignore
import tailwindcssOutput from '@src/tailwind-output.css?inline';

const root = document.createElement('div');
root.id = 'chrome-extension-boilerplate-react-vite-content-view-root';

document.body.append(root);

const rootIntoShadow = document.createElement('div');
rootIntoShadow.id = 'shadow-root';

const shadowRoot = root.attachShadow({ mode: 'open' });

/** Inject styles into shadow dom */
const globalStyleSheet = new CSSStyleSheet();
globalStyleSheet.replaceSync(tailwindcssOutput);
shadowRoot.adoptedStyleSheets = [globalStyleSheet];
/**
 * In the firefox environment, the adoptedStyleSheets bug may prevent style from being applied properly.
 *
 * @url https://bugzilla.mozilla.org/show_bug.cgi?id=1770592
 * @url https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/pull/174
 *
 * Please refer to the links above and try the following code if you encounter the issue.
 *

 * const styleElement = document.createElement('style');
 * styleElement.innerHTML = tailwindcssOutput;
 * shadowRoot.appendChild(styleElement);
 * ```
 */

shadowRoot.appendChild(rootIntoShadow);
createRoot(rootIntoShadow).render(<App />);
