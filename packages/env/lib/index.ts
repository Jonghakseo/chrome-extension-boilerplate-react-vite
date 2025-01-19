import { config } from '@dotenvx/dotenvx';

export const baseEnv =
  config({
    path: `${import.meta.dirname}/../../../.env`,
  }).parsed ?? {};

export const dynamicEnvValues = { CEB_NODE_ENV: baseEnv.CLI_CEB_DEV ? 'development' : 'production' } as const;
