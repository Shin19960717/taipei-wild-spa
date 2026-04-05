"use client";

import RevealOnScroll from "@/components/ui/RevealOnScroll";
import HeroCarousel from "@/components/ui/HeroCarousel";
import HERO_IMAGES from "@/data/heroImages";

type HeroSectionProps = {
  t: {
    heroTitle: string;
    heroSubtitle: string;
    heroButton: string;
  };
};

export default function HeroSection({ t }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden h-[31vh] min-h-[280px] md:h-[58vh] md:min-h-[560px]">
      <div className="absolute inset-0 z-0">
        <HeroCarousel images={HERO_IMAGES} />
      </div>

      <div className="absolute inset-0 z-[1] bg-black/50" />

      <RevealOnScroll
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white"
        y={18}
      >
        <h1 className="mb-3 text-3xl font-bold md:mb-4 md:text-6xl">
          {t.heroTitle}
        </h1>

        <p className="mb-4 text-xs leading-relaxed md:mb-6 md:text-base">
          {t.heroSubtitle}
        </p>

        <a
          href="https://line.me/R/ti/p/@834xdutc"
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-105 md:px-6 md:py-3 md:text-base"
        >
          {t.heroButton}
        </a>
      </RevealOnScroll>
    </section>
  );
}