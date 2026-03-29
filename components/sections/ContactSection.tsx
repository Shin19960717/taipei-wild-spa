import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionTitle from "@/components/ui/SectionTitle";
import SocialIcon from "@/components/ui/SocialIcon";

type SocialLink = {
  name: string;
  href: string;
  iconClass: string;
  className: string;
};

type Props = {
  t: Record<string, string>;
  socialLinks: SocialLink[];
};

export default function ContactSection({ t, socialLinks }: Props) {
  return (
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
        <RevealOnScroll>
          <SectionTitle center>{t.contactTitle}</SectionTitle>
          <p className="mt-4 text-stone-600 leading-7">{t.contactHint}</p>
        </RevealOnScroll>

        <RevealOnScroll className="flex justify-center gap-4 mt-8" delay={100}>
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.name}
              className={item.className}
            >
              <SocialIcon item={item} />
            </a>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}