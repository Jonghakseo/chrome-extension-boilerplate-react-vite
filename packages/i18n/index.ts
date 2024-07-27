// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { t as mock } from './lib/i18n';
import { t as t_dev } from 'lib/i18n-dev';

export const t = mock as unknown as typeof t_dev;
