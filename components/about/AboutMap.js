import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function AboutMap() {
  return (
    <RevealOnScroll
      className="w-full rounded-2xl overflow-hidden shadow-lg border border-white/40"
      delay={220}
      y={20}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=..."
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Taipei Wild Spa 地圖"
      />
    </RevealOnScroll>
  );
}