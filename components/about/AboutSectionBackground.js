import Image from "next/image";

export default function AboutBackground() {
  return (
    <>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/about/aboutbackground.jpg"
          alt="card background"
          fill
          priority
          sizes="100vw"
          className="object-cover md:object-center"
        />
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-white/90 via-white/84 to-white/88 backdrop-blur-xs pointer-events-none" />
    </>
  );
}