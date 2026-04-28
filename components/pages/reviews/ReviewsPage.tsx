"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  getAllReviews,
  normalizeReviewLang,
  type SupportedLang,
} from "@/data/reviews";

const REVIEW_PAGE_TEXT: Record<
  SupportedLang,
  {
    title: string;
    intro: string;
    languageNotice: string;
    backHome: string;
  }
> = {
  zh: {
    title: "客戶體驗與評價",
    intro:
      "來自真實客人的服務回饋，讓第一次預約的客人也能更安心了解 Taipei Wild Spa 的服務氛圍。",
    languageNotice:
      "評價將依照使用者語言，優先顯示該語言的評論。",
    backHome: "返回首頁",
  },
  en: {
    title: "Guest Experiences & Reviews",
    intro:
      "Real guest feedback helps first-time visitors better understand the service atmosphere at Taipei Wild Spa.",
    languageNotice:
      "Reviews in the user’s selected language will be shown first.",
    backHome: "Back to Home",
  },
  ja: {
    title: "お客様の体験とレビュー",
    intro:
      "実際のお客様からの感想を通して、初めてご予約される方にも Taipei Wild Spa のサービスの雰囲気を安心してご確認いただけます。",
    languageNotice:
      "レビューは、ユーザーが選択した言語のものが優先して表示されます。",
    backHome: "ホームへ戻る",
  },
  ko: {
    title: "고객 경험 및 후기",
    intro:
      "실제 고객 후기를 통해 처음 예약하시는 분들도 Taipei Wild Spa의 서비스 분위기를 더 안심하고 확인하실 수 있습니다.",
    languageNotice:
      "후기는 사용자가 선택한 언어의 후기가 우선 표시됩니다.",
    backHome: "홈으로 돌아가기",
  },
};

export default function ReviewsPage() {
  const searchParams = useSearchParams();
  const lang = normalizeReviewLang(searchParams.get("lang"));

  const pageText = REVIEW_PAGE_TEXT[lang];
  const homeHref = lang === "zh" ? "/" : `/?lang=${lang}`;
  const reviews = getAllReviews(lang);

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-24 text-white">
      <section className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-semibold md:text-5xl">
            {pageText.title}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-neutral-300 md:text-base">
            {pageText.intro}
          </p>

          {/* ✅ 新增這行 */}
          <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-neutral-400 md:text-sm">
            {pageText.languageNotice}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur"
            >
              <div className="mb-4 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-medium text-amber-200">
                    {review.name}
                  </p>

                  <p className="mt-1 text-xs text-neutral-400">
                    {review.therapist} ・ {review.date}
                  </p>
                </div>
              </div>

              <p className="whitespace-pre-line text-sm leading-7 text-neutral-200">
                “{review.content}”
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={homeHref}
            className="inline-flex rounded-full border border-white/15 px-6 py-3 text-sm text-neutral-200 transition hover:bg-white/10"
          >
            {pageText.backHome}
          </Link>
        </div>
      </section>
    </main>
  );
}