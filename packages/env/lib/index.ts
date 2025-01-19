import { config } from '@dotenvx/dotenvx';

export const baseEnv =
  config({
    path: `${import.meta.dirname}/../../../../.env`,
  }).parsed ?? {};

export const IS_DEV = baseEnv.CLI_CEB_DEV === 'true';
export const IS_PROD = !IS_DEV;
export const IS_FIREFOX = baseEnv.CLI_CEB_FIREFOX === 'true';
export const IS_CI = baseEnv.CEB_CI === 'true';

export const dynamicEnvValues = {
  CEB_NODE_ENV: IS_DEV ? 'development' : 'production',
} as const;
