import type { TherapistPageReview } from "@/lib/getTherapistReviews";

import type { Lang } from "@/data/teamMembers";

type TherapistReviewsSectionProps = {
  reviews: TherapistPageReview[];

  lang: Lang;
};

function formatReviewDate(date?: string) {
  if (!date) return "";

  return date.replaceAll("-", ".");
}

function ReviewStars({
  rating,
}: {
  rating?: number;
}) {
  if (typeof rating !== "number")
    return null;

  const safeRating = Math.max(
    1,
    Math.min(5, rating)
  );

  return (
    <div className="flex items-center gap-0.5 text-[13px] text-amber-300">
      {Array.from({
        length: safeRating,
      }).map((_, index) => (
        <span key={index}>★</span>
      ))}
    </div>
  );
}

const TEXT = {
  zh: {
    label: "Guest Reviews",

    title: "客戶體驗與評價",

    intro:
      "以下評價會自動整合全站評價資料與此位師傅個人資料中的顧客回饋。",

    empty:
      "目前尚未有這位師傅的客戶評價。",

    anonymous: "匿名顧客",
  },

  en: {
    label: "Guest Reviews",

    title: "Customer Reviews",

    intro:
      "The reviews below are automatically aggregated from overall site reviews and this therapist’s personal customer feedback.",

    empty:
      "There are currently no customer reviews for this therapist.",

    anonymous: "Anonymous Guest",
  },

  ja: {
    label: "Guest Reviews",

    title: "お客様の体験とレビュー",

    intro:
      "以下のレビューは、サイト全体のレビューとこのセラピスト個人へのお客様の感想を自動的に統合しています。",

    empty:
      "現在、このセラピストへのレビューはまだありません。",

    anonymous: "匿名のお客様",
  },

  ko: {
    label: "Guest Reviews",

    title: "고객 후기 및 리뷰",

    intro:
      "아래 리뷰는 사이트 전체 리뷰와 해당 테라피스트의 고객 후기를 자동으로 통합하여 표시합니다。",

    empty:
      "현재 이 테라피스트에 대한 고객 리뷰가 없습니다。",

    anonymous: "익명 고객",
  },
};

export default function TherapistReviewsSection({
  reviews,
  lang,
}: TherapistReviewsSectionProps) {
  const t = TEXT[lang];

  return (
    <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6 lg:p-8">
      <div className="mb-6">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/35">
          {t.label}
        </p>

        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
          {t.title}
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
          {t.intro}
        </p>
      </div>

      {reviews.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-3xl border border-white/10 bg-black/25 p-5 transition duration-300 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {review.name ??
                      t.anonymous}
                  </p>

                  {review.date && (
                    <p className="mt-1 text-xs text-white/40">
                      {formatReviewDate(
                        review.date
                      )}
                    </p>
                  )}
                </div>

                <ReviewStars
                  rating={review.rating}
                />
              </div>

              <p className="text-sm leading-7 text-white/70">
                {review.content}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
          <p className="text-sm leading-7 text-white/55">
            {t.empty}
          </p>
        </div>
      )}
    </section>
  );
}