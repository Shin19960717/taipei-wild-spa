// app/[lang]/layout.js

import { notFound } from "next/navigation";

const VALID_LANGS = ["zh", "en", "ja", "ko"];

const LANG_MAP = {
  zh: "zh-Hant",
  en: "en",
  ja: "ja",
  ko: "ko",
};

const SEO = {
  zh: {
    title: "台北同志按摩｜Taipei Wild Spa｜隱私舒適放鬆空間",
    description:
      "台北同志按摩推薦 Taipei Wild Spa，提供隱私獨立空間與專業按摩師，打造安心放鬆體驗。",
  },

  en: {
    title: "Taipei Gay Massage | Taipei Wild Spa",
    description:
      "Private gay massage in Taipei. Relaxing environment, professional therapists, and premium experience.",
  },

  ja: {
    title: "台北ゲイマッサージ｜Taipei Wild Spa",
    description:
      "台北でプライベート空間のゲイマッサージ。安心してリラックスできる環境。",
  },

  ko: {
    title: "타이베이 게이 마사지 | Taipei Wild Spa",
    description:
      "프라이빗한 공간에서 즐기는 타이베이 게이 마사지. 편안한 힐링 경험.",
  },
};

export function generateStaticParams() {
  return VALID_LANGS.map((lang) => ({
    lang,
  }));
}

export async function generateMetadata({
  params,
}) {
  const { lang } = await params;

  const seo = SEO[lang] || SEO.zh;

  return {
    title: seo.title,

    description: seo.description,

    alternates: {
      canonical: `https://taipeiwildspa.com/${lang}`,

      languages: {
        "zh-Hant":
          "https://taipeiwildspa.com/zh",

        en: "https://taipeiwildspa.com/en",

        ja: "https://taipeiwildspa.com/ja",

        ko: "https://taipeiwildspa.com/ko",
      },
    },

    openGraph: {
      title: seo.title,

      description: seo.description,

      url: `https://taipeiwildspa.com/${lang}`,

      siteName: "Taipei Wild Spa",

      locale:
        LANG_MAP[lang] || "zh-Hant",

      type: "website",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}) {
  const { lang } = await params;

  if (!VALID_LANGS.includes(lang)) {
    notFound();
  }

  return <>{children}</>;
}