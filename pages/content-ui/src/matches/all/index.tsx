import App from '@src/matches/all/App';
import { renderOnShadowRoot } from '@src/renderOnShadowRoot';
// @ts-expect-error Because file doesn't exist before build
import inlineCss from '../../../dist/all/index.css?inline';

renderOnShadowRoot({ id: 'CEB-extension-all', app: <App />, inlineCss });
