import Image from "next/image";

type HeaderLogoProps = {
  scrolled: boolean;
  onScrollToSection: (sectionId: string) => void;
};

export default function HeaderLogo({
  scrolled,
  onScrollToSection,
}: HeaderLogoProps) {
  return (
    <button
      type="button"
      onClick={() => onScrollToSection("hero")}
      aria-label="Taipei Wild Spa"
      className="shrink-0 flex items-center justify-center"
    >
      <div
        className={`transition-all duration-300 ease-out flex items-center justify-center ${
          scrolled
            ? "w-[96px] h-[36px] md:w-[118px] md:h-[42px]"
            : "w-[108px] h-[40px] md:w-[130px] md:h-[46px]"
        }`}
      >
        <Image
          src="/flatbanner.png"
          alt="Taipei Wild Spa"
          width={220}
          height={80}
          priority
          className="h-full w-full object-contain"
        />
      </div>
    </button>
  );
}