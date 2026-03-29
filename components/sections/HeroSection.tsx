"use client";

import { HERO_IMAGES } from "@/data/siteConfig";
import HeroCarousel from "@/components/ui/HeroCarousel";
import { LINE_ADD_FRIEND_URL } from "@/lib/line";

type Props = {
  t: Record<string, string>;
};

export default function HeroSection({ t }: Props) {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      <HeroCarousel images={HERO_IMAGES} />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
          {t.heroTitle}
        </h1>
        <p className="mt-5 text-base md:text-xl leading-8 text-white/90">
          {t.heroSubtitle}
        </p>

        <div className="mt-8">
          <a
            href={LINE_ADD_FRIEND_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-black rounded-full text-sm md:text-base font-medium transition hover:scale-105"
          >
            {t.heroButton}
          </a>
        </div>
      </div>
    </section>
  );
}