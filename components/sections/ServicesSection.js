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
        <SectionTitle>{t.servicesTitle}</SectionTitle>

        <p className="text-stone-600 mt-4 mb-6">
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