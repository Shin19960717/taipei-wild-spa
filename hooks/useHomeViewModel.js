"use client";

import { useMemo } from "react";
import CONTENT from "@/data/content";
import { buildNavItems } from "@/data/navigation";
import { buildServiceCards } from "@/data/services";

const SUPPORTED_LANGS = ["zh", "en", "ja", "ko"];

function normalizeLang(lang) {
  if (!lang) return "zh";
  if (SUPPORTED_LANGS.includes(lang)) return lang;
  return "zh";
}

export default function useHomeViewModel(langParam) {
  const lang = normalizeLang(langParam);

  const t = useMemo(() => {
    return {
      ...CONTENT[lang],
      bookThis: CONTENT.bookThis[lang],
    };
  }, [lang]);

  const navItems = useMemo(() => {
    return buildNavItems(t);
  }, [t]);

  const serviceCards = useMemo(() => {
    return buildServiceCards(t);
  }, [t]);

  return {
    lang,
    t,
    navItems,
    serviceCards,
  };
}