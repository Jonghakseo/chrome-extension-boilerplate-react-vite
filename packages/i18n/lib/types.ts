import enMessage from '../locales/en/messages.json' with { type: 'json' };
import type { SUPPORTED_LANGUAGES } from './consts.js';

export type SupportedLanguagesKeysType = keyof typeof SUPPORTED_LANGUAGES;
export type SupportedLanguagesWithoutRegionKeysType = Exclude<SupportedLanguagesKeysType, `${string}_${string}`>;
export type I18nValueType = {
  message: string;
  placeholders?: Record<string, { content?: string; example?: string }>;
};

export type MessageKeyType = keyof typeof enMessage;
export type LocalesJSONType = typeof enMessage;
