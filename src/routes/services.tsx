import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import fade from "@/assets/service-fade.jpg";
import shave from "@/assets/service-shave.jpg";
import style from "@/assets/service-style.jpg";
import color from "@/assets/service-color.jpg";
import { useI18n } from "@/lib/i18n";
import { PageHero } from "@/components/PageHero";


export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "บริการและราคา – Captain Barber" },
      { name: "description", content: "บริการตัดผมชาย ทรง Fade รองทรง โกนหนวด ย้อมสี เซ็ตผม พร้อมราคาโปร่งใส เริ่มต้น 80 บาท" },
      { property: "og:title", content: "บริการและราคา – Captain Barber" },
      { property: "og:description", content: "บริการครบวงจรร้านตัดผมชาย พร้อมราคาที่โปร่งใส" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

const services = [
  { img: fade,  th: "ตัดผมเด็ก",   en: "Kids Haircut",     price: "80 ฿",    features: ["อายุไม่เกิน 12 ปี", "รวมสระผม", "ให้คำแนะนำทรงเหมาะกับเด็ก"] },
  { img: style, th: "ตัดผมผู้ใหญ่", en: "Adult Haircut",    price: "100 ฿",   features: ["รวมสระผม + เซ็ต", "แนะนำทรงเฉพาะบุคคล", "ใช้เวลา ~30 นาที"] },
  { img: fade,  th: "Fade / Skin Fade", en: "Fade Cut",     price: "150 ฿",   features: ["ไล่ระดับเป๊ะทุกเส้น", "Low / Mid / High Fade", "เชี่ยวชาญพิเศษ"] },
  { img: shave, th: "โกนหนวด",     en: "Beard Shave",      price: "80 ฿",    features: ["ผ้าร้อน + Aftershave", "ตกแต่งทรงหนวด", "ผ่อนคลาย 20 นาที"] },
  { img: style, th: "เซ็ตผม",       en: "Hair Styling",     price: "60 ฿",   features: ["ใช้ผลิตภัณฑ์นำเข้า", "Pomade / Wax / Clay", "พร้อมออกงาน"] },
  { img: color, th: "ย้อมสีผม",    en: "Hair Color",       price: "100–300 ฿", features: ["สีเบสิก / สีแฟชั่น", "รวมสระผม", "ปรึกษาโทนสีก่อนย้อม"] },
];

function Services() {
  const { t } = useI18n();
  return (
    <>
      <PageHero eyebrow="Menu" title={t("services.title")} sub={t("services.sub")} />
      <section className="section-y">
        <div className="container-x">
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <article key={i} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:border-[color:var(--gold)]/60 hover:-translate-y-1 duration-300">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.img} alt={s.th} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-bold text-lg">{s.th}</h3>
                      <p className="text-xs text-muted-foreground">{s.en}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-[color:var(--gold)]/15 text-[color:var(--gold)] px-3 py-1 text-sm font-bold">{s.price}</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-foreground/85">
                    {s.features.map((f, k) => (
                      <li key={k} className="flex gap-2"><Check className="h-4 w-4 mt-0.5 text-[color:var(--gold)] shrink-0" />{f}</li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-4 border-t border-border">
                    <a href="https://lin.ee/O6ACLP4" target="_blank" rel="noopener" className="btn-outline-gold w-full inline-flex justify-center rounded-md px-4 py-2 text-sm font-semibold">{t("cta.book")}</a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-muted-foreground">*ราคาอาจปรับตามความยากของทรงและระยะเวลาบริการ</p>
        </div>
      </section>
    </>
  );
}
