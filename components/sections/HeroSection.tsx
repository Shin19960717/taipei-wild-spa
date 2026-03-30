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
    <section className="relative overflow-hidden h-[42vh] min-h-[420px] md:h-[58vh] md:min-h-[560px]">
      <div className="absolute inset-0 z-0">
        <HeroCarousel images={HERO_IMAGES} />
      </div>

      <div className="absolute inset-0 z-[1] bg-black/50" />

      <RevealOnScroll
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white"
        y={18}
      >
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
          {t.heroTitle}
        </h1>

        <p className="mb-6 text-sm md:text-base">
          {t.heroSubtitle}
        </p>

        <a
          href="https://line.me/R/ti/p/@834xdutc"
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:scale-105"
        >
          {t.heroButton}
        </a>
      </RevealOnScroll>
    </section>
  );
}