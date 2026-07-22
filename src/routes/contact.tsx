import { createFileRoute } from "@tanstack/react-router";
import { Phone, MapPin, Clock, MessageCircle, Facebook } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "ติดต่อร้าน – Captain Barber" },
      { name: "description", content: "ที่อยู่ร้าน Captain Barber 99 ถนนสุขุมวิท โทร 099-999-9999 เปิดทุกวัน 09:00-20:00 พร้อมแผนที่ Google Maps" },
      { property: "og:title", content: "ติดต่อร้าน Captain Barber" },
      { property: "og:description", content: "แผนที่ ที่อยู่ เบอร์โทร LINE Facebook" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useI18n();
  return (
    <>
    <PageHero eyebrow="Get in touch" title={t("contact.title")} sub={t("contact.sub")} />
    <section className="section-y">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <InfoRow icon={<MapPin />} label="Address" value={t("contact.address")} />
            <InfoRow icon={<Clock />} label={t("contact.hours.label")} value={t("contact.hours.value")} />
            <InfoRow icon={<Phone />} label={t("contact.phone.label")} value="099-999-9999" href="tel:0999999999" />
            <InfoRow icon={<MessageCircle />} label={t("contact.line.label")} value="@captainbarber" href="https://line.me/R/ti/p/@captainbarber" />
            <InfoRow icon={<Facebook />} label={t("contact.fb.label")} value="Captain Barber" href="https://facebook.com/captainbarber" />

            <div className="flex flex-wrap gap-3 pt-3">
              <a href="tel:0999999999" className="btn-gold rounded-md px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2"><Phone className="h-4 w-4" />{t("cta.call")}</a>
              <a href="https://line.me/R/ti/p/@captainbarber" target="_blank" rel="noopener" className="rounded-md bg-[#06C755] text-white px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2 hover:opacity-90 transition"><MessageCircle className="h-4 w-4" />{t("cta.line")}</a>
              <a href="https://facebook.com/captainbarber" target="_blank" rel="noopener" className="rounded-md bg-[#1877F2] text-white px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2 hover:opacity-90 transition"><Facebook className="h-4 w-4" />Messenger</a>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-card min-h-[360px]">
            <iframe
              title="Captain Barber Map"
              src="https://www.google.com/maps?q=20.239799,99.682589&z=17&output=embed"
              width="100%"
              height="100%"
              className="h-full min-h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

function InfoRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const inner = (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-5 hover:border-[color:var(--gold)]/60 transition">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[color:var(--gold)]/15 text-[color:var(--gold)]">{icon}</div>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="mt-0.5 font-semibold break-words">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="block">{inner}</a> : inner;
}
