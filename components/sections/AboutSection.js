import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SocialIcon from "@/components/ui/SocialIcon";

export default function AboutSection({ t, socialLinks }) {
  return (
    <section id="about" className="relative px-6 py-16 scroll-mt-32 overflow-hidden">
      <Image
        src="/about/about-bg1.jpg"
        alt="environment background"
        fill
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-white/88 via-stone-100/82 to-stone-200/88" />

      <RevealOnScroll className="relative z-10 max-w-6xl mx-auto md:px-10" y={24}>
        <SectionTitle center>{t.aboutHeader}</SectionTitle>

        <div className="grid md:grid-cols-2 gap-10 items-start mt-10">
          <RevealOnScroll
            className="relative rounded-2xl shadow-lg border border-white/40 overflow-hidden min-h-[560px]"
            delay={100}
            y={20}
          >
            <Image
              src="/about/card-bg.jpg"
              alt="card background"
              fill
              className="object-cover object-[65%_center]"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/84 to-white/88 backdrop-blur-xs" />

            <div className="relative z-10 p-6 md:p-8 space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-stone-900">{t.aboutTitle}</h3>
                <p className="text-stone-700">{t.aboutText}</p>
              </div>

              <div className="space-y-5 text-stone-700">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-stone-900">
                    {t.businessHoursTitle}
                  </h3>
                  <p>{t.businessHoursText}</p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-stone-900">
                    {t.locationTitle}
                  </h3>
                  <p>{t.locationText}</p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-stone-900">
                    {t.bookingTitle}
                  </h3>
                  <p>{t.bookingText}</p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-stone-900">
                    {t.noticeTitle}
                  </h3>
                  <p className="text-sm text-stone-600 leading-7">{t.noticeText}</p>
                </div>

                <div className="pt-4 border-t border-stone-200/70 space-y-3">
                  <h3 className="text-lg font-bold text-stone-900">
                    {t.contactTitle}
                  </h3>

                  <div className="flex gap-4">
                    {socialLinks.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={item.className}
                        aria-label={item.name}
                      >
                        <SocialIcon item={item} />
                      </a>
                    ))}
                  </div>

                  <p className="text-sm text-stone-500">{t.contactHint}</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll
            className="w-full rounded-2xl overflow-hidden shadow-lg border border-white/40"
            delay={220}
            y={20}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.8358363076327!2d121.4994605753547!3d25.039644638064257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9a872a72d25%3A0xb0b2343c58e9b562!2zMTA46Ie65YyX5biC6JCs6I-v5Y2A5bq35a6a6LevOTnomZ8!5e0!3m2!1szh-TW!2stw!4v1774715460312!5m2!1szh-TW!2stw"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Taipei Wild Spa 地圖"
            />
          </RevealOnScroll>
        </div>
      </RevealOnScroll>
    </section>
  );
}