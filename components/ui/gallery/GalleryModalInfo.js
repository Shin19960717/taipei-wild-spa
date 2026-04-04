"use client";

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
                onClick={() => openLineBooking(member.name, lang, slot)}
                className="inline-flex items-center rounded-full border border-stone-300 bg-white px-4 py-2 text-sm text-stone-900 transition hover:-translate-y-0.5 hover:border-stone-500 hover:bg-stone-50"
              >
                {slot.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {member.calendar && (
        <div className="mt-5 overflow-hidden rounded-2xl border border-stone-200">
          <iframe
            src={member.calendar}
            className="h-[380px] w-full md:h-[520px]"
            style={{ border: 0 }}
            loading="lazy"
            title={`${member.name} calendar`}
          />
        </div>
      )}

      <div className="mt-5">
        <button
          type="button"
          onClick={() => openLineBooking(member.name, lang)}
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