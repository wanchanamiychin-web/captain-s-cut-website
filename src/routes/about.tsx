import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Target, Heart } from "lucide-react";
import owner from "@/assets/owner.jpg";
import hero from "@/assets/hero-shop.jpg";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "เกี่ยวกับเรา – Captain Barber" },
      { name: "description", content: "รู้จักช่างกัปตัน ผู้ก่อตั้งร้าน Captain Barber ร้านตัดผมชายสไตล์ Modern Classic เปิดบริการมากว่า 4 ปี" },
      { property: "og:title", content: "เกี่ยวกับ Captain Barber" },
      { property: "og:description", content: "เรื่องราวและเจตนารมณ์ของร้าน Captain Barber" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  const { t } = useI18n();
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={hero} alt="" width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
        <div className="container-x relative py-24 md:py-32">
          <SectionHeader eyebrow="About" title={t("about.title")} sub={t("about.sub")} />
        </div>
      </section>

      <section className="section-y">
        <div className="container-x grid gap-12 md:grid-cols-2 items-center">
          <div className="relative">
            <img src={owner} alt="ช่างกัปตัน" width={1200} height={1200} loading="lazy" className="rounded-2xl border border-border shadow-lg" />
            <div className="absolute -bottom-4 -right-4 hidden md:block rounded-xl border border-[color:var(--gold)]/50 bg-background/90 backdrop-blur px-5 py-4">
              <p className="text-xs uppercase tracking-widest text-[color:var(--gold)]">Founder</p>
              <p className="text-lg font-bold">ช่างกัปตัน</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[color:var(--gold)]">Our Story</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">Classic craft. Modern gentleman.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">{t("about.p1")}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t("about.p2")}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t("about.p3")}</p>
            <div className="mt-8">
              <a href="https://lin.ee/O6ACLP4" target="_blank" rel="noopener" className="btn-gold rounded-md px-6 py-3 text-sm font-semibold">{t("cta.book")}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary/30">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {[
            { icon: <Target />, t: t("about.mission.t"), d: t("about.mission.d") },
            { icon: <Award />, t: t("about.vision.t"), d: t("about.vision.d") },
            { icon: <Heart />, t: t("about.value.t"), d: t("about.value.d") },
          ].map((v, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-6">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-[color:var(--gold)]/15 text-[color:var(--gold)]">{v.icon}</div>
              <h3 className="mt-4 text-lg font-bold">{v.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
