"use client";

import Image from "next/image";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function ServiceCard({
  imageSrc,
  imageAlt,
  title,
  times,
  extraTime,
  notes,
  className = "",
  delay = 0,
  y = 22,
}) {
  return (
    <RevealOnScroll
      className={`relative w-full max-w-[520px] min-h-[360px] rounded-2xl overflow-hidden shadow-lg ${className}`}
      delay={delay}
      y={y}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />

<div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 p-6 md:p-8 text-white flex flex-col justify-end min-h-[360px]">
        
        {/* 標題 */}
<h3 className="
  mb-4
  text-2xl md:text-[26px]
  font-light
  tracking-[0.12em]
  text-[rgba(255,252,248,0.96)]
  [text-shadow:
    0_1px_0_rgba(255,255,255,0.35),
    0_0_10px_rgba(255,240,220,0.35),
    0_0_22px_rgba(255,235,210,0.25)
  ]
">
            {title}
        </h3>

        {/* 時間 */}
        <ul className="space-y-2.5 text-[rgba(255,248,240,0.82)] text-base md:text-lg">
          {times.map((time) => (
            <li
              key={time}
              className="font-light tracking-[0.06em] [text-shadow:0_1px_0_rgba(255,255,255,0.12),0_0_6px_rgba(255,245,235,0.10)]"
            >
              {time}
            </li>
          ))}
        </ul>

        {/* 加時 */}
        <p className="mt-5 text-sm font-light tracking-[0.06em] text-[rgba(255,244,235,0.66)] [text-shadow:0_1px_0_rgba(255,255,255,0.10)]">
          {extraTime}
        </p>

        {/* 備註 */}
        <div className="mt-3 space-y-1 leading-6 text-xs text-[rgba(255,242,232,0.56)] [text-shadow:0_1px_0_rgba(255,255,255,0.08)]">
          {notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  );
}