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
      {/* 背景 */}
      <div className="absolute inset-0 z-0">
        <HeroCarousel images={HERO_IMAGES} />
      </div>

      {/* 背景暗層（稍微降低，避免壓掉霧光） */}
      <div className="absolute inset-0 z-[1] bg-black/40" />

      <RevealOnScroll
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        y={18}
      >
        {/* 🔥 HERO 主標（完全同步 TEAM 標題語言） */}
        <h1 className="mb-3 text-3xl md:mb-4 md:text-6xl font-light tracking-[0.12em] text-[rgba(255,248,240,0.88)] [text-shadow:0_1px_0_rgba(255,255,255,0.30),0_0_8px_rgba(255,255,255,0.28),0_0_18px_rgba(255,245,235,0.32)]">
          {t.heroTitle}
        </h1>

        {/* 🔥 副標（同語系，但更淡） */}
        <p className="mb-4 text-xs leading-relaxed md:mb-6 md:text-base tracking-[0.08em] text-[rgba(255,248,240,0.68)] [text-shadow:0_1px_0_rgba(255,255,255,0.20),0_0_6px_rgba(255,255,255,0.18)]">
          {t.heroSubtitle}
        </p>

        {/* 🔥 按鈕（同步暖白系統） */}
        <a
          href="https://line.me/R/ti/p/@834xdutc"
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-[rgba(255,248,240,0.92)] px-6 py-3 text-sm font-medium tracking-[0.06em] text-stone-800 shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.28)]"
        >
          {t.heroButton}
        </a>
      </RevealOnScroll>
    </section>
  );
}