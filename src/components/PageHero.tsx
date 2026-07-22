import type { ReactNode } from "react";
import heroBg from "@/assets/hero-shop.jpg";
import { SectionHeader } from "@/components/SectionHeader";

export function PageHero({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={heroBg}
        alt=""
        aria-hidden
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
      <div className="container-x relative py-24 md:py-32">
        <SectionHeader eyebrow={eyebrow} title={title} sub={sub} />
        {children}
      </div>
    </section>
  );
}
