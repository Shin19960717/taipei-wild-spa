"use client";

import Link from "next/link";

import ReviewsSection from "@/components/sections/ReviewsSection";

import {
  getAllReviews,
  normalizeReviewLang,
  type SupportedLang,
} from "@/data/reviews";

type Props = {
  lang: SupportedLang;
};

const TEXT = {
  zh: {
    title: "顧客評價",
    back: "返回首頁",

    reviewsTitle: "顧客體驗與評價分享",

    reviewsIntro:
      "來自顧客的實際體驗回饋，讓第一次預約的客人也能更安心了解 Taipei Wild Spa 的服務品質、空間氛圍與預約流程。",

    reviewsLanguageNotice:
      "評價將依照使用者語言，優先顯示該語言的評論。",

    reviewsButton: "查看更多評價",
  },

  en: {
    title: "Customer Reviews",
    back: "Back Home",

    reviewsTitle: "Customer Experiences & Reviews",

    reviewsIntro:
      "Real experiences shared by our guests to help first-time visitors better understand the atmosphere, service quality, and booking process at Taipei Wild Spa.",

    reviewsLanguageNotice:
      "Reviews are prioritized based on the visitor's selected language.",

    reviewsButton: "View More Reviews",
  },

  ja: {
    title: "お客様レビュー",
    back: "ホームへ戻る",

    reviewsTitle: "お客様の体験とレビュー",

    reviewsIntro:
      "実際にご利用いただいたお客様の感想を通して、Taipei Wild Spa の空間やサービス、予約の流れをご確認いただけます。",

    reviewsLanguageNotice:
      "レビューは選択中の言語を優先して表示されます。",

    reviewsButton: "さらにレビューを見る",
  },

  ko: {
    title: "고객 후기",
    back: "홈으로 돌아가기",

    reviewsTitle: "고객 경험 및 후기",

    reviewsIntro:
      "실제 고객들의 경험을 통해 Taipei Wild Spa의 분위기와 서비스 품질, 예약 과정을 보다 편하게 확인하실 수 있습니다.",

    reviewsLanguageNotice:
      "후기는 현재 선택된 언어를 우선적으로 표시합니다.",

    reviewsButton: "더 많은 후기 보기",
  },
};

export default function ReviewsPage({
  lang,
}: Props) {
  const safeLang = normalizeReviewLang(lang);

  const reviews = getAllReviews(safeLang);

  const t = TEXT[safeLang];

  const homeHref = `/${safeLang}`;

  return (
    <main className="min-h-screen bg-[#eadcc4]">
      <div className="px-6 pt-24 md:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <Link
            href={homeHref}
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-neutral-900/15
              bg-white/70
              px-5
              py-3
              text-sm
              font-bold
              tracking-wide
              text-neutral-900
              shadow-lg
              backdrop-blur
              transition
              hover:scale-[1.03]
              hover:bg-white
            "
          >
            {t.back}
          </Link>
        </div>
      </div>

      <ReviewsSection
        reviews={reviews}
        lang={safeLang}

        // ✅ 子頁顯示全部評價
        limit={999}

        // ✅ 子頁不顯示「查看更多評價」
        showViewMore={false}

        t={{
          reviewsTitle: t.reviewsTitle,
          reviewsIntro: t.reviewsIntro,
          reviewsLanguageNotice:
            t.reviewsLanguageNotice,
          reviewsButton: t.reviewsButton,
        }}
      />
    </main>
  );
}