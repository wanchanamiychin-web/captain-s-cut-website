import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { I18nProvider } from "../lib/i18n";
import { ThemeProvider } from "../lib/theme";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FloatingButtons } from "../components/FloatingButtons";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold gold-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">ไม่พบหน้าที่คุณค้นหา / Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          ลิงก์อาจถูกย้ายหรือไม่มีอยู่แล้ว กลับไปยังหน้าแรกได้เลย
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-gold inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold">
            กลับหน้าแรก
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">เกิดข้อผิดพลาด</h1>
        <p className="mt-2 text-sm text-muted-foreground">ลองรีเฟรชหน้านี้ หรือกลับไปหน้าแรก</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-gold rounded-md px-4 py-2 text-sm font-semibold">
            ลองอีกครั้ง
          </button>
          <a href="/" className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">กลับหน้าแรก</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "กัปตัน Barber (Captain Barber) – ร้านตัดผมชายสไตล์ Modern Classic" },
      { name: "description", content: "Captain Barber ร้านตัดผมชายเชี่ยวชาญทรง Fade รองทรง โกนหนวด ย้อมสี บริการ VIP ห้องแอร์ ให้คำแนะนำทรงผมเฉพาะบุคคล ราคาเข้าถึงง่าย จองคิวออนไลน์ได้ทันที" },
      { name: "keywords", content: "ร้านตัดผมชาย, บาร์เบอร์, Captain Barber, กัปตัน Barber, ทรง Fade, รองทรง, ย้อมสีผมชาย, โกนหนวด, barber shop, barber near me" },
      { name: "author", content: "Captain Barber" },
      { name: "theme-color", content: "#111111" },
      { property: "og:site_name", content: "Captain Barber" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "กัปตัน Barber (Captain Barber) – Modern Classic Barber Shop" },
      { property: "og:description", content: "ร้านตัดผมชายเชี่ยวชาญ Fade บริการ VIP ห้องแอร์ ให้คำแนะนำทรงผมเฉพาะบุคคล จองคิวออนไลน์ได้เลย" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "กัปตัน Barber (Captain Barber)" },
      { name: "twitter:description", content: "ร้านตัดผมชายสไตล์ Modern Classic เชี่ยวชาญ Fade จองคิวออนไลน์ได้" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HairSalon",
          "name": "Captain Barber",
          "alternateName": "กัปตัน Barber",
          "image": "/favicon.ico",
          "description": "ร้านตัดผมชายสไตล์ Modern Classic เชี่ยวชาญทรง Fade บริการ VIP ห้องแอร์",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "99 ถนนสุขุมวิท",
            "addressLocality": "ตัวอย่าง",
            "addressRegion": "ตัวอย่าง",
            "postalCode": "10110",
            "addressCountry": "TH"
          },
          "telephone": "+66-99-999-9999",
          "priceRange": "฿฿",
          "openingHoursSpecification": [{
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
            "opens": "09:00",
            "closes": "20:00"
          }],
          "sameAs": [
            "https://facebook.com/captainbarber",
            "https://line.me/R/ti/p/@captainbarber"
          ]
        })
      }
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="th" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <I18nProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
            <FloatingButtons />
          </div>
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
