import App from '@src/matches/google/App';
import { renderOnShadowRoot } from '@src/renderOnShadowRoot';
// @ts-expect-error Because file doesn't exist before build
import inlineCss from '../../../dist/google/index.css?inline';

renderOnShadowRoot({ id: 'CEB-extension-google', app: <App />, inlineCss });
