"use client";

import { useEffect, useMemo, useState } from "react";
import { PRIMARY_TAG_CLASS, TAG_CLASS } from "./galleryModal.constants";

export default function GalleryModalInfo({
  member,
  lang,
  t,
  imageIndex,
  openLineBooking,
  fullScreen = false,
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);

    return () => {
      window.removeEventListener("resize", updateIsMobile);
    };
  }, []);

  useEffect(() => {
    setIframeReady(false);
  }, [member?.id, lang]);

  if (!member) return null;

  const handleGeneralBookingClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openLineBooking(member.name, lang, undefined, e);
  };

  const calendarHeightClass = isMobile
    ? "h-[500px]"
    : fullScreen
    ? "h-[320px] xl:h-[360px]"
    : "h-[640px]";

  const calendarSrc = useMemo(() => {
    if (!member?.calendar) return "";

    try {
      const url = new URL(member.calendar);

      url.searchParams.set("mode", "MONTH");
      url.searchParams.set("ctz", "Asia/Taipei");
      url.searchParams.set("showTitle", "0");
      url.searchParams.set("showTabs", "0");
      url.searchParams.set("showPrint", "0");
      url.searchParams.set("showCalendars", "0");
      url.searchParams.set("showTz", "1");
      url.searchParams.set("bgcolor", "#ffffff");

      return url.toString();
    } catch {
      return member.calendar;
    }
  }, [member?.calendar]);

  const reviewText = {
    zh: {
      title: "客人評論",
      empty: "目前尚無評論。",
      anonymous: "匿名顧客",
    },
    en: {
      title: "Guest Reviews",
      empty: "No reviews yet.",
      anonymous: "Anonymous Guest",
    },
    ja: {
      title: "お客様のレビュー",
      empty: "現在レビューはありません。",
      anonymous: "匿名のお客様",
    },
    ko: {
      title: "고객 후기",
      empty: "아직 후기가 없습니다.",
      anonymous: "익명 고객",
    },
  };

  const currentReviewText = reviewText[lang] ?? reviewText.zh;
  const reviews = Array.isArray(member.reviews) ? member.reviews : [];

  const renderStars = (rating) => {
    if (!rating || Number.isNaN(Number(rating))) return null;

    const safeRating = Math.max(1, Math.min(5, Number(rating)));

    return (
      <div className="flex items-center gap-1 text-[15px] leading-none text-amber-500">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={`star-${index}`}>{index < safeRating ? "★" : "☆"}</span>
        ))}
      </div>
    );
  };

  return (
    <div
      className={
        fullScreen
          ? "min-h-full px-7 py-8 md:px-9 md:py-10"
          : "p-4 md:p-5"
      }
    >
      <h3 className="text-2xl font-bold text-stone-900">{member.name}</h3>

      <div className="mt-3 flex flex-wrap gap-3">
        {(member.desc?.[lang] ?? []).map((item, idx) => (
          <span
            key={`${member.id}-${lang}-desc-${idx}`}
            className={idx === 0 ? PRIMARY_TAG_CLASS : TAG_CLASS}
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-5">
        <button
          type="button"
          onClick={handleGeneralBookingClick}
          className="inline-flex items-center rounded-full bg-green-500 px-4 py-2 text-sm text-white transition hover:scale-105 hover:bg-green-600"
        >
          {t?.bookThis ?? "立即預約"}
        </button>
      </div>

      {member.calendar && (
        <div className="mt-6">
          <div
            className={`relative overflow-hidden rounded-2xl border border-stone-200 bg-white ${calendarHeightClass}`}
          >
            <iframe
              key={`${member.id}-${lang}-desktop-like-calendar`}
              src={calendarSrc}
              title={`${member.name} calendar`}
              onLoad={() => setIframeReady(true)}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full"
              style={{
                border: 0,
                backgroundColor: "#ffffff",
              }}
            />

            {!iframeReady && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white text-sm text-stone-500">
                載入班表中...
              </div>
            )}
          </div>
        </div>
      )}

      {reviews.length > 0 && (
        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-base font-semibold tracking-wide text-stone-900 md:text-lg">
              {currentReviewText.title}
            </h4>
          </div>

          <div className={fullScreen ? "space-y-3 pb-8" : "space-y-3"}>
            {reviews.map((review, index) => (
              <article
                key={`${member.id}-review-${index}`}
                className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-stone-900 md:text-[15px]">
                      {review.name?.trim() || currentReviewText.anonymous}
                    </p>

                    {review.date ? (
                      <p className="mt-1 text-xs text-stone-500 md:text-sm">
                        {review.date}
                      </p>
                    ) : null}
                  </div>

                  {renderStars(review.rating)}
                </div>

                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-stone-700 md:text-[15px]">
                  {review.content}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}