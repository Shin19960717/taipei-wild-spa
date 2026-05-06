export const VALID_LANGS = ["zh", "en", "ja", "ko"] as const;

export type Lang = (typeof VALID_LANGS)[number];

export function isValidLang(lang: any): lang is Lang {
  return VALID_LANGS.includes(lang);
}

export function getSafeLang(lang: any): Lang {
  return isValidLang(lang) ? lang : "zh";
}