import { Link } from "@tanstack/react-router";
import { Phone, MapPin, Clock, Facebook, MessageCircle } from "lucide-react";
import logo from "@/assets/logo-dark.png";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mt-12 border-t border-border bg-[color:var(--ink)] text-cream/85">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Captain Barber" width={44} height={44} className="h-11 w-11" />
            <span className="font-display font-bold text-lg">
              <span className="text-white">Captain</span> <span className="gold-text">Barber</span>
            </span>
          </div>
          <p className="mt-3 text-sm text-cream/70 max-w-xs">{t("footer.tagline")}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">{t("nav.services")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/services" className="hover:text-[color:var(--gold)]">{t("nav.services")}</Link></li>
            <li><Link to="/gallery" className="hover:text-[color:var(--gold)]">{t("nav.gallery")}</Link></li>
            <li><Link to="/reviews" className="hover:text-[color:var(--gold)]">{t("nav.reviews")}</Link></li>
            <li><Link to="/booking" className="hover:text-[color:var(--gold)]">{t("nav.booking")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">{t("nav.contact")}</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-[color:var(--gold)] mt-0.5 shrink-0" />{t("contact.address")}</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-[color:var(--gold)]" /><a href="tel:0999999999" className="hover:text-[color:var(--gold)]">099-999-9999</a></li>
            <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-[color:var(--gold)]" />{t("footer.hours")}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Social</h4>
          <div className="flex gap-3">
            <a href="https://line.me/R/ti/p/@captainbarber" target="_blank" rel="noopener" aria-label="LINE" className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 hover:bg-[color:var(--gold)] hover:text-black transition">
              <MessageCircle className="h-4 w-4" />
            </a>
            <a href="https://facebook.com/captainbarber" target="_blank" rel="noopener" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 hover:bg-[color:var(--gold)] hover:text-black transition">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="tel:0999999999" aria-label="Call" className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 hover:bg-[color:var(--gold)] hover:text-black transition">
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-x flex flex-col sm:flex-row items-center justify-between gap-2 py-5 text-xs text-cream/60">
          <p>{t("footer.rights")}</p>
          <p>Design & built with craft.</p>
        </div>
      </div>
    </footer>
  );
}
