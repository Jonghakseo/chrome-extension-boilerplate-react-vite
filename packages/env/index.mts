import { baseEnv, dynamicEnvValues } from './lib/index.js';
import type { EnvType } from './lib/types.js';

export * from './lib/index.js';

export default {
  ...baseEnv,
  ...dynamicEnvValues,
} as EnvType;
