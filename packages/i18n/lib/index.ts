import { t as t_dev_or_prod } from './i18n.js';
import type { t as t_dev } from './i18n-dev.js';

export const t = t_dev_or_prod as unknown as typeof t_dev;
