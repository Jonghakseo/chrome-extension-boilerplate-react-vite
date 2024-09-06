import path from 'path';
import { build } from './build.mjs';

const i18nPath = path.resolve('lib', 'i18n-prod.ts');

void build(i18nPath);
