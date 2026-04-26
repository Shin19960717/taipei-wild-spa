"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const VALID_LANGS = ["zh", "en", "ja", "ko"] as const;

type Lang = (typeof VALID_LANGS)[number];

const pageText = {
  zh: {
    title: "台北同志按摩真實評價",
    subtitle: "Real Reviews of Taipei Gay Massage Experience",
    seoTitle: "為什麼選擇 Taipei Wild Spa？",
    viewTherapist: "查看",
    seoParagraph1:
      "Taipei Wild Spa 提供專業的台北同志按摩服務，每位師傅皆經過嚴格篩選，不僅具備良好的體態與穩定的運動習慣，也在服務細節上持續優化，讓每位顧客都能在安心且舒適的環境中放鬆身心。",
    seoParagraph2:
      "我們重視隱私與服務品質，採用獨立空間設計，並透過真實顧客回饋持續調整服務流程，讓 Taipei Wild Spa 成為台北同志按摩中值得信賴的選擇。",
  },
  en: {
    title: "Real Reviews of Taipei Gay Massage",
    subtitle: "Customer Experiences at Taipei Wild Spa",
    seoTitle: "Why Choose Taipei Wild Spa?",
    viewTherapist: "View",
    seoParagraph1:
      "Taipei Wild Spa provides professional gay massage services in Taipei. Each therapist is carefully selected, with attention to physique, lifestyle, service attitude, and overall guest experience.",
    seoParagraph2:
      "We value privacy, comfort, and service quality. Through real customer feedback, we continue refining our service process to create a relaxing and trustworthy massage experience in Taipei.",
  },
  ja: {
    title: "台北ゲイマッサージのリアルな口コミ",
    subtitle: "Taipei Wild Spa のお客様体験",
    seoTitle: "Taipei Wild Spa が選ばれる理由",
    viewTherapist: "見る",
    seoParagraph1:
      "Taipei Wild Spa は、台北でプロフェッショナルなゲイマッサージサービスを提供しています。各セラピストは慎重に選ばれ、体型、生活習慣、接客態度、サービス品質を重視しています。",
    seoParagraph2:
      "私たちはプライバシー、快適さ、サービス品質を大切にしています。実際のお客様の声をもとにサービスを改善し、安心してリラックスできる空間を提供しています。",
  },
  ko: {
    title: "타이베이 게이 마사지 실제 후기",
    subtitle: "Taipei Wild Spa 고객 경험",
    seoTitle: "Taipei Wild Spa를 선택하는 이유",
    viewTherapist: "보기",
    seoParagraph1:
      "Taipei Wild Spa는 타이베이에서 전문적인 게이 마사지 서비스를 제공합니다. 모든 테라피스트는 체형, 생활 습관, 서비스 태도와 고객 경험을 기준으로 신중하게 선별됩니다.",
    seoParagraph2:
      "저희는 프라이버시, 편안함, 서비스 품질을 중요하게 생각합니다. 실제 고객 피드백을 바탕으로 서비스를 지속적으로 개선하며, 안심하고 휴식할 수 있는 공간을 제공합니다.",
  },
};

const reviews = [
  {
    name: "匿名客戶",
    date: "2026-04-20",
    rating: 5,
    therapist: "Ryan",
    content:
      "整體體驗非常放鬆，師傅很專業，節奏掌握很好，環境也很乾淨，會想再回訪。",
  },
  {
    name: "Kevin",
    date: "2026-04-18",
    rating: 5,
    therapist: "Rookie",
    content:
      "第一次體驗同志按摩，比想像中更安心，師傅態度很好，會再來。",
  },
];

function getValidLang(value: string | null): Lang {
  if (value && VALID_LANGS.includes(value as Lang)) {
    return value as Lang;
  }

  return "zh";
}

export default function ReviewsPage() {
  const searchParams = useSearchParams();
  const lang = getValidLang(searchParams.get("lang"));
  const t = pageText[lang];

  return (
    <main className="min-h-screen px-6 py-20 max-w-5xl mx-auto text-white">
      {/* Hero */}
      <h1 className="text-4xl font-bold mb-4">{t.title}</h1>

      <p className="mb-10 text-gray-400">{t.subtitle}</p>

      {/* 評價列表 */}
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div
            key={`${review.name}-${review.date}-${index}`}
            className="border border-white/10 rounded-xl p-6 bg-white/5 backdrop-blur"
          >
            <div className="flex justify-between gap-4 mb-2">
              <span className="font-semibold">{review.name}</span>
              <span className="text-sm text-gray-400 shrink-0">
                {review.date}
              </span>
            </div>

            <div className="mb-2 text-yellow-400" aria-label={`${review.rating} stars`}>
              {"⭐".repeat(review.rating)}
            </div>

            <p className="mb-3 text-gray-300 leading-relaxed">
              {review.content}
            </p>

            <Link
              href={`/team?name=${encodeURIComponent(
                review.therapist
              )}&lang=${lang}`}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              {t.viewTherapist} {review.therapist} →
            </Link>
          </div>
        ))}
      </div>

      {/* SEO 區塊 */}
      <section className="mt-16 text-gray-400 leading-relaxed">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          {t.seoTitle}
        </h2>

        <p className="mb-4">{t.seoParagraph1}</p>

        <p>{t.seoParagraph2}</p>
      </section>
    </main>
  );
}