import { createRoot } from 'react-dom/client';
import App from '@src/app';
// eslint-disable-next-line
// @ts-ignore
import tailwindcssOutput from '@src/tailwind-output.css?inline';
import { createShadowRootUI } from 'content-ui-inject';

(async () => {
  const app = await createShadowRootUI({
    name: 'react-boilerplate',

    position: 'inline',
    injectAnchor: 'body',
    injectMode: 'before',
    styleOptions: {
      textContent: tailwindcssOutput,
    },
    onMount: uiContainer => {
      createRoot(uiContainer).render(<App />);
    },
  });
  app.mount();
})();
