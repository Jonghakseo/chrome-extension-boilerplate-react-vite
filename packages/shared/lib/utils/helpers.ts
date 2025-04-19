import type { TExcludeValuesFromBaseArray } from './types.js';

export const excludeValuesFromBaseArray = <B extends string[], E extends (string | number)[]>(
  baseArray: B,
  excludeArray: E,
) => baseArray.filter(value => !excludeArray.includes(value)) as TExcludeValuesFromBaseArray<B, E>;
