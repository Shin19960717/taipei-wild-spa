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

  const calendarSrc = useMemo(() => {
    if (!member?.calendar) return "";

    try {
      const url = new URL(member.calendar);

      if (isMobile) {
        url.searchParams.set("mode", "AGENDA");
        url.searchParams.set("showTitle", "0");
        url.searchParams.set("showPrint", "0");
        url.searchParams.set("showTabs", "0");
        url.searchParams.set("showCalendars", "0");
        url.searchParams.set("showTz", "0");
      } else {
        if (!url.searchParams.get("mode")) {
          url.searchParams.set("mode", "MONTH");
        }
      }

      return url.toString();
    } catch {
      return member.calendar;
    }
  }, [member?.calendar, isMobile]);

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
              <div className="flex h-[420px] w-full items-center justify-center text-sm text-stone-500 md:h-[520px]">
                載入班表中...
              </div>
            )}

            <iframe
              key={`${member.id}-${lang}-${isMobile ? "mobile" : "desktop"}`}
              src={calendarSrc}
              className={`${iframeReady ? "block" : "block"} w-full ${
                isMobile ? "h-[420px]" : "h-[520px]"
              }`}
              style={{
                border: 0,
                backgroundColor: "#ffffff",
              }}
              title={`${member.name} calendar`}
              onLoad={() => setIframeReady(true)}
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          <p className="mt-2 text-xs leading-5 text-stone-500">
            {isMobile
              ? "手機版已自動切換為較適合小螢幕瀏覽的日程模式。"
              : "桌機版顯示完整 Google 日曆。"}
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