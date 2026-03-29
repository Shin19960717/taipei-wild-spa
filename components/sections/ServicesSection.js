import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionTitle from "@/components/ui/SectionTitle";
import ServiceCard from "@/components/ui/ServiceCard";

export default function ServicesSection({ t, serviceCards }) {
  return (
    <section
      id="services"
      className="px-6 py-16 md:px-12 relative overflow-hidden bg-gradient-to-b from-white via-stone-100 to-stone-200 scroll-mt-32"
    >
      <RevealOnScroll className="max-w-6xl mx-auto" y={24}>
        <SectionTitle>{t.servicesTitle}</SectionTitle>
        <p className="text-stone-600 mt-4 mb-6">{t.servicesIntro}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {[t.serviceTag1, t.serviceTag2, t.serviceTag3].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-stone-200 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center md:px-10">
          {serviceCards.map((card) => (
            <ServiceCard
              key={card.title}
              imageSrc={card.imageSrc}
              imageAlt={card.imageAlt}
              title={card.title}
              times={card.times}
              extraTime={t.extraTime}
              notes={card.notes}
              className={card.className}
              delay={card.delay}
            />
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}