"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { RECRUIT_APPLY_TEXT, RECRUIT_DATA } from "@/data/recruit";
import { LINE_ADD_FRIEND_URL } from "@/lib/line";

const LANG_OPTIONS = [
  { key: "zh", label: "中文" },
  { key: "en", label: "EN" },
  { key: "ja", label: "日本語" },
  { key: "ko", label: "한국어" },
];

const TAG_CLASS =
  "inline-flex items-center px-4 py-2 rounded-full bg-stone-100 text-stone-800 text-sm md:text-base";

export default function RecruitPage() {
  const [lang, setLang] = useState("zh");

  const title = useMemo(() => RECRUIT_DATA.title[lang], [lang]);
  const desc = useMemo(() => RECRUIT_DATA.desc[lang], [lang]);
  const items = useMemo(() => RECRUIT_DATA.items[lang], [lang]);
  const applyText = useMemo(() => RECRUIT_APPLY_TEXT[lang], [lang]);

  return (
    <main className="min-h-screen bg-stone-100 text-stone-800">
      <section className="max-w-6xl mx-auto px-6 py-10 md:px-10 md:py-14">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-stone-500 mb-2">Taipei Wild Spa</p>
            <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
          </div>

          <div className="flex flex-wrap gap-2">
            {LANG_OPTIONS.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setLang(option.key)}
                className={`px-3 py-1 text-sm rounded-full border transition ${
                  lang === option.key
                    ? "bg-black text-white shadow-md"
                    : "bg-white text-black hover:bg-stone-100"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 rounded-full border border-stone-300 bg-white text-sm transition hover:bg-stone-50"
          >
            ← 返回首頁
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {RECRUIT_DATA.images.map((img, idx) => (
            <div
              key={`recruit-${idx}`}
              className="relative h-72 md:h-80 rounded-2xl overflow-hidden shadow-md"
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

        <div className="bg-white rounded-3xl shadow-lg border border-stone-200 p-6 md:p-10">
          <p className="text-stone-700 leading-8 mb-6">{desc}</p>

          <div className="flex flex-wrap gap-3 mb-8">
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
            className="inline-flex items-center justify-center px-5 py-3 bg-black text-white rounded-xl text-sm md:text-base transition hover:scale-105"
          >
            {applyText}
          </a>
        </div>
      </section>
    </main>
  );
}