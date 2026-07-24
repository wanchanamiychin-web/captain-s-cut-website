import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, LogIn, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "เข้าสู่ระบบผู้ดูแล – Captain Barber" },
      { name: "description", content: "เข้าสู่ระบบสำหรับผู้ดูแลร้าน Captain Barber เพื่อจัดการรีวิวลูกค้า" },
      { property: "og:title", content: "เข้าสู่ระบบผู้ดูแล – Captain Barber" },
      { property: "og:description", content: "เข้าสู่ระบบสำหรับผู้ดูแลร้าน Captain Barber" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null); setInfo(null);
    if (mode === "signin") {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (err) return setError(err.message);
      navigate({ to: "/admin" });
    } else {
      const { error: err } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setLoading(false);
      if (err) return setError(err.message);
      setInfo("สร้างบัญชีสำเร็จ — เข้าสู่ระบบได้เลย (สิทธิ์แอดมินต้องได้รับจากเจ้าของร้าน)");
      setMode("signin");
    }
  };

  return (
    <>
      <PageHero eyebrow="Admin" title="เข้าสู่ระบบผู้ดูแล" sub="สำหรับเจ้าของร้านและทีมงานเท่านั้น" />
      <section className="section-y">
        <div className="container-x">
          <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="mb-6 flex gap-2 rounded-lg border border-border p-1">
              <button type="button" onClick={() => setMode("signin")}
                className={`flex-1 rounded-md px-3 py-2 text-sm font-semibold transition ${mode === "signin" ? "bg-[color:var(--gold)] text-black" : "text-muted-foreground"}`}>
                เข้าสู่ระบบ
              </button>
              <button type="button" onClick={() => setMode("signup")}
                className={`flex-1 rounded-md px-3 py-2 text-sm font-semibold transition ${mode === "signup" ? "bg-[color:var(--gold)] text-black" : "text-muted-foreground"}`}>
                สมัครสมาชิก
              </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              {error && <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
              {info && <div className="rounded-lg border border-[color:var(--gold)]/50 bg-[color:var(--gold)]/10 p-3 text-sm">{info}</div>}

              <div>
                <label className="mb-1.5 block text-sm font-medium">อีเมล</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full rounded-lg border border-border bg-background/90 px-3.5 py-2.5 text-sm outline-none focus:border-[color:var(--gold)]" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">รหัสผ่าน</label>
                <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)}
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  className="w-full rounded-lg border border-border bg-background/90 px-3.5 py-2.5 text-sm outline-none focus:border-[color:var(--gold)]" />
              </div>

              <button type="submit" disabled={loading}
                className="btn-gold w-full rounded-md px-6 py-3 text-sm font-bold inline-flex items-center justify-center gap-2 disabled:opacity-60">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (mode === "signin" ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />)}
                {mode === "signin" ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
