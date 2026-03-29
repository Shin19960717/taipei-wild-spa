import Image from "next/image";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionTitle from "@/components/ui/SectionTitle";

type Props = {
  t: Record<string, string>;
};

export default function AboutSection({ t }: Props) {
  return (
    <section id="about" className="py-20 md:py-28 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <RevealOnScroll>
          <SectionTitle center>{t.aboutHeader}</SectionTitle>
        </RevealOnScroll>

        <RevealOnScroll
          className="relative rounded-2xl shadow-lg border border-white/40 overflow-hidden mt-12"
          delay={100}
          y={20}
        >
          <Image
            src="/about/card-bg.jpg"
            alt="about background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-white/75 backdrop-blur-sm" />

          <div className="relative z-10 p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-stone-900">{t.aboutTitle}</h3>
              <p className="text-stone-600">{t.aboutText}</p>
            </div>

            <div className="space-y-5 text-stone-800">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-stone-800">
                  {t.businessHoursTitle}
                </h3>
                <p>{t.businessHoursText}</p>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-semibold text-stone-800">
                  {t.locationTitle}
                </h3>
                <p>{t.locationText}</p>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-semibold text-stone-800">
                  {t.bookingTitle}
                </h3>
                <p>{t.bookingText}</p>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-semibold text-stone-800">
                  {t.noticeTitle}
                </h3>
                <p className="text-sm text-stone-600 leading-7">{t.noticeText}</p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}