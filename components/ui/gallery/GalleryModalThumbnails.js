"use client";

import Image from "next/image";

export default function GalleryModalThumbnails({
  member,
  imageIndex,
  onSelectImage,
}) {
  return (
    <div className="bg-white px-5 pb-5 pt-4 md:px-6">
      <div className="flex gap-3 overflow-x-auto pb-2">
        {member.imgs.map((img, index) => (
          <button
            key={`${member.id}-thumb-${index}`}
            type="button"
            onClick={() => onSelectImage(index)}
            className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 transition ${
              imageIndex === index
                ? "border-black"
                : "border-stone-200 hover:border-stone-400"
            }`}
            aria-label={`Select image ${index + 1}`}
          >
            <Image
              src={img}
              alt={`${member.name}-thumb-${index + 1}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}