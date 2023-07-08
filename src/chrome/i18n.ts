import type EnMessage from "public/_locales/en/messages.json";
import type KoMessage from "public/_locales/ko/messages.json";

import refreshOnUpdate from "virtual:reload-on-update-in-view";

type Keys = keyof typeof EnMessage & keyof typeof KoMessage;

typeof window !== "undefined" && refreshOnUpdate("public/_locales");

export function i18n(key: Keys) {
  return chrome.i18n.getMessage(key);
}
