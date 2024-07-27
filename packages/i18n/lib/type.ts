import type KoMessage from '../locales/ko/messages.json';
import type EnMessage from '../locales/en/messages.json';

type EnsureSameKeys<T, U> = keyof T extends keyof U ? (keyof U extends keyof T ? true : never) : never;

type KeyCheck = EnsureSameKeys<typeof KoMessage, typeof EnMessage>;

export type MessageKey = KeyCheck extends true ? keyof typeof KoMessage : never;
