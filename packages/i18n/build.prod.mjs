import path from 'node:path';
import { build } from './build.mjs';

const i18nPath = path.resolve('lib', 'i18n-prod.ts');

void build(i18nPath);
