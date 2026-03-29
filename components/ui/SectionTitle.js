export default function SectionTitle({ children, center = false }) {
  return (
    <h2 className={`text-2xl md:text-3xl font-bold ${center ? "text-center" : ""}`}>
      {children}
    </h2>
  );
}