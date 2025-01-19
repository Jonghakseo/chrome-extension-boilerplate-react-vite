import { baseEnv, dynamicEnvValues } from './lib';
import type { IEnv } from './lib/types';

export const env = {
  ...baseEnv,
  ...dynamicEnvValues,
} as IEnv;
