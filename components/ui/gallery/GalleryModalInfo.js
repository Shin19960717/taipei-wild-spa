"use client";

import { PRIMARY_TAG_CLASS, TAG_CLASS } from "./galleryModal.constants";

export default function GalleryModalInfo({
  member,
  lang,
  t,
  imageIndex,
  openLineBooking,
}) {
  return (
    <div className="p-4 md:p-5">
      <h3 className="text-2xl font-bold">{member.name}</h3>

      <div className="flex flex-wrap gap-3 mt-3">
        {member.desc[lang].map((item, idx) => (
          <span
            key={`${member.id}-${lang}-desc-${idx}`}
            className={idx === 0 ? PRIMARY_TAG_CLASS : TAG_CLASS}
          >
            {item}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <a
          href={member.calendar}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center px-4 py-2 bg-black text-white rounded-full text-sm"
        >
          {t.scheduleButton}
        </a>

        <button
          type="button"
          onClick={() => openLineBooking(member.name, lang)}
          className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-full text-sm transition hover:scale-105"
        >
          {t.bookThis}
        </button>
      </div>

      <p className="text-sm text-stone-500 mt-3">
        {imageIndex + 1} / {member.imgs.length}
      </p>
    </div>
  );
}