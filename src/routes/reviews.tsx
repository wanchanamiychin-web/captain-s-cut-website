import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "@/components/SectionHeader";
import { supabase } from "@/integrations/supabase/client";

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

type Review = {
  id: string;
  name: string;
  role: string | null;
  stars: number;
  text: string;
  created_at: string;
};

const seedReviews: Review[] = [
  { id: "s1", name: "ธนกฤต ศรีจันทร์", role: "นักศึกษา", stars: 5, text: "ตัด Fade ที่นี่เนี้ยบมาก ช่างใส่ใจดีเทลทุกจุด บริการเป็นกันเอง ราคาไม่แพง กลับมาตัดประจำแล้วครับ", created_at: "" },
  { id: "s2", name: "พีระพัฒน์ ทองดี", role: "พนักงานออฟฟิศ", stars: 5, text: "ร้านสะอาด แอร์เย็น ช่างแนะนำทรงเหมาะกับหน้ามาก ตัดจบใน 30 นาที ประทับใจสุดๆ", created_at: "" },
  { id: "s3", name: "ศุภณัฐ วงศ์ไทย", role: "ลูกค้าประจำ", stars: 5, text: "มาตัดประจำ 2 ปีแล้ว ไม่เคยผิดหวัง จองคิวง่ายผ่าน LINE ทีมช่างเป็นกันเองมากครับ", created_at: "" },
  { id: "s4", name: "อนุชา ใจดี", role: "อาจารย์", stars: 5, text: "พาลูกชายมาตัดครั้งแรก เด็กประทับใจ ช่างใจเย็นดูแลดี ตอนนี้มาประจำทั้งพ่อทั้งลูก", created_at: "" },
  { id: "s5", name: "กฤษณะ สมบัติ", role: "ฟรีแลนซ์", stars: 5, text: "ย้อมสีที่นี่โทนสวยตรงปกจริง ช่างปรึกษาก่อนย้อมละเอียดมาก ราคาโอเคเลย", created_at: "" },
  { id: "s6", name: "ปิยะวัฒน์ อารีย์", role: "นักเรียน ม.ปลาย", stars: 5, text: "ตัด Skin Fade ครั้งแรกก็ปังเลย เพื่อนถามกันใหญ่ตัดที่ไหน แนะนำ Captain Barber ครับ", created_at: "" },
  { id: "s7", name: "จิรายุ พิพัฒน์", role: "พนักงาน", stars: 5, text: "ราคาถูก คุณภาพเกินราคา ช่างกัปตันเก่งมาก จองคิวออนไลน์สะดวก", created_at: "" },
  { id: "s8", name: "ภัทรพล เจริญ", role: "ผู้จัดการ", stars: 5, text: "บริการ VIP เยี่ยม มีเครื่องดื่มต้อนรับ ตัดเสร็จหน้าใหม่พร้อมประชุมเลย", created_at: "" },
];

