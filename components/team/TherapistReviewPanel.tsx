"use client";

import type { TherapistPageReview } from "@/lib/getTherapistReviews";
import type { Lang } from "@/data/teamMembers";

type TherapistReviewPanelProps = {
  lang: Lang;
  reviews: TherapistPageReview[];
};

const REVIEW_TEXT = {
  zh: {
    title: "客戶體驗與評價",
    subtitle: "來自顧客的實際體驗回饋",
    empty: "目前尚未有這位師傅的客戶評價。",
  },
  en: {
    title: "Guest Reviews",
    subtitle: "Real feedback from guests",
    empty: "There are no guest reviews for this therapist yet.",
  },
  ja: {
    title: "お客様の体験とレビュー",
    subtitle: "実際のお客様からのフィードバック",
    empty: "このセラピストのレビューはまだありません。",
  },
  ko: {
    title: "고객 후기",
    subtitle: "실제 고객 경험을 바탕으로 한 후기",
    empty: "아직 이 테라피스트에 대한 후기가 없습니다.",
  },
};

function formatDate(date?: string) {
  if (!date) return "";

  return date.replaceAll("-", ".");
}

function ReviewStars({ rating }: { rating?: number }) {
  if (typeof rating !== "number") return null;

  const safeRating = Math.max(1, Math.min(5, rating));

  return (
    <div className="flex items-center gap-0.5 text-[12px] text-amber-300">
      {Array.from({ length: safeRating }).map((_, index) => (
        <span key={index}>★</span>
      ))}
    </div>
  );
}

export default function TherapistReviewPanel({
  lang,
  reviews,
}: TherapistReviewPanelProps) {
  const t = REVIEW_TEXT[lang];

  return (
    <aside className="fixed bottom-4 left-4 right-4 z-[80] max-h-[38vh] overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/55 shadow-2xl shadow-black/40 backdrop-blur-2xl md:bottom-6 md:left-auto md:right-6 md:w-[390px] md:max-h-[72vh]">
      <div className="border-b border-white/10 px-5 py-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/35">
          Reviews
        </p>

        <h2 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-white">
          {t.title}
        </h2>

        <p className="mt-1 text-xs leading-5 text-white/45">{t.subtitle}</p>
      </div>

      <div className="max-h-[calc(38vh-92px)] overflow-y-auto px-4 py-4 md:max-h-[calc(72vh-92px)]">
        {reviews.length > 0 ? (
          <div className="space-y-3">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {review.name ?? "匿名顧客"}
                    </p>

                    {review.date && (
                      <p className="mt-1 text-[11px] text-white/40">
                        {formatDate(review.date)}
                      </p>
                    )}
                  </div>

                  <ReviewStars rating={review.rating} />
                </div>

                <p className="text-sm leading-6 text-white/70">
                  {review.content}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <p className="text-sm leading-6 text-white/55">{t.empty}</p>
          </div>
        )}
      </div>
    </aside>
  );
}