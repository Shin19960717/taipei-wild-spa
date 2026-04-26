"use client";

import Link from "next/link";
import { REVIEWS } from "@/data/reviews";

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-24 text-white">
      <section className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm tracking-[0.3em] text-amber-300">
            CUSTOMER REVIEWS
          </p>

          <h1 className="text-3xl font-semibold md:text-5xl">
            客戶體驗與評價
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-neutral-300 md:text-base">
            來自真實客人的服務回饋，讓第一次預約的客人也能更安心了解 Taipei Wild Spa 的服務氛圍。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((review) => (
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

              <p className="text-sm leading-7 text-neutral-200">
                “{review.content}”
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex rounded-full border border-white/15 px-6 py-3 text-sm text-neutral-200 transition hover:bg-white/10"
          >
            返回首頁
          </Link>
        </div>
      </section>
    </main>
  );
}