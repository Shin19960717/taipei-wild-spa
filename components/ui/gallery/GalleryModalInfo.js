"use client";

import { useEffect, useMemo, useState } from "react";
import { PRIMARY_TAG_CLASS, TAG_CLASS } from "./galleryModal.constants";

export default function GalleryModalInfo({
  member,
  lang,
  t,
  imageIndex,
  openLineBooking,
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

  // 只在切換人物或語言時重設 iframe 載入狀態
  // 不要把 isMobile 放進來，否則橫直切換時會把 iframeReady 重設成 false
  useEffect(() => {
    setIframeReady(false);
  }, [member?.id, lang]);

  if (!member) return null;

  const handleGeneralBookingClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openLineBooking(member.name, lang, undefined, e);
  };

  const calendarHeightClass = isMobile ? "h-[500px]" : "h-[640px]";

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

  return (
    <div className="p-4 md:p-5">
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
          className="inline-flex items-center rounded-full bg-green-500 px-4 py-2 text-sm text-white transition hover:scale-105"
        >
          {t?.bookThis ?? "立即預約"}
        </button>
      </div>

      {member.calendar && (
        <div className="mt-5">
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
    </div>
  );
}