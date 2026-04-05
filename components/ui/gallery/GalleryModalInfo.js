"use client";

import { useEffect, useMemo, useState } from "react";
import { PRIMARY_TAG_CLASS, TAG_CLASS } from "./galleryModal.constants";
import { TEAM_SCHEDULES } from "@/data/teamSchedules";

export default function GalleryModalInfo({
  member,
  lang,
  t,
  imageIndex,
  openLineBooking,
}) {
  const memberKey = member.id.toLowerCase();
  const slots = TEAM_SCHEDULES[memberKey] ?? [];

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
  }, [member?.id, lang, isMobile]);

  const handleBookingClick = (e, slot) => {
    e.preventDefault();
    e.stopPropagation();
    openLineBooking(member.name, lang, slot, e);
  };

  const handleGeneralBookingClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openLineBooking(member.name, lang, undefined, e);
  };

  /**
   * 這裡改成：
   * 1. 手機與桌機都使用 MONTH 模式
   * 2. 不再把手機切成 AGENDA
   * 3. 明確補齊常用 embed 參數，讓顯示更穩定
   */
  const calendarSrc = useMemo(() => {
    if (!member?.calendar) return "";

    try {
      const url = new URL(member.calendar);

      // 統一使用月曆模式，讓手機與桌機盡量一致
      url.searchParams.set("mode", "MONTH");

      // 建議固定時區
      url.searchParams.set("ctz", "Asia/Taipei");

      // 保留標題與導覽，讓手機看起來更接近桌機
      // 如不想太複雜，可改成 0
      if (!url.searchParams.has("showTitle")) {
        url.searchParams.set("showTitle", "0");
      }

      // 保留分頁列（月/週/日）可自行決定
      if (!url.searchParams.has("showTabs")) {
        url.searchParams.set("showTabs", "0");
      }

      // 列印按鈕通常可關閉
      if (!url.searchParams.has("showPrint")) {
        url.searchParams.set("showPrint", "0");
      }

      // 是否顯示左下時區
      if (!url.searchParams.has("showTz")) {
        url.searchParams.set("showTz", "1");
      }

      // 是否顯示日曆清單
      if (!url.searchParams.has("showCalendars")) {
        url.searchParams.set("showCalendars", "0");
      }

      // 背景白色
      if (!url.searchParams.has("bgcolor")) {
        url.searchParams.set("bgcolor", "#ffffff");
      }

      return url.toString();
    } catch {
      return member.calendar;
    }
  }, [member?.calendar]);

  return (
    <div className="p-4 md:p-5">
      <h3 className="text-2xl font-bold">{member.name}</h3>

      <div className="mt-3 flex flex-wrap gap-3">
        {member.desc[lang].map((item, idx) => (
          <span
            key={`${member.id}-${lang}-desc-${idx}`}
            className={idx === 0 ? PRIMARY_TAG_CLASS : TAG_CLASS}
          >
            {item}
          </span>
        ))}
      </div>

      {slots.length > 0 && (
        <div className="mt-5">
          <h4 className="text-sm font-medium text-stone-900 md:text-base">
            可預約時段
          </h4>

          <div className="mt-3 flex flex-wrap gap-3">
            {slots.map((slot) => (
              <button
                key={`${member.id}-${slot.date}-${slot.time}`}
                type="button"
                onClick={(e) => handleBookingClick(e, slot)}
                className="inline-flex items-center rounded-full border border-stone-300 bg-white px-4 py-2 text-sm text-stone-900 transition hover:-translate-y-0.5 hover:border-stone-500 hover:bg-stone-50"
              >
                {slot.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {member.calendar && (
        <div className="mt-5">
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
            {!iframeReady && (
              <div
                className={`flex w-full items-center justify-center text-sm text-stone-500 ${
                  isMobile ? "h-[500px]" : "h-[640px]"
                }`}
              >
                載入班表中...
              </div>
            )}

            <iframe
              key={`${member.id}-${lang}-desktop-like-calendar`}
              src={calendarSrc}
              className={`w-full ${iframeReady ? "block" : "block"} ${
                isMobile ? "h-[500px]" : "h-[640px]"
              }`}
              style={{
                border: 0,
                backgroundColor: "#ffffff",
              }}
              title={`${member.name} calendar`}
              onLoad={() => setIframeReady(true)}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          <p className="mt-2 text-xs leading-5 text-stone-500">
            目前已改為手機與桌機皆使用相同的 Google 月曆 iframe 模式。若手機仍出現 Google 帳號或 cookie 提示，通常是手機瀏覽器或 App 內建瀏覽器的限制，並非此頁面版面錯誤。
          </p>
        </div>
      )}

      <div className="mt-5">
        <button
          type="button"
          onClick={handleGeneralBookingClick}
          className="inline-flex items-center rounded-full bg-green-500 px-4 py-2 text-sm text-white transition hover:scale-105"
        >
          {t.bookThis}
        </button>
      </div>

      <p className="mt-3 text-sm text-stone-500">
        {imageIndex + 1} / {member.imgs.length}
      </p>
    </div>
  );
}