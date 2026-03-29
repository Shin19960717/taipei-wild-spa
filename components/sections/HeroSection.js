"use client";

import RevealOnScroll from "@/components/ui/RevealOnScroll";
import HeroCarousel from "@/components/ui/HeroCarousel";
import HERO_IMAGES from "@/data/heroImages";
import { LINE_ADD_FRIEND_URL } from "@/lib/line";

export default function HeroSection({ t }) {
  return (
    <section className="relative h-[42vh] md:h-[58vh] overflow-hidden">
      <HeroCarousel images={HERO_IMAGES} />
      <div className="absolute inset-0 bg-black/50" />

      <RevealOnScroll
        className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6"
        y={18}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{t.heroTitle}</h1>
        <p className="mb-6 text-sm md:text-base">{t.heroSubtitle}</p>
        <a
          href={LINE_ADD_FRIEND_URL}
          target="_blank"
          rel="noreferrer"
          className="bg-white text-black px-6 py-3 rounded-full font-semibold transition hover:scale-105"
        >
          {t.heroButton}
        </a>
      </RevealOnScroll>
    </section>
  );
}