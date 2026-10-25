export const LANGS = ["la", "en", "zh"] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_LABEL: Record<Lang, string> = {
  la: "Latina",
  en: "English",
  zh: "中文",
};

/** HTML lang attribute per language */
export const LANG_ATTR: Record<Lang, string> = { la: "la", en: "en", zh: "zh" };

export interface ChapterText {
  lang: Lang;
  title: string;
  html: string;
}
