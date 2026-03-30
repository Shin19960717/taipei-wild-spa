import SectionTitle from "@/components/ui/SectionTitle";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import AboutCard from "@/components/about/AboutCard";
import AboutMap from "@/components/about/AboutMap";

export default function AboutSection({ t, socialLinks }) {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-4 md:px-10">
      <RevealOnScroll y={24}>
        <SectionTitle center>{t.aboutHeader}</SectionTitle>

        <div className="grid md:grid-cols-2 gap-10 items-start mt-10">
          <AboutCard t={t} socialLinks={socialLinks} />
          <AboutMap />
        </div>
      </RevealOnScroll>
    </section>
  );
}