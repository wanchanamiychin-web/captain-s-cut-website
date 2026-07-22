import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Phone, MessageCircle, Facebook, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "จองคิว – Captain Barber" },
      { name: "description", content: "จองคิวตัดผมออนไลน์กับ Captain Barber เลือกวัน เวลา และบริการที่คุณต้องการ ทีมงานยืนยันคิวภายใน 30 นาที" },
      { property: "og:title", content: "จองคิว – Captain Barber" },
      { property: "og:description", content: "จองคิวตัดผมออนไลน์ สะดวก รวดเร็ว" },
      { property: "og:url", content: "/booking" },
    ],
    links: [{ rel: "canonical", href: "/booking" }],
  }),
  component: Booking,
});

const schema = z.object({
  name: z.string().trim().min(2, "กรุณากรอกชื่อ").max(80),
  phone: z.string().trim().regex(/^0[0-9]{8,9}$/, "เบอร์โทรไม่ถูกต้อง"),
  date: z.string().min(1, "กรุณาเลือกวันที่"),
  time: z.string().min(1, "กรุณาเลือกเวลา"),
  service: z.string().min(1, "กรุณาเลือกบริการ"),
  note: z.string().max(300).optional(),
});

const services = [
  "ตัดผมเด็ก (80฿)",
  "ตัดผมผู้ใหญ่ (100฿)",
  "Fade / Skin Fade (150฿)",
  "โกนหนวด (80฿)",
  "เซ็ตผม (60฿)",
  "ย้อมสี (100-300฿)",
];

const times = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"];

function Booking() {
  const { t } = useI18n();
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd) as Record<string,string>;
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string,string> = {};
      for (const issue of result.error.issues) errs[issue.path[0] as string] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setDone(true);
    e.currentTarget.reset();
    setTimeout(() => setDone(false), 6000);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
    <PageHero eyebrow="Reservation" title={t("booking.title")} sub={t("booking.sub")} />
    <section className="section-y">
      <div className="container-x">

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-5">
            {done && (
              <div className="flex items-start gap-3 rounded-lg border border-[color:var(--gold)]/50 bg-[color:var(--gold)]/10 p-4 text-sm">
                <CheckCircle2 className="h-5 w-5 text-[color:var(--gold)] shrink-0 mt-0.5" />
                <div>{t("booking.success")}</div>
              </div>
            )}

            <Field label={t("booking.name")} error={errors.name}>
              <input name="name" required maxLength={80} className="input" placeholder="ชื่อ - นามสกุล" />
            </Field>

            <Field label={t("booking.phone")} error={errors.phone}>
              <input name="phone" required inputMode="tel" pattern="0[0-9]{8,9}" maxLength={10} className="input" placeholder="0999999999" />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t("booking.date")} error={errors.date}>
                <input name="date" type="date" required min={today} className="input" />
              </Field>
              <Field label={t("booking.time")} error={errors.time}>
                <select name="time" required className="input" defaultValue="">
                  <option value="" disabled>เลือกเวลา</option>
                  {times.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </Field>
            </div>

            <Field label={t("booking.service")} error={errors.service}>
              <select name="service" required className="input" defaultValue="">
                <option value="" disabled>เลือกบริการ</option>
                {services.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>

            <Field label={t("booking.note")}>
              <textarea name="note" rows={3} maxLength={300} className="input" placeholder="ระบุทรงที่ต้องการ หรือรายละเอียดเพิ่มเติม" />
            </Field>

            <button type="submit" className="btn-gold w-full rounded-md px-6 py-3 text-sm font-bold">{t("booking.submit")}</button>
          </form>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-bold">ช่องทางติดต่อด่วน</h3>
              <p className="mt-1 text-sm text-muted-foreground">สะดวกช่องทางไหน เลือกได้เลย ทีมงานตอบไว</p>
              <div className="mt-5 space-y-3">
                <a href="tel:0999999999" className="btn-gold rounded-md px-4 py-3 text-sm font-semibold inline-flex w-full items-center justify-center gap-2"><Phone className="h-4 w-4" /> โทร 099-999-9999</a>
                <a href="https://line.me/R/ti/p/@captainbarber" target="_blank" rel="noopener" className="rounded-md bg-[#06C755] text-white px-4 py-3 text-sm font-semibold inline-flex w-full items-center justify-center gap-2 hover:opacity-90"><MessageCircle className="h-4 w-4" /> LINE @captainbarber</a>
                <a href="https://facebook.com/captainbarber" target="_blank" rel="noopener" className="rounded-md bg-[#1877F2] text-white px-4 py-3 text-sm font-semibold inline-flex w-full items-center justify-center gap-2 hover:opacity-90"><Facebook className="h-4 w-4" /> Messenger</a>
              </div>
            </div>
            <div className="rounded-2xl border border-[color:var(--gold)]/40 bg-gradient-to-br from-[color:var(--gold)]/10 to-transparent p-6">
              <h3 className="font-bold">เวลาทำการ</h3>
              <p className="mt-1 text-sm text-muted-foreground">เปิดทุกวัน 09:00 - 20:00</p>
              <p className="mt-3 text-xs text-muted-foreground">*กรุณาจองล่วงหน้าอย่างน้อย 2 ชั่วโมง เพื่อความสะดวกในการรอคิว</p>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid var(--color-border);
          background: color-mix(in oklab, var(--color-background) 90%, transparent);
          padding: 0.7rem 0.9rem;
          font-size: 0.925rem;
          color: var(--color-foreground);
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .input:focus { border-color: var(--gold); box-shadow: 0 0 0 3px color-mix(in oklab, var(--gold) 25%, transparent); }
        .input::placeholder { color: var(--color-muted-foreground); }
      `}</style>
    </section>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground/90">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
