"use client";

import Link from "next/link";
import { REVIEWS } from "@/data/reviews";

type Review = {
  id: string | number;
  name: string;
  date: string;
  content: string;
  therapist: string;
};

type ReviewsSectionProps = {
  t?: {
    reviewsTitle?: string;
    reviewsIntro?: string;
    reviewsButton?: string;
  };
  lang?: string;
  limit?: number;
};

export default function ReviewsSection({
  t,
  lang = "zh",
  limit = 4,
}: ReviewsSectionProps) {
  const safeReviews = Array.isArray(REVIEWS) ? (REVIEWS as Review[]) : [];
  const previewReviews = safeReviews.slice(0, limit);

  const reviewsTitle = t?.reviewsTitle ?? "顧客體驗與評價分享";
  const reviewsIntro =
    t?.reviewsIntro ??
    "來自顧客的實際體驗回饋，讓第一次預約的客人也能更安心了解 Taipei Wild Spa 的服務品質、空間氛圍與預約流程。";
  const reviewsButton = t?.reviewsButton ?? "查看更多評價";

  const reviewsHref = lang && lang !== "zh" ? `/reviews?lang=${lang}` : "/reviews";

  return (
    <section
      id="reviews"
      className="bg-[#eadcc4] px-6 py-20 md:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-black tracking-tight text-neutral-900 md:text-5xl">
              {reviewsTitle}
            </h2>

            <p className="mt-5 text-base leading-8 text-neutral-700 md:text-lg">
              {reviewsIntro}
            </p>
          </div>

          <Link
            href={reviewsHref}
            className="inline-flex w-fit items-center justify-center rounded-full bg-black px-7 py-3 text-sm font-bold tracking-wide text-white shadow-lg transition hover:scale-[1.03] hover:bg-neutral-800"
          >
            {reviewsButton}
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {previewReviews.map((review) => (
            <article
              key={review.id}
              className="rounded-[2rem] bg-white/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur"
            >
              <div>
                <h3 className="text-lg font-bold text-neutral-900">
                  {review.name}
                </h3>

                <p className="mt-1 text-sm text-neutral-500">
                  {review.date}
                </p>
              </div>

              <p className="mt-5 whitespace-pre-line text-base leading-8 text-neutral-700">
                {review.content}
              </p>

              <div className="mt-8 border-t border-neutral-200 pt-4 text-right text-sm text-neutral-500">
                {review.therapist}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}