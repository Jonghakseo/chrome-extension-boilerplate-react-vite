import { resolve } from 'node:path';
import { zipBundle } from './lib/zip-bundle';

// package the root dist file
zipBundle({
  distDirectory: resolve(__dirname, '../../dist'),
  buildDirectory: resolve(__dirname, '../../dist-zip'),
  archiveName: process.env.__FIREFOX__ ? 'extension.xpi' : 'extension.zip',
});
