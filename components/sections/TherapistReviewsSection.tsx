import type { TherapistPageReview } from "@/lib/getTherapistReviews";

type TherapistReviewsSectionProps = {
  reviews: TherapistPageReview[];
};

function formatReviewDate(date?: string) {
  if (!date) return "";

  return date.replaceAll("-", ".");
}

function ReviewStars({ rating }: { rating?: number }) {
  if (typeof rating !== "number") return null;

  const safeRating = Math.max(1, Math.min(5, rating));

  return (
    <div className="flex items-center gap-0.5 text-[13px] text-amber-300">
      {Array.from({ length: safeRating }).map((_, index) => (
        <span key={index}>★</span>
      ))}
    </div>
  );
}

export default function TherapistReviewsSection({
  reviews,
}: TherapistReviewsSectionProps) {
  return (
    <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6 lg:p-8">
      <div className="mb-6">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/35">
          Guest Reviews
        </p>

        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
          客戶體驗與評價
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
          以下評價會自動整合全站評價資料與此位師傅個人資料中的顧客回饋。
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
                    {review.name ?? "匿名顧客"}
                  </p>

                  {review.date && (
                    <p className="mt-1 text-xs text-white/40">
                      {formatReviewDate(review.date)}
                    </p>
                  )}
                </div>

                <ReviewStars rating={review.rating} />
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
            目前尚未有這位師傅的客戶評價。
          </p>
        </div>
      )}
    </section>
  );
}