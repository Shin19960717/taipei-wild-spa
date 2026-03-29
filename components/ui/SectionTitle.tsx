import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  center?: boolean;
};

export default function SectionTitle({ children, center = false }: Props) {
  return (
    <h2 className={`text-2xl md:text-3xl font-bold ${center ? "text-center" : ""}`}>
      {children}
    </h2>
  );
}