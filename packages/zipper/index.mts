import { resolve } from 'node:path';
import { zipBundle } from './lib/index.js';

zipBundle({
  distDirectory: resolve(import.meta.dirname, '..', '..', '..', 'dist'),
  buildDirectory: resolve(import.meta.dirname, '..', '..', '..', 'dist-zip'),
  archiveName: process.env.__FIREFOX__ === 'true' ? 'extension.xpi' : 'extension.zip',
});
