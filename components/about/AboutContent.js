import AboutSocialLinks from "./AboutSocialLinks";

export default function AboutContent({ t, socialLinks }) {
  const aboutParagraphs = t.aboutText
    .split("。")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => `${item}。`);

  return (
    <div className="relative z-10 p-6 md:p-8 space-y-8 text-stone-700">
      <section className="space-y-2">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-stone-900">
          {t.aboutTitle}
        </h3>

        <div className="space-y-1">
          {aboutParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-base leading-8 break-words whitespace-normal"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-stone-900">
          {t.businessHoursTitle}
        </h3>
        <p className="text-base leading-8">{t.businessHoursText}</p>
      </section>

      <section className="space-y-2">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-stone-900">
          {t.locationTitle}
        </h3>
        <p className="text-base leading-8">{t.locationText}</p>
      </section>

      <section className="space-y-2">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-stone-900">
          {t.bookingTitle}
        </h3>
        <p className="text-base leading-8">{t.bookingText}</p>
      </section>

      <section className="space-y-2">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-stone-900">
          {t.noticeTitle}
        </h3>
        <p className="text-sm md:text-base text-stone-600 leading-8">
          {t.noticeText}
        </p>
      </section>

      <section className="space-y-4">
        <AboutSocialLinks t={t} socialLinks={socialLinks} />
      </section>
    </div>
  );
}