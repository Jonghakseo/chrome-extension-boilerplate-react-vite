import type { SUPPORTED_LANGUAGES } from './consts.js';
import type enMessage from '../locales/en/messages.json';

export type SupportedLanguagesKeysType = keyof typeof SUPPORTED_LANGUAGES;
export type SupportedLanguagesWithoutRegionKeysType = Exclude<SupportedLanguagesKeysType, `${string}_${string}`>;
export type I18nValueType = {
  message: string;
  placeholders?: Record<string, { content?: string; example?: string }>;
};

export type MessageKey = keyof typeof enMessage;
export type LocalesJSONType = typeof enMessage;
