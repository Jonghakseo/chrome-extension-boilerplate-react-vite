import { resolve } from 'node:path';
import { zipBundle } from './lib/zip-bundle/index.js';

// package the root dist file
zipBundle({
  distDirectory: resolve(import.meta.dirname, '..', '..', '..', 'dist'),
  buildDirectory: resolve(import.meta.dirname, '..', '..', '..', 'dist-zip'),
  archiveName: process.env.__FIREFOX__ === 'true' ? 'extension.xpi' : 'extension.zip',
});
