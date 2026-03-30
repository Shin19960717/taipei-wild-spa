import ServiceCard from "@/components/ui/ServiceCard";

export default function ServicesGrid({ serviceCards, extraTime }) {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center md:px-10">
      {serviceCards.map((card) => (
        <ServiceCard
          key={card.title}
          imageSrc={card.imageSrc}
          imageAlt={card.imageAlt}
          title={card.title}
          times={card.times}
          extraTime={extraTime}
          notes={card.notes}
          className={card.className}
          delay={card.delay}
        />
      ))}
    </div>
  );
}