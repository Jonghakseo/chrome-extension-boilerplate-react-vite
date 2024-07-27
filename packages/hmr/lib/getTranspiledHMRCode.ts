import path from 'path';
import { readFileSync } from 'fs';

const injectionsPath = path.resolve(__dirname, '..', '..', 'build', 'injections');

const refreshCode = readFileSync(path.resolve(injectionsPath, 'refresh.js'), 'utf-8');
const reloadCode = readFileSync(path.resolve(injectionsPath, 'reload.js'), 'utf-8');

export function getTranspiledHMRCode({ refresh, reload }: { refresh: boolean; reload: boolean }) {
  return (refresh ? refreshCode : '') + (reload ? reloadCode : '');
}
