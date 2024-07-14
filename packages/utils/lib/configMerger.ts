import { defineConfig, type UserConfig } from 'vite';
import lodash from 'lodash';

//lodash doesn't support ts properly
//eslint-disable-next-line
//@ts-ignore
export const mergeWithBaseViteConfig = (baseConfig: UserConfig, extraConfig: UserConfig) =>
  defineConfig(lodash.merge(baseConfig, extraConfig));
