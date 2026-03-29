export type Lang = "zh" | "en" | "ja" | "ko";

export type LangOption = {
  key: Lang;
  label: string;
};

export type LocalizedString = Record<Lang, string>;
export type LocalizedStringArray = Record<Lang, string[]>;