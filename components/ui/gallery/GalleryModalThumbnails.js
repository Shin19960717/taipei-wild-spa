"use client";

import Image from "next/image";

export default function GalleryModalThumbnails({
  member,
  imageIndex,
  onSelectImage,
}) {
  return (
    <div className="flex gap-3 overflow-x-auto px-6 py-4 bg-white">
      {member.imgs.map((img, index) => (
        <button
          key={`${member.id}-thumb-${index}`}
          type="button"
          onClick={() => onSelectImage(index)}
          className={`relative shrink-0 rounded-full overflow-hidden border-2 w-20 h-20 ${
            imageIndex === index ? "border-black" : "border-stone-200"
          }`}
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
  );
}