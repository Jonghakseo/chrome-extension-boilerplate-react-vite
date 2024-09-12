import { resolve } from 'node:path';
import { zipBundle } from './lib/zip-bundle';

// Pack and save at the root zip-dist folder
zipBundle({
  distDirectory: resolve(__dirname, '../../dist'),
  buildDirectory: resolve(__dirname, '../../dist-zip'),
  archiveName: process.env.CLI_CEB_FIREFOX === 'true' ? 'extension.xpi' : 'extension.zip',
});
