import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionTitle from "@/components/ui/SectionTitle";
import ServicesGrid from "@/components/services/ServicesGrid";
import ServicesTags from "@/components/services/ServicesTags";

export default function ServicesSection({ t, serviceCards }) {
  return (
    <section
      id="services"
      className="px-6 py-16 md:px-12 relative overflow-hidden bg-gradient-to-b from-white via-stone-100 to-stone-200 scroll-mt-32"
    >
      <RevealOnScroll className="max-w-6xl mx-auto" y={24}>
        
<SectionTitle className="text-[rgba(75,60,50,0.9)] tracking-[0.12em] font-light [text-shadow:0_1px_0_rgba(255,255,255,0.85),0_0_8px_rgba(255,248,242,0.62),0_0_18px_rgba(255,243,232,0.65)]">
              {t.servicesTitle}
        </SectionTitle>

        <p className="mt-4 mb-8 text-sm md:text-base font-light tracking-[0.08em] text-[rgba(75,60,50,0.9)] [text-shadow:0_1px_0_rgba(255,255,255,0.48)]">
          {t.servicesIntro}
        </p>

        <ServicesTags t={t} />

        <ServicesGrid
          serviceCards={serviceCards}
          extraTime={t.extraTime}
        />
      </RevealOnScroll>
    </section>
  );
}