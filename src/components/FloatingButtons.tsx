import { useEffect, useState } from "react";
import { Phone, MessageCircle, ArrowUp } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function FloatingButtons() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3">
      <a
        href="https://line.me/R/ti/p/@captainbarber"
        target="_blank"
        rel="noopener"
        aria-label={t("cta.line")}
        className="grid h-12 w-12 place-items-center rounded-full shadow-lg text-white transition hover:scale-105"
        style={{ backgroundColor: "#06C755" }}
      >
        <MessageCircle className="h-5 w-5" />
      </a>
      <a
        href="tel:0999999999"
        aria-label={t("cta.call")}
        className="grid h-12 w-12 place-items-center rounded-full shadow-lg btn-gold"
      >
        <Phone className="h-5 w-5" />
      </a>
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={t("backtotop")}
          className="grid h-12 w-12 place-items-center rounded-full border border-border bg-background/90 backdrop-blur shadow-lg hover:bg-secondary transition"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
