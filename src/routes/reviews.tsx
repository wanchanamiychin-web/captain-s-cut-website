import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, MessageCircle, Facebook, MapPin, Send, CheckCircle2 } from "lucide-react";
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

          <WriteReview />
        </div>
      </section>
    </>
  );
}

function WriteReview() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [hover, setHover] = useState(0);
  const [sent, setSent] = useState(false);

  const buildMessage = () => {
    const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
    return `รีวิว Captain Barber\nชื่อ: ${name || "-"}\nคะแนน: ${stars} (${rating}/5)\nความเห็น: ${text || "-"}`;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const msg = buildMessage();
    try {
      await navigator.clipboard.writeText(msg);
    } catch { /* ignore */ }
    window.open("https://lin.ee/O6ACLP4", "_blank", "noopener");
    setSent(true);
    setTimeout(() => setSent(false), 8000);
    setName(""); setText(""); setRating(5);
  };

  return (
    <div className="mt-20 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div className="rounded-2xl border border-[color:var(--gold)]/40 bg-gradient-to-br from-[color:var(--gold)]/10 to-transparent p-6 md:p-8">
        <div className="text-xs uppercase tracking-widest text-[color:var(--gold)] font-semibold">Share your experience</div>
        <h3 className="mt-2 text-2xl md:text-3xl font-extrabold">อยากบอกอะไรกับเรา?</h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          รีวิวของคุณช่วยให้ทีมพัฒนาบริการได้ดียิ่งขึ้น เลือกช่องทางที่สะดวก หรือกรอกฟอร์มด้านขวาแล้วส่งตรงถึงช่างกัปตันผ่าน LINE
        </p>
        <div className="mt-6 space-y-3">
          <a href="https://www.google.com/search?q=Captain+Barber+ร้านตัดผม+รีวิว" target="_blank" rel="noopener"
             className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-white text-black border border-border px-4 py-3 text-sm font-semibold hover:bg-secondary transition">
            <MapPin className="h-4 w-4 text-[#EA4335]" /> รีวิวบน Google Maps
          </a>
          <a href="https://www.facebook.com/captainbarber/reviews" target="_blank" rel="noopener"
             className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#1877F2] text-white px-4 py-3 text-sm font-semibold hover:opacity-90 transition">
            <Facebook className="h-4 w-4" /> รีวิวบน Facebook
          </a>
          <a href="https://lin.ee/O6ACLP4" target="_blank" rel="noopener"
             className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#06C755] text-white px-4 py-3 text-sm font-semibold hover:opacity-90 transition">
            <MessageCircle className="h-4 w-4" /> ส่งรีวิวผ่าน LINE
          </a>
        </div>
      </div>

      <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-5">
        {sent && (
          <div className="flex items-start gap-3 rounded-lg border border-[color:var(--gold)]/50 bg-[color:var(--gold)]/10 p-4 text-sm">
            <CheckCircle2 className="h-5 w-5 text-[color:var(--gold)] shrink-0 mt-0.5" />
            <div>ขอบคุณสำหรับรีวิว! เราคัดลอกข้อความไว้ให้แล้ว วาง (paste) ลงในแชท LINE ที่เปิดขึ้นได้เลย</div>
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-medium">ชื่อของคุณ</label>
          <input value={name} onChange={e => setName(e.target.value)} required maxLength={80}
                 className="w-full rounded-lg border border-border bg-background/90 px-3.5 py-2.5 text-sm outline-none focus:border-[color:var(--gold)]"
                 placeholder="ชื่อ - นามสกุล" />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">ให้คะแนน</label>
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(n => (
              <button key={n} type="button"
                      onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)}
                      onClick={() => setRating(n)}
                      aria-label={`${n} stars`}
                      className="p-1">
                <Star className={`h-7 w-7 transition ${n <= (hover || rating) ? "fill-[color:var(--gold)] text-[color:var(--gold)]" : "text-border"}`} />
              </button>
            ))}
            <span className="ml-2 text-sm text-muted-foreground">{rating}/5</span>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">ความเห็นของคุณ</label>
          <textarea value={text} onChange={e => setText(e.target.value)} required rows={4} maxLength={500}
                    className="w-full rounded-lg border border-border bg-background/90 px-3.5 py-2.5 text-sm outline-none focus:border-[color:var(--gold)]"
                    placeholder="เล่าประสบการณ์การใช้บริการของคุณ..." />
        </div>

        <button type="submit" className="btn-gold w-full rounded-md px-6 py-3 text-sm font-bold inline-flex items-center justify-center gap-2">
          <Send className="h-4 w-4" /> ส่งรีวิว
        </button>
        <p className="text-xs text-muted-foreground text-center">
          กดส่งเพื่อคัดลอกรีวิว แล้วเปิดแชท LINE @captainbarber อัตโนมัติ
        </p>
      </form>
    </div>
  );
}

