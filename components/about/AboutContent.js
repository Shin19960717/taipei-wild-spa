import AboutSocialLinks from "./AboutSocialLinks";

export default function AboutContent({ t, socialLinks }) {
  return (
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
          <p className="text-sm text-stone-600 leading-7">
            {t.noticeText}
          </p>
        </div>

        <AboutSocialLinks t={t} socialLinks={socialLinks} />
      </div>
    </div>
  );
}