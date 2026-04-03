"use client";

import Image from "next/image";
import { RECRUIT_APPLY_TEXT, RECRUIT_DATA } from "@/data/recruit";
import { LINE_ADD_FRIEND_URL } from "@/lib/line";
import type { Lang } from "@/data/teamMembers";

const TAG_CLASS =
  "inline-flex items-center px-4 py-2 rounded-full bg-stone-100 text-stone-800 text-sm md:text-base";

type RecruitSectionProps = {
  lang: Lang;
};

export default function RecruitSection({ lang }: RecruitSectionProps) {
  const title = RECRUIT_DATA.title[lang];
  const desc = RECRUIT_DATA.desc[lang];
  const items = RECRUIT_DATA.items[lang];
  const applyText = RECRUIT_APPLY_TEXT[lang];

  const introText = {
    zh: "想成為 Taipei Wild Spa 的一員嗎？",
    en: "Interested in joining Taipei Wild Spa?",
    ja: "Taipei Wild Spa の一員になりませんか？",
    ko: "Taipei Wild Spa와 함께하고 싶으신가요?",
  };

  return (
    <section className="bg-stone-100 px-6 py-12 md:px-10 md:py-16 scroll-mt-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center md:mb-10">
          <p className="mb-2 text-sm text-stone-500 md:text-base">
            {introText[lang]}
          </p>

          <h2 className="text-3xl font-bold text-stone-800 md:text-4xl">
            {title}
          </h2>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {RECRUIT_DATA.images.map((img, idx) => (
            <div
              key={`recruit-${idx}`}
              className="relative h-72 overflow-hidden rounded-2xl shadow-md md:h-80"
            >
              <Image
                src={img}
                alt={`recruit-${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-lg md:p-10">
          <p className="mb-6 leading-8 text-stone-700">{desc}</p>

          <div className="mb-8 flex flex-wrap gap-3">
            {items.map((item, idx) => (
              <span key={`recruit-item-${idx}`} className={TAG_CLASS}>
                {item}
              </span>
            ))}
          </div>

          <a
            href={LINE_ADD_FRIEND_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm text-white transition hover:scale-105 md:text-base"
          >
            {applyText}
          </a>
        </div>
      </div>
    </section>
  );
}