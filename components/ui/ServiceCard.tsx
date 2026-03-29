import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";

type Props = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  times: string[];
  extraTime: string;
  notes: string[];
  className?: string;
  delay?: number;
  y?: number;
};

export default function ServiceCard({
  imageSrc,
  imageAlt,
  title,
  times,
  extraTime,
  notes,
  className = "",
  delay = 0,
  y = 22,
}: Props) {
  return (
    <RevealOnScroll
      className={`relative w-full max-w-[520px] min-h-[360px] rounded-2xl overflow-hidden shadow-lg ${className}`}
      delay={delay}
      y={y}
    >
      <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="relative z-10 p-6 md:p-8 text-white flex flex-col justify-end min-h-[360px]">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>

        <ul className="space-y-3 text-white/95 text-lg">
          {times.map((time) => (
            <li key={time}>{time}</li>
          ))}
        </ul>

        <p className="text-sm text-white/80 mt-5">{extraTime}</p>

        <div className="text-xs text-white/70 mt-3 space-y-1 leading-6">
          {notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  );
}