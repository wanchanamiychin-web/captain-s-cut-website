import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import fade from "@/assets/service-fade.jpg";
import shave from "@/assets/service-shave.jpg";
import styleImg from "@/assets/service-style.jpg";
import color from "@/assets/service-color.jpg";
import p1 from "@/assets/portrait-1.jpg";
import p2 from "@/assets/portrait-2.jpg";
import p3 from "@/assets/portrait-3.jpg";
import { useI18n } from "@/lib/i18n";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "ผลงาน Before & After – Captain Barber" },
      { name: "description", content: "รวมผลงานตัดผมชาย Fade รองทรง ย้อมสี โกนหนวด ก่อนและหลังจริงจากลูกค้า Captain Barber" },
      { property: "og:title", content: "ผลงาน Before & After – Captain Barber" },
      { property: "og:description", content: "ผลงาน Before & After จริงจากลูกค้า" },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

type Cat = "all" | "fade" | "classic" | "color" | "shave";

const items: { img: string; title: string; cat: Cat }[] = [
  { img: fade,     title: "Mid Fade",         cat: "fade" },
  { img: p1,       title: "Skin Fade",        cat: "fade" },
  { img: styleImg, title: "Side Part",        cat: "classic" },
  { img: p2,       title: "Crew Cut",         cat: "classic" },
  { img: p3,       title: "Executive Cut",    cat: "classic" },
  { img: color,    title: "Ash Blonde",       cat: "color" },
  { img: color,    title: "Highlight",        cat: "color" },
  { img: shave,    title: "Hot Towel Shave",  cat: "shave" },
  { img: shave,    title: "Beard Trim",       cat: "shave" },
];

function Gallery() {
  const { t } = useI18n();
  const [active, setActive] = useState<Cat>("all");
  const filtered = useMemo(() => active === "all" ? items : items.filter(i => i.cat === active), [active]);

  const tabs: { k: Cat; label: string }[] = [
    { k: "all",     label: t("filter.all") },
    { k: "fade",    label: t("filter.fade") },
    { k: "classic", label: t("filter.classic") },
    { k: "color",   label: t("filter.color") },
    { k: "shave",   label: t("filter.shave") },
  ];

  return (
    <>
    <PageHero eyebrow="Portfolio" title={t("gallery.title")} sub={t("gallery.sub")} />
    <section className="section-y">
      <div className="container-x">

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {tabs.map(tab => (
            <button
              key={tab.k}
              onClick={() => setActive(tab.k)}
              className={`rounded-full px-4 py-2 text-sm font-semibold border transition ${
                active === tab.k
                  ? "border-[color:var(--gold)] bg-[color:var(--gold)] text-black"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((it, i) => (
            <BeforeAfter key={i} img={it.img} title={it.title} beforeLabel={t("before")} afterLabel={t("after")} />
          ))}
        </div>
      </div>
    </section>
    </>
  );
}

function BeforeAfter({ img, title, beforeLabel, afterLabel }: { img: string; title: string; beforeLabel: string; afterLabel: string }) {
  const [pos, setPos] = useState(55);
  return (
    <figure className="group overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative aspect-[4/5] w-full overflow-hidden select-none">
        {/* Before layer (desaturated) */}
        <img src={img} alt="before" loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={{ filter: "grayscale(1) brightness(0.75) contrast(0.95)" }} />
        {/* After layer (revealed by slider) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <img src={img} alt="after" loading="lazy" className="h-full w-full object-cover" style={{ width: `${(100/pos)*100}%`, minWidth: "100%" }} />
        </div>
        {/* Handle */}
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
          <div className="h-full w-0.5 bg-[color:var(--gold)]" />
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full border-2 border-[color:var(--gold)] bg-background grid place-items-center text-xs">↔</div>
        </div>
        <span className="absolute top-3 left-3 rounded-md bg-black/70 text-white text-[10px] font-semibold tracking-widest uppercase px-2 py-1">{beforeLabel}</span>
        <span className="absolute top-3 right-3 rounded-md bg-[color:var(--gold)] text-black text-[10px] font-semibold tracking-widest uppercase px-2 py-1">{afterLabel}</span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={e => setPos(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          aria-label={`${beforeLabel} / ${afterLabel}`}
        />
      </div>
      <figcaption className="p-4 text-sm font-semibold">{title}</figcaption>
    </figure>
  );
}
