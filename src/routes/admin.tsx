import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, ShieldCheck, EyeOff, Eye, Trash2, LogOut, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "แผงควบคุมรีวิว – Captain Barber" },
      { name: "description", content: "แผงควบคุมสำหรับผู้ดูแลร้าน Captain Barber เพื่อจัดการและตรวจสอบรีวิวลูกค้า" },
      { property: "og:title", content: "แผงควบคุมรีวิว – Captain Barber" },
      { property: "og:description", content: "จัดการรีวิวลูกค้า" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type Review = {
  id: string;
  name: string;
  role: string | null;
  stars: number;
  text: string;
  created_at: string;
  is_verified: boolean;
  is_visible: boolean;
};

function AdminPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) { navigate({ to: "/auth" }); return; }
      setUserId(data.session.user.id);
      const { data: roleRow } = await supabase
        .from("user_roles").select("role")
        .eq("user_id", data.session.user.id).eq("role", "admin").maybeSingle();
      setIsAdmin(!!roleRow);
      setChecking(false);
    })();
  }, [navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    let mounted = true;
    supabase.from("reviews").select("*").order("created_at", { ascending: false })
      .then(({ data }) => { if (mounted && data) { setReviews(data as Review[]); setLoading(false); } });

    const channel = supabase
      .channel("admin-reviews")
      .on("postgres_changes", { event: "*", schema: "public", table: "reviews" }, (payload) => {
        setReviews(prev => {
          if (payload.eventType === "INSERT") return [payload.new as Review, ...prev];
          if (payload.eventType === "UPDATE") return prev.map(r => r.id === (payload.new as Review).id ? payload.new as Review : r);
          if (payload.eventType === "DELETE") return prev.filter(r => r.id !== (payload.old as Review).id);
          return prev;
        });
      })
      .subscribe();
    return () => { mounted = false; supabase.removeChannel(channel); };
  }, [isAdmin]);

  const toggleVerified = async (r: Review) => {
    setBusyId(r.id);
    // optimistic
    setReviews(prev => prev.map(x => x.id === r.id ? { ...x, is_verified: !x.is_verified } : x));
    const { error } = await supabase.from("reviews").update({ is_verified: !r.is_verified }).eq("id", r.id);
    if (error) setReviews(prev => prev.map(x => x.id === r.id ? { ...x, is_verified: r.is_verified } : x));
    setBusyId(null);
  };

  const toggleVisible = async (r: Review) => {
    setBusyId(r.id);
    setReviews(prev => prev.map(x => x.id === r.id ? { ...x, is_visible: !x.is_visible } : x));
    const { error } = await supabase.from("reviews").update({ is_visible: !r.is_visible }).eq("id", r.id);
    if (error) setReviews(prev => prev.map(x => x.id === r.id ? { ...x, is_visible: r.is_visible } : x));
    setBusyId(null);
  };

  const remove = async (r: Review) => {
    if (!confirm(`ลบรีวิวของ "${r.name}" ถาวร?`)) return;
    setBusyId(r.id);
    const prev = reviews;
    setReviews(reviews.filter(x => x.id !== r.id));
    const { error } = await supabase.from("reviews").delete().eq("id", r.id);
    if (error) { setReviews(prev); alert("ลบไม่สำเร็จ"); }
    setBusyId(null);
  };

  const signOut = async () => { await supabase.auth.signOut(); navigate({ to: "/auth" }); };

  if (checking) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-[color:var(--gold)]" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <>
        <PageHero eyebrow="Admin" title="ไม่มีสิทธิ์เข้าถึง" sub="บัญชีนี้ยังไม่ได้รับสิทธิ์แอดมิน" />
        <section className="section-y">
          <div className="container-x max-w-xl mx-auto text-center">
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <p className="text-sm text-muted-foreground">
                บัญชีของคุณ (User ID: <code className="text-xs">{userId}</code>) ยังไม่ได้รับสิทธิ์แอดมิน
                กรุณาแจ้งเจ้าของร้านเพื่อเพิ่มสิทธิ์ให้บัญชีนี้ใน backend
              </p>
              <button onClick={signOut} className="btn-outline-gold rounded-md px-4 py-2 text-sm font-semibold inline-flex items-center gap-2">
                <LogOut className="h-4 w-4" /> ออกจากระบบ
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Admin" title="แผงควบคุมรีวิว" sub="ตรวจสอบ, ยืนยันตัวตนลูกค้า และซ่อน/ลบรีวิวที่เป็นสแปม" />
      <section className="section-y">
        <div className="container-x">
          <div className="mb-6 flex items-center justify-between gap-3 flex-wrap">
            <div className="text-sm text-muted-foreground">รีวิวทั้งหมด <b className="text-foreground">{reviews.length}</b> · แสดง <b className="text-foreground">{reviews.filter(r => r.is_visible).length}</b> · ซ่อน <b className="text-foreground">{reviews.filter(r => !r.is_visible).length}</b> · ยืนยันแล้ว <b className="text-foreground">{reviews.filter(r => r.is_verified).length}</b></div>
            <button onClick={signOut} className="rounded-md border border-border px-3 py-1.5 text-sm inline-flex items-center gap-2 hover:bg-secondary">
              <LogOut className="h-4 w-4" /> ออกจากระบบ
            </button>
          </div>

          {loading ? (
            <div className="grid place-items-center py-16"><Loader2 className="h-6 w-6 animate-spin text-[color:var(--gold)]" /></div>
          ) : reviews.length === 0 ? (
            <div className="text-center text-muted-foreground py-16">ยังไม่มีรีวิว</div>
          ) : (
            <div className="space-y-4">
              {reviews.map(r => (
                <div key={r.id} className={`rounded-xl border p-5 md:p-6 transition ${r.is_visible ? "border-border bg-card" : "border-destructive/40 bg-destructive/5"}`}>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="font-bold">{r.name}</div>
                        {r.role && <div className="text-xs text-muted-foreground">· {r.role}</div>}
                        {r.is_verified && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 px-2 py-0.5 text-[11px] font-semibold text-emerald-500">
                            <ShieldCheck className="h-3 w-3" /> Verified
                          </span>
                        )}
                        {!r.is_visible && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-destructive/15 border border-destructive/40 px-2 py-0.5 text-[11px] font-semibold text-destructive">
                            <EyeOff className="h-3 w-3" /> Hidden
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex gap-0.5 text-[color:var(--gold)]">
                        {Array.from({length: r.stars}).map((_,i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                      </div>
                      <p className="mt-2 text-sm text-foreground/90 leading-relaxed">"{r.text}"</p>
                      <div className="mt-2 text-[11px] text-muted-foreground">{new Date(r.created_at).toLocaleString("th-TH")}</div>
                    </div>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      <button onClick={() => toggleVerified(r)} disabled={busyId === r.id}
                        className={`rounded-md px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 border transition disabled:opacity-60 ${r.is_verified ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-500" : "border-border hover:border-emerald-500/50 hover:text-emerald-500"}`}>
                        <ShieldCheck className="h-3.5 w-3.5" /> {r.is_verified ? "ยกเลิก Verified" : "Verified"}
                      </button>
                      <button onClick={() => toggleVisible(r)} disabled={busyId === r.id}
                        className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-secondary transition disabled:opacity-60">
                        {r.is_visible ? <><EyeOff className="h-3.5 w-3.5" /> ซ่อน</> : <><Eye className="h-3.5 w-3.5" /> แสดง</>}
                      </button>
                      <button onClick={() => remove(r)} disabled={busyId === r.id}
                        className="rounded-md border border-destructive/50 text-destructive px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-destructive/10 transition disabled:opacity-60">
                        <Trash2 className="h-3.5 w-3.5" /> ลบ
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
