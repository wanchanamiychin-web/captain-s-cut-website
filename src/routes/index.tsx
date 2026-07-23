import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Scissors, Sparkles, Wind, BadgePercent, Star, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import hero from "@/assets/hero-shop.jpg";
import fade from "@/assets/service-fade.jpg";
import shave from "@/assets/service-shave.jpg";
import style from "@/assets/service-style.jpg";
import color from "@/assets/service-color.jpg";
import p1 from "@/assets/portrait-1.jpg";
import p2 from "@/assets/portrait-2.jpg";
import p3 from "@/assets/portrait-3.jpg";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "@/components/SectionHeader";
import { supabase } from "@/integrations/supabase/client";

// Seed baseline so the stat isn't empty when there are few DB reviews
const SEED_COUNT = 8;
const SEED_SUM = 8 * 5;


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "กัปตัน Barber (Captain Barber) – ร้านตัดผมชายสไตล์ Modern Classic" },
      { name: "description", content: "Captain Barber ร้านตัดผมชายเชี่ยวชาญทรง Fade บริการ VIP ห้องแอร์ ราคาเริ่มต้น 80 บาท จองคิวออนไลน์ได้ทันที" },
      { property: "og:title", content: "กัปตัน Barber (Captain Barber)" },
      { property: "og:description", content: "ร้านตัดผมชายสไตล์ Modern Classic เชี่ยวชาญ Fade จองคิวออนไลน์ได้" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const { t } = useI18n();
  const [dbCount, setDbCount] = useState(0);
  const [dbSum, setDbSum] = useState(0);

  useEffect(() => {
    let mounted = true;
    supabase.from("reviews").select("stars").then(({ data }) => {
      if (!mounted || !data) return;
      setDbCount(data.length);
      setDbSum(data.reduce((s, r: { stars: number }) => s + (r.stars || 0), 0));
    });
    const channel = supabase
      .channel("reviews-stats")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "reviews" }, (payload) => {
        const stars = (payload.new as { stars?: number }).stars || 0;
        setDbCount(c => c + 1);
        setDbSum(s => s + stars);
      })
      .subscribe();
    return () => { mounted = false; supabase.removeChannel(channel); };
  }, []);

  const totalCount = dbCount + SEED_COUNT;
  const avg = (dbSum + SEED_SUM) / totalCount;
  const avgLabel = `${avg.toFixed(1)}★`;

  return (

    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img src={hero} alt="Captain Barber interior" width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background" />
        <div className="container-x relative flex min-h-[88vh] flex-col justify-center py-20 text-white">
          <p className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-[color:var(--gold)] reveal">
            EST. 2020 · Classic × Modern
          </p>
          <h1 className="mt-4 text-5xl md:text-7xl font-extrabold leading-[1.05] reveal" style={{ animationDelay: "0.05s" }}>
            <span className="block">กัปตัน</span>
            <span className="block gold-gradient">Barber</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg md:text-xl text-white/85 reveal" style={{ animationDelay: "0.15s" }}>
            {t("hero.sub")}
          </p>
          <p className="mt-3 max-w-xl text-sm md:text-base text-white/65 reveal" style={{ animationDelay: "0.2s" }}>
            {t("hero.desc")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 reveal" style={{ animationDelay: "0.3s" }}>
            <a href="https://lin.ee/O6ACLP4" target="_blank" rel="noopener" className="btn-gold rounded-md px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
              {t("cta.book")} <ArrowRight className="h-4 w-4" />
            </a>
            <a href="tel:0999999999" className="btn-outline-gold rounded-md px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
              <Phone className="h-4 w-4" /> {t("cta.call")}
            </a>
            <a href="https://line.me/R/ti/p/@captainbarber" target="_blank" rel="noopener" className="rounded-md bg-[#06C755] text-white px-6 py-3 text-sm font-semibold inline-flex items-center gap-2 hover:opacity-90 transition">
              <MessageCircle className="h-4 w-4" /> {t("cta.line")}
            </a>
          </div>

          <div className="mt-14 grid max-w-3xl grid-cols-3 gap-4 border-t border-white/10 pt-8">
            <Stat n="4+" l={t("about.p1").length ? "ปี / Years" : ""} label="ปี / Years" />
            <Stat n="5K+" label="ลูกค้า / Clients" />
            <Stat n="4.9★" label="Google Reviews" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeader eyebrow="Why Us" title={t("features.title")} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Feature icon={<Scissors />} title={t("features.f1.t")} desc={t("features.f1.d")} />
            <Feature icon={<Sparkles />} title={t("features.f2.t")} desc={t("features.f2.d")} />
            <Feature icon={<Wind />} title={t("features.f3.t")} desc={t("features.f3.d")} />
            <Feature icon={<BadgePercent />} title={t("features.f4.t")} desc={t("features.f4.d")} />
          </div>
        </div>
      </section>

      {/* POPULAR SERVICES */}
      <section className="section-y bg-secondary/30">
        <div className="container-x">
          <SectionHeader eyebrow="Services" title={t("services.title")} sub={t("services.sub")} />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <ServiceCard img={fade} title="Fade / Skin Fade" price="150 ฿" />
            <ServiceCard img={style} title="ตัดผมผู้ใหญ่ / Adult Cut" price="100 ฿" />
            <ServiceCard img={shave} title="โกนหนวด / Shave" price="80 ฿" />
            <ServiceCard img={color} title="ย้อมสี / Hair Color" price="100–300 ฿" />
          </div>
          <div className="mt-10 text-center">
            <Link to="/services" className="btn-outline-gold rounded-md px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
              ดูบริการทั้งหมด <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER TEASER */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeader eyebrow="Portfolio" title={t("gallery.title")} sub={t("gallery.sub")} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[{a:p1,t:"Mid Fade"},{a:p2,t:"Side Part"},{a:p3,t:"Executive Undercut"}].map((it, i) => (
              <figure key={i} className="group relative overflow-hidden rounded-xl border border-border">
                <img src={it.a} alt={it.t} width={912} height={1200} loading="lazy" className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5">
                  <p className="text-xs tracking-widest text-[color:var(--gold)] uppercase">Signature</p>
                  <p className="text-lg font-semibold text-white">{it.t}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/gallery" className="btn-outline-gold rounded-md px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
              ดูผลงานทั้งหมด <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* REVIEWS TEASER */}
      <section className="section-y bg-secondary/30">
        <div className="container-x">
          <SectionHeader eyebrow="Reviews" title={t("reviews.title")} sub={t("reviews.sub")} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reviewsShort.map((r, i) => (
              <blockquote key={i} className="rounded-xl border border-border bg-card p-6">
                <div className="flex gap-0.5 text-[color:var(--gold)]">
                  {Array.from({length:5}).map((_,i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-3 text-sm text-foreground/90 leading-relaxed">"{r.text}"</p>
                <footer className="mt-4 text-sm font-semibold">{r.name}</footer>
              </blockquote>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/reviews" className="btn-outline-gold rounded-md px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
              อ่านรีวิวทั้งหมด <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PROMO */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeader eyebrow="Special Offer" title={t("promo.title")} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { t: t("promo.card1.t"), d: t("promo.card1.d") },
              { t: t("promo.card2.t"), d: t("promo.card2.d") },
              { t: t("promo.card3.t"), d: t("promo.card3.d") },
            ].map((p, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl border border-[color:var(--gold)]/40 bg-gradient-to-br from-[color:var(--gold)]/10 to-transparent p-6">
                <BadgePercent className="h-8 w-8 text-[color:var(--gold)]" />
                <h3 className="mt-3 text-lg font-bold">{p.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-y bg-[color:var(--ink)] text-cream">
        <div className="container-x text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold">พร้อมเปลี่ยนลุคใหม่กับ <span className="gold-gradient">Captain Barber</span>?</h2>
          <p className="mt-4 text-cream/70 max-w-xl mx-auto">จองคิวออนไลน์ล่วงหน้า หรือโทรได้เลย ไม่ต้องรอนาน</p>
          <div className="mt-8 flex justify-center flex-wrap gap-3">
            <a href="https://lin.ee/O6ACLP4" target="_blank" rel="noopener" className="btn-gold rounded-md px-8 py-3 text-sm font-semibold">{t("cta.book")}</a>
            <a href="tel:0999999999" className="btn-outline-gold rounded-md px-8 py-3 text-sm font-semibold">{t("cta.call")}</a>
          </div>
        </div>
      </section>
    </>
  );
}

const reviewsShort = [
  { name: "คุณธนกฤต", text: "ตัด Fade ที่นี่เนี้ยบมาก ช่างใส่ใจดีเทลทุกจุด บริการเป็นกันเอง ราคาไม่แพง" },
  { name: "คุณพีระพัฒน์", text: "ร้านสะอาด แอร์เย็น ช่างแนะนำทรงให้เหมาะกับหน้าเรามาก ตัดจบใน 30 นาที" },
  { name: "คุณศุภณัฐ", text: "มาตัดประจำ 2 ปีแล้ว ไม่เคยผิดหวัง จองคิวง่ายผ่าน LINE" },
];

function Stat({ n, label }: { n: string; l?: string; label: string }) {
  return (
    <div>
      <div className="text-3xl md:text-4xl font-extrabold gold-gradient">{n}</div>
      <div className="mt-1 text-xs md:text-sm text-white/60">{label}</div>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 transition hover:border-[color:var(--gold)]/60 hover:-translate-y-1 duration-300">
      <div className="grid h-12 w-12 place-items-center rounded-lg bg-[color:var(--gold)]/15 text-[color:var(--gold)]">{icon}</div>
      <h3 className="mt-4 font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

function ServiceCard({ img, title, price }: { img: string; title: string; price: string }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={img} alt={title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold">{title}</h3>
          <span className="text-[color:var(--gold)] font-bold">{price}</span>
        </div>
      </div>
    </div>
  );
}
