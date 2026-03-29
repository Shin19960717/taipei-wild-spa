import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionTitle from "@/components/ui/SectionTitle";
import ServiceCard from "@/components/ui/ServiceCard";
import { TAG_CLASS } from "@/constants/styles";

type Props = {
  t: Record<string, string>;
};

export default function ServicesSection({ t }: Props) {
  const serviceCards = [
    {
      imageSrc: "/services/in-store.jpg",
      imageAlt: "In-store service",
      title: t.inStoreTitle,
      times: [t.inStoreTime1, t.inStoreTime2, t.inStoreTime3],
      extraTime: t.extraTime,
      notes: [t.inStoreNote1, t.inStoreNote2],
    },
    {
      imageSrc: "/services/home-service.jpg",
      imageAlt: "Outcall service",
      title: t.homeServiceTitle,
      times: [t.homeServiceTime1, t.homeServiceTime2],
      extraTime: t.extraTime,
      notes: [t.homeNote1, t.homeNote2, t.homeNote3],
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <RevealOnScroll>
          <SectionTitle center>{t.servicesTitle}</SectionTitle>
          <p className="text-center text-stone-600 mt-4">{t.servicesIntro}</p>
        </RevealOnScroll>

        <RevealOnScroll className="flex flex-wrap justify-center gap-3 mt-8" delay={100}>
          <span className={TAG_CLASS}>{t.serviceTag1}</span>
          <span className={TAG_CLASS}>{t.serviceTag2}</span>
          <span className={TAG_CLASS}>{t.serviceTag3}</span>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 place-items-center">
          {serviceCards.map((card, index) => (
            <ServiceCard
              key={card.title}
              imageSrc={card.imageSrc}
              imageAlt={card.imageAlt}
              title={card.title}
              times={card.times}
              extraTime={card.extraTime}
              notes={card.notes}
              delay={index * 120}
            />
          ))}
        </div>
      </div>
    </section>
  );
}