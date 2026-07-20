import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "รีวิวลูกค้า – Captain Barber" },
      { name: "description", content: "อ่านรีวิวจากลูกค้าจริงของ Captain Barber ร้านตัดผมชายมืออาชีพ คะแนน 5 ดาว บริการเป็นกันเอง" },
      { property: "og:title", content: "รีวิวลูกค้า – Captain Barber" },
      { property: "og:description", content: "รีวิวจริงจากลูกค้าประจำ" },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: Reviews,
});

const reviews = [
  { name: "ธนกฤต ศรีจันทร์", role: "นักศึกษา", stars: 5, text: "ตัด Fade ที่นี่เนี้ยบมาก ช่างใส่ใจดีเทลทุกจุด บริการเป็นกันเอง ราคาไม่แพง กลับมาตัดประจำแล้วครับ" },
  { name: "พีระพัฒน์ ทองดี", role: "พนักงานออฟฟิศ", stars: 5, text: "ร้านสะอาด แอร์เย็น ช่างแนะนำทรงเหมาะกับหน้ามาก ตัดจบใน 30 นาที ประทับใจสุดๆ" },
  { name: "ศุภณัฐ วงศ์ไทย", role: "ลูกค้าประจำ", stars: 5, text: "มาตัดประจำ 2 ปีแล้ว ไม่เคยผิดหวัง จองคิวง่ายผ่าน LINE ทีมช่างเป็นกันเองมากครับ" },
  { name: "อนุชา ใจดี", role: "อาจารย์", stars: 5, text: "พาลูกชายมาตัดครั้งแรก เด็กประทับใจ ช่างใจเย็นดูแลดี ตอนนี้มาประจำทั้งพ่อทั้งลูก" },
  { name: "กฤษณะ สมบัติ", role: "ฟรีแลนซ์", stars: 5, text: "ย้อมสีที่นี่โทนสวยตรงปกจริง ช่างปรึกษาก่อนย้อมละเอียดมาก ราคาโอเคเลย" },
  { name: "ปิยะวัฒน์ อารีย์", role: "นักเรียน ม.ปลาย", stars: 5, text: "ตัด Skin Fade ครั้งแรกก็ปังเลย เพื่อนถามกันใหญ่ตัดที่ไหน แนะนำ Captain Barber ครับ" },
  { name: "จิรายุ พิพัฒน์", role: "พนักงาน", stars: 5, text: "ราคาถูก คุณภาพเกินราคา ช่างกัปตันเก่งมาก จองคิวออนไลน์สะดวก" },
  { name: "ภัทรพล เจริญ", role: "ผู้จัดการ", stars: 5, text: "บริการ VIP เยี่ยม มีเครื่องดื่มต้อนรับ ตัดเสร็จหน้าใหม่พร้อมประชุมเลย" },
];

function Reviews() {
  const { t } = useI18n();
  const [idx, setIdx] = useState(0);
  const featured = reviews.slice(0, 5);

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % featured.length), 5500);
    return () => clearInterval(id);
  }, [featured.length]);

  return (
    <>
      <section className="section-y">
        <div className="container-x">
          <SectionHeader eyebrow="Testimonials" title={t("reviews.title")} sub={t("reviews.sub")} />

          {/* Slider */}
          <div className="mt-12 relative mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 md:p-12">
            <div className="flex justify-center gap-0.5 text-[color:var(--gold)]">
              {Array.from({length: featured[idx].stars}).map((_,i) => <Star key={i} className="h-5 w-5 fill-current" />)}
            </div>
            <blockquote className="mt-6 text-center text-lg md:text-xl leading-relaxed text-foreground/90">
              "{featured[idx].text}"
            </blockquote>
            <div className="mt-6 text-center">
              <div className="font-bold">{featured[idx].name}</div>
              <div className="text-sm text-muted-foreground">{featured[idx].role}</div>
            </div>
            <div className="mt-8 flex items-center justify-center gap-4">
              <button onClick={() => setIdx(i => (i - 1 + featured.length) % featured.length)} className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-secondary" aria-label="Prev"><ChevronLeft className="h-5 w-5" /></button>
              <div className="flex gap-1.5">
                {featured.map((_, i) => (
                  <button key={i} onClick={() => setIdx(i)} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-[color:var(--gold)]" : "w-1.5 bg-border"}`} aria-label={`Slide ${i + 1}`} />
                ))}
              </div>
              <button onClick={() => setIdx(i => (i + 1) % featured.length)} className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-secondary" aria-label="Next"><ChevronRight className="h-5 w-5" /></button>
            </div>
          </div>

          {/* Grid */}
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <blockquote key={i} className="rounded-xl border border-border bg-card p-6">
                <div className="flex gap-0.5 text-[color:var(--gold)]">
                  {Array.from({length: r.stars}).map((_,i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-3 text-sm text-foreground/90 leading-relaxed">"{r.text}"</p>
                <footer className="mt-4">
                  <div className="text-sm font-bold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
