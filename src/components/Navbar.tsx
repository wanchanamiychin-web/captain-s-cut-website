import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import logo from "@/assets/logo-dark.png";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

const links = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/services", key: "nav.services" },
  { to: "/gallery", key: "nav.gallery" },
  { to: "/reviews", key: "nav.reviews" },
  { to: "/contact", key: "nav.contact" },
] as const;

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: s => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center gap-4 md:h-20">
        <Link to="/" className="flex min-w-0 items-center gap-2 shrink-0">
          <img src={logo} alt="Captain Barber" width={40} height={40} className="h-9 w-9 md:h-10 md:w-10" />
          <span className="font-display font-bold text-base md:text-lg leading-tight">
            <span className="text-foreground">Captain</span> <span className="gold-text">Barber</span>
          </span>
        </Link>

        <nav className="ml-auto hidden lg:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative"
              activeProps={{ className: "px-3 py-2 text-sm font-medium text-foreground relative after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-[color:var(--gold)]" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto lg:ml-4 flex items-center gap-2 shrink-0">
          <button
            onClick={() => setLang(lang === "th" ? "en" : "th")}
            className="hidden sm:inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-semibold hover:bg-secondary transition"
            aria-label="Switch language"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === "th" ? "TH" : "EN"}
          </button>
          <button
            onClick={toggle}
            className="hidden sm:inline-flex items-center justify-center rounded-md border border-border p-2 hover:bg-secondary transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link to="/booking" className="hidden md:inline-flex btn-gold rounded-md px-4 py-2 text-sm font-semibold">
            {t("cta.book")}
          </Link>
          <button
            onClick={() => setOpen(o => !o)}
            className="lg:hidden inline-flex items-center justify-center rounded-md border border-border p-2"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <nav className="container-x flex flex-col py-3">
            {links.map(l => (
              <Link key={l.to} to={l.to} className="py-2.5 text-base font-medium text-foreground/90 hover:text-[color:var(--gold)]">
                {t(l.key)}
              </Link>
            ))}
            <Link to="/booking" className="mt-2 btn-gold rounded-md px-4 py-2.5 text-sm font-semibold text-center">
              {t("cta.book")}
            </Link>
            <div className="mt-3 flex items-center gap-2">
              <button onClick={() => setLang(lang === "th" ? "en" : "th")} className="flex-1 rounded-md border border-border px-3 py-2 text-sm">
                {lang === "th" ? "English" : "ภาษาไทย"}
              </button>
              <button onClick={toggle} className="rounded-md border border-border p-2" aria-label="Toggle theme">
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
