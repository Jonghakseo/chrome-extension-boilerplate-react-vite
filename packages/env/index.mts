import { baseEnv, dynamicEnvValues } from './lib/index.js';
import type { IEnv } from './lib/types.js';

export * from './lib/const.js';
export * from './lib/index.js';

const env = {
  ...baseEnv,
  ...dynamicEnvValues,
} as IEnv;

export default env;
