"use client";

import Image from "next/image";

export default function GalleryModalThumbnails({
  member,
  imageIndex,
  onSelectImage,
}) {
  const images = member?.imgs ?? [];

  if (!member || !images.length) return null;

  return (
    <div className="bg-white px-5 pb-5 pt-4 md:px-6">
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((img, index) => {
          const isActive = imageIndex === index;

          return (
            <button
              key={`${member.id}-thumb-${index}`}
              type="button"
              onClick={() => onSelectImage(index)}
              className={`group relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 transition-all duration-300 ${
                isActive
                  ? "scale-100 border-black ring-2 ring-black/10"
                  : "scale-[0.98] border-stone-200 hover:scale-100 hover:border-stone-400"
              }`}
              aria-label={`Select image ${index + 1}`}
              aria-pressed={isActive}
            >
              <Image
                src={img}
                alt={`${member.name}-thumb-${index + 1}`}
                fill
                sizes="80px"
                className={`object-cover transition-transform duration-300 ${
                  isActive ? "scale-100" : "scale-105 group-hover:scale-100"
                }`}
              />

              <span
                className={`absolute inset-0 transition-colors duration-300 ${
                  isActive
                    ? "bg-transparent"
                    : "bg-black/0 group-hover:bg-black/5"
                }`}
              />

              {isActive && (
                <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/70" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}