import SectionTitle from "@/components/ui/SectionTitle";
import AboutCard from "@/components/about/AboutCard";
import AboutMap from "@/components/about/AboutMap";
import AboutSectionBackground from "@/components/about/AboutSectionBackground";

export default function AboutSection({ t, socialLinks }) {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-16 px-4 md:px-6"
    >
      <AboutSectionBackground />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionTitle>{t.aboutTitle}</SectionTitle>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <AboutCard t={t} socialLinks={socialLinks} />
          <AboutMap />
        </div>
      </div>
    </section>
  );
}