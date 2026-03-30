import Image from "next/image";

export default function AboutBackground() {
  return (
    <>
      <div className="absolute inset-0 z-0">
        <Image
          src="/about/card-bg.jpg"
          alt="card background"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-[65%_center]"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/84 to-white/88 backdrop-blur-xs" />
    </>
  );
}