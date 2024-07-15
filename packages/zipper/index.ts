import { resolve } from 'path';

import { zipBundle } from './lib/zip-bundle';

// 打包根目录dist文件
zipBundle({
  distDirectory: resolve(__dirname, '../../dist'),
  buildDirectory: resolve(__dirname, '../../dist-zip'),
  distDirectoryName: 'extension',
});
