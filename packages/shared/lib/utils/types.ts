import type { COLORS } from './const.js';

export type ColorType = 'success' | 'info' | 'error' | 'warning' | keyof typeof COLORS;

export type * from 'type-fest';
export type ManifestType = chrome.runtime.ManifestV3;
