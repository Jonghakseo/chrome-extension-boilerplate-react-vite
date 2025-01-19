import { resolve } from 'node:path';
import { zipBundle } from './lib/index.js';
import { IS_FIREFOX } from '@extension/env';

const YYYY_MM_DD = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const HH_mm_ss = new Date().toISOString().slice(11, 19).replace(/:/g, '');
const fileName = `extension-${YYYY_MM_DD}-${HH_mm_ss}`;

await zipBundle({
  distDirectory: resolve(import.meta.dirname, '..', '..', '..', 'dist'),
  buildDirectory: resolve(import.meta.dirname, '..', '..', '..', 'dist-zip'),
  archiveName: IS_FIREFOX ? `${fileName}.xpi` : `${fileName}.zip`,
});
