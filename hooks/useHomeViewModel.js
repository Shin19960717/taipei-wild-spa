"use client";

import { useMemo } from "react";
import CONTENT from "@/data/content";
import { buildNavItems } from "@/data/navigation";
import { buildServiceCards } from "@/data/services";

export default function useHomeViewModel(lang) {
  const t = useMemo(
    () => ({
      ...CONTENT[lang],
      bookThis: CONTENT.bookThis[lang],
    }),
    [lang]
  );

  const navItems = useMemo(() => buildNavItems(t), [t]);
  const serviceCards = useMemo(() => buildServiceCards(t), [t]);

  return {
    t,
    navItems,
    serviceCards,
  };
}