import SocialIcon from "@/components/ui/SocialIcon";

export default function AboutSocialLinks({ socialLinks, t }) {
  return (
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
  );
}