function Reviews() {
  const { t } = useI18n();
  const [idx, setIdx] = useState(0);
  const [dbReviews, setDbReviews] = useState<Review[]>([]);

  useEffect(() => {
    let mounted = true;
    supabase.from("reviews").select("*").order("created_at", { ascending: false }).limit(50)
      .then(({ data }) => { if (mounted && data) setDbReviews(data as Review[]); });

    const channel = supabase
      .channel("reviews-feed")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "reviews" }, (payload) => {
        setDbReviews(prev => [payload.new as Review, ...prev]);
      })
      .subscribe();

    return () => { mounted = false; supabase.removeChannel(channel); };
  }, []);

  const reviews = [...dbReviews, ...seedReviews];
  const featured = reviews.slice(0, Math.max(5, Math.min(dbReviews.length + 3, 8)));

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % featured.length), 5500);
    return () => clearInterval(id);
  }, [featured.length]);

  const current = featured[idx] ?? featured[0];

  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHeader eyebrow="Testimonials" title={t("reviews.title")} sub={t("reviews.sub")} />

        {current && (
          <div className="mt-12 relative mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 md:p-12">
            <div className="flex justify-center gap-0.5 text-[color:var(--gold)]">
              {Array.from({length: current.stars}).map((_,i) => <Star key={i} className="h-5 w-5 fill-current" />)}
            </div>
            <blockquote className="mt-6 text-center text-lg md:text-xl leading-relaxed text-foreground/90">
              "{current.text}"
            </blockquote>
            <div className="mt-6 text-center">
              <div className="font-bold">{current.name}</div>
              {current.role && <div className="text-sm text-muted-foreground">{current.role}</div>}
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
        )}

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <blockquote key={r.id} className="rounded-xl border border-border bg-card p-6">
              <div className="flex gap-0.5 text-[color:var(--gold)]">
                {Array.from({length: r.stars}).map((_,i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-3 text-sm text-foreground/90 leading-relaxed">"{r.text}"</p>
              <footer className="mt-4">
                <div className="text-sm font-bold">{r.name}</div>
                {r.role && <div className="text-xs text-muted-foreground">{r.role}</div>}
              </footer>
            </blockquote>
          ))}
        </div>

        <WriteReview />
      </div>
    </section>
  );
}

function WriteReview() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [hover, setHover] = useState(0);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setLoading(true);
    setError(null);
    const { error: err } = await supabase.from("reviews").insert({
      name: name.trim().slice(0, 80),
      role: role.trim().slice(0, 80) || null,
      stars: rating,
      text: text.trim().slice(0, 1000),
    });
    setLoading(false);
    if (err) {
      setError("ส่งรีวิวไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
      return;
    }
    setSent(true);
    setTimeout(() => setSent(false), 8000);
    setName(""); setRole(""); setText(""); setRating(5);
  };

  return (
    <div className="mt-20 mx-auto max-w-2xl">
      <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-5">
        {sent && (
          <div className="flex items-start gap-3 rounded-lg border border-[color:var(--gold)]/50 bg-[color:var(--gold)]/10 p-4 text-sm">
            <CheckCircle2 className="h-5 w-5 text-[color:var(--gold)] shrink-0 mt-0.5" />
            <div>ขอบคุณสำหรับรีวิว! รีวิวของคุณขึ้นบนเว็บทันทีแล้ว</div>
          </div>
        )}
        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-medium">ชื่อของคุณ</label>
          <input value={name} onChange={e => setName(e.target.value)} required maxLength={80}
                 className="w-full rounded-lg border border-border bg-background/90 px-3.5 py-2.5 text-sm outline-none focus:border-[color:var(--gold)]"
                 placeholder="ชื่อ - นามสกุล" />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">อาชีพ / บทบาท (ไม่บังคับ)</label>
          <input value={role} onChange={e => setRole(e.target.value)} maxLength={80}
                 className="w-full rounded-lg border border-border bg-background/90 px-3.5 py-2.5 text-sm outline-none focus:border-[color:var(--gold)]"
                 placeholder="เช่น นักศึกษา / พนักงานออฟฟิศ" />
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
          <textarea value={text} onChange={e => setText(e.target.value)} required rows={4} maxLength={1000}
                    className="w-full rounded-lg border border-border bg-background/90 px-3.5 py-2.5 text-sm outline-none focus:border-[color:var(--gold)]"
                    placeholder="เล่าประสบการณ์การใช้บริการของคุณ..." />
        </div>

        <button type="submit" disabled={loading} className="btn-gold w-full rounded-md px-6 py-3 text-sm font-bold inline-flex items-center justify-center gap-2 disabled:opacity-60">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {loading ? "กำลังส่ง..." : "ส่งรีวิว"}
        </button>
        <p className="text-xs text-muted-foreground text-center">
          รีวิวจะปรากฏบนหน้าเว็บทันทีหลังกดส่ง
        </p>
      </form>
    </div>
  );
}
