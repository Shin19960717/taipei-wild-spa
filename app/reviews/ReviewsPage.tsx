"use client";

import Link from "next/link";

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
export default function ReviewsPage() {
  return (
    <main className="min-h-screen px-6 py-20 max-w-5xl mx-auto text-white">
      {/* Hero */}
      <h1 className="text-4xl font-bold mb-4">
        台北同志按摩真實評價
      </h1>
      <p className="mb-10 text-gray-400">
        Real Reviews of Taipei Gay Massage Experience
      </p>

      {/* 評價列表 */}
      <div className="space-y-6">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="border border-white/10 rounded-xl p-6 bg-white/5 backdrop-blur"
          >
            <div className="flex justify-between mb-2">
              <span className="font-semibold">{r.name}</span>
              <span className="text-sm text-gray-400">{r.date}</span>
            </div>

            <div className="mb-2 text-yellow-400">
              {"⭐".repeat(r.rating)}
            </div>

            <p className="mb-3 text-gray-300">{r.content}</p>

            <Link
              href={`/team?name=${r.therapist}`}
              className="text-sm text-blue-400"
            >
              查看 {r.therapist} →
            </Link>
          </div>
        ))}
      </div>

      {/* SEO區塊 */}
      <div className="mt-16 text-gray-400 leading-relaxed">
        <h2 className="text-2xl font-semibold mb-4">
          為什麼選擇 Taipei Wild Spa？
        </h2>

        <p className="mb-4">
          Taipei Wild Spa 提供專業的台北同志按摩服務，每位師傅皆經過嚴格篩選，
          不僅具備良好的體態與穩定的運動習慣，也在服務細節上持續優化，
          讓每位顧客都能在安心且舒適的環境中放鬆身心。
        </p>

        <p>
          我們重視隱私與服務品質，採用獨立空間設計，
          並透過真實顧客回饋持續調整服務流程，
          讓 Taipei Wild Spa 成為台北同志按摩中值得信賴的選擇。
        </p>
      </div>
    </main>
  );
}