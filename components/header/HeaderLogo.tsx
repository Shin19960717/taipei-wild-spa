import Image from "next/image";

type HeaderLogoProps = {
  scrolled: boolean;
};

export default function HeaderLogo({ scrolled }: HeaderLogoProps) {
  return (
    <div
      className={`transition-all duration-500 ease-out flex items-center justify-center ${
        scrolled
          ? "w-[110px] h-[42px] md:w-[150px] md:h-[52px] py-1"
          : "w-[160px] h-[60px] md:w-[220px] md:h-[80px] py-2 md:py-3"
      }`}
    >
      <Image
        src="/flatbanner.png"
        alt="Taipei Wild Spa"
        width={220}
        height={80}
        priority
        className="w-full h-full object-contain"
      />
    </div>
  );
}