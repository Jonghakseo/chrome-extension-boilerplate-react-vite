// @ts-expect-error Because file doesn't exist before build
import inlineCss from '../../../dist/all/index.css?inline';
import { initAppWithShadow } from '@extension/shared';
import App from '@src/matches/all/App';

initAppWithShadow({ id: 'CEB-extension-all', app: <App />, inlineCss });
