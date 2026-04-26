"use client";

import Link from "next/link";
import { REVIEWS } from "@/data/reviews";

export default function ReviewsSection() {
  const previewReviews = REVIEWS.slice(0, 15);

  return (
    <section
      id="reviews"
      className="relative bg-[#efe2cc] px-5 py-20 text-neutral-900 md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">
              Real Reviews
            </p>

            <h2 className="text-3xl font-semibold tracking-[0.08em] text-neutral-800 md:text-5xl">
              客戶真實評價
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-8 text-neutral-600">
              來自顧客的實際體驗回饋，讓第一次預約的客人也能更安心了解
              Taipei Wild Spa 的服務品質、空間氛圍與預約流程。
            </p>
          </div>

          <Link
            href="/reviews?lang=zh"
            className="inline-flex h-12 items-center justify-center rounded-full bg-black px-7 text-sm font-semibold tracking-[0.16em] text-white transition hover:bg-neutral-800"
          >
            查看更多評價
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {previewReviews.map((review) => (
            <article
              key={review.id}
              className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_20px_60px_rgba(80,60,30,0.12)] backdrop-blur"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {review.name}
                  </h3>

                  <p className="mt-1 text-sm text-neutral-500">
                    {review.date}
                  </p>
                </div>

                <div className="whitespace-nowrap text-sm text-yellow-600">
                  {"★".repeat(review.rating)}
                </div>
              </div>

              <p className="mb-5 min-h-[120px] text-base leading-8 text-neutral-700">
                {review.content}
              </p>

              <div className="flex items-center justify-between border-t border-neutral-200 pt-4 text-sm text-neutral-500">
                <span>{review.service}</span>
                <span>{review.therapist}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}