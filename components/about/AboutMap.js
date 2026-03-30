import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function AboutMap() {
  return (
    <RevealOnScroll
      className="w-full rounded-2xl overflow-hidden shadow-lg border border-white/40"
      delay={220}
      y={20}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d502.3302776485608!2d121.50136018604407!3d25.03963615611425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9a872a0f47b%3A0x7029343814562109!2z5YWo5a625L6_5Yip5ZWG5bqXK0ZhbWlTdXBlcuWFqOWutuaWsOmuruW4giDlurfpmb3lupc!5e0!3m2!1szh-TW!2stw!4v1774875333412!5m2!1szh-TW!2stw"
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