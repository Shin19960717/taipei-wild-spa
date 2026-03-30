import RevealOnScroll from "@/components/ui/RevealOnScroll";
import AboutBackground from "./AboutBackground";
import AboutContent from "./AboutContent";

export default function AboutCard({ t, socialLinks }) {
  return (
    <RevealOnScroll
      className="relative rounded-2xl shadow-lg border border-white/40 overflow-hidden min-h-[560px]"
      delay={100}
      y={20}
    >
      <AboutBackground />
      <AboutContent t={t} socialLinks={socialLinks} />
    </RevealOnScroll>
  );
}