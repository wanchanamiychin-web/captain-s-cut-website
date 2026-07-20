import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  sub,
  center = true,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      {eyebrow && (
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[color:var(--gold)] mb-3">{eyebrow}</p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
      <div className={`mt-4 h-0.5 w-16 bg-[color:var(--gold)] ${center ? "mx-auto" : ""}`} />
    </div>
  );
}
