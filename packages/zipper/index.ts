import { resolve } from 'node:path';
import { zipBundle } from './lib/zip-bundle';

const YYYYMMDD = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const HHmmss = new Date().toISOString().slice(11, 19).replace(/:/g, '');
const fileName = `extension-${YYYYMMDD}-${HHmmss}`;

// package the root dist file
zipBundle({
  distDirectory: resolve(__dirname, '../../dist'),
  buildDirectory: resolve(__dirname, '../../dist-zip'),
  archiveName: process.env.__FIREFOX__ ? `${fileName}.xpi` : `${fileName}.zip`,
});
