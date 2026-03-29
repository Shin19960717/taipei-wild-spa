"use client";

import Image from "next/image";
import { useAutoCarousel } from "@/hooks/useAutoCarousel";

type Props = {
  images: string[];
};

export default function HeroCarousel({ images }: Props) {
  const { current } = useAutoCarousel(images.length, 4000);

  if (!images?.length) return null;

  return (
    <div className="absolute inset-0">
      {images.map((img, index) => (
        <div
          key={`hero-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={img}
            alt={`hero-${index + 1}`}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}