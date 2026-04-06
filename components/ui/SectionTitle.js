export default function SectionTitle({
  children,
  center = false,
  className = "",
}) {
  return (
    <h2
      className={`
        text-2xl md:text-3xl font-medium
        ${center ? "text-center" : ""}
        ${className}
      `}
    >
      {children}
    </h2>
  );
}