import { createRoot } from 'react-dom/client';
import App from '@src/App';
import injectedStyle from '@src/index.css?inline';

export function mount() {
  const root = document.createElement('div');
  root.id = 'chrome-extension-boilerplate-react-vite-runtime-content-view-root';

  document.body.append(root);

  const rootIntoShadow = document.createElement('div');
  rootIntoShadow.id = 'shadow-root';

  const shadowRoot = root.attachShadow({ mode: 'open' });

  if (navigator.userAgent.includes('Firefox')) {
    /**
     * In the firefox environment, adoptedStyleSheets cannot be used due to the bug
     * @url https://bugzilla.mozilla.org/show_bug.cgi?id=1770592
     *
     * Injecting styles into the document, this may cause style conflicts with the host page
     */
    const styleElement = document.createElement('style');
    styleElement.innerHTML = injectedStyle;
    shadowRoot.appendChild(styleElement);
  } else {
    /** Inject styles into shadow dom */
    const globalStyleSheet = new CSSStyleSheet();
    globalStyleSheet.replaceSync(injectedStyle);
    shadowRoot.adoptedStyleSheets = [globalStyleSheet];
  }

  shadowRoot.appendChild(rootIntoShadow);
  createRoot(rootIntoShadow).render(<App />);
}
