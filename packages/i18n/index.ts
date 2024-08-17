// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { t as t_dev_or_prod } from './lib/i18n';
import type { t as t_dev } from './lib/i18n-dev';

export const t = t_dev_or_prod as unknown as typeof t_dev;
