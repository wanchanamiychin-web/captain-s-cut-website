import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "th" | "en";

type Dict = Record<string, string>;

const th: Dict = {
  "nav.home": "หน้าแรก",
  "nav.about": "เกี่ยวกับเรา",
  "nav.services": "บริการและราคา",
  "nav.gallery": "ผลงาน",
  "nav.reviews": "รีวิว",
  "nav.contact": "ติดต่อ",
  "nav.booking": "จองคิว",
  "cta.book": "จองคิว",
  "cta.call": "โทรเลย",
  "cta.line": "แชท LINE",
  "hero.title": "กัปตัน Barber",
  "hero.sub": "กัปตันผู้นำเทรนทรงผมเท่ๆ ใกล้บ้านคุณ",
  "hero.desc": "ร้านตัดผมชายสไตล์ Classic Barber x Modern Gentleman เชี่ยวชาญทรง Fade และให้คำแนะนำทรงผมเฉพาะบุคคล",
  "features.title": "ทำไมต้อง Captain Barber",
  "features.f1.t": "เชี่ยวชาญทรง Fade",
  "features.f1.d": "ช่างมืออาชีพประสบการณ์กว่า 4 ปี จบทุกดีเทลเป๊ะทุกทรง",
  "features.f2.t": "ให้คำปรึกษาเฉพาะบุคคล",
  "features.f2.d": "แนะนำทรงผมที่เหมาะกับโครงหน้าและไลฟ์สไตล์ของคุณ",
  "features.f3.t": "บริการ VIP ห้องแอร์",
  "features.f3.d": "ร้านสะอาด ทันสมัย นั่งสบาย พร้อมเครื่องดื่มต้อนรับ",
  "features.f4.t": "ราคาเข้าถึงง่าย",
  "features.f4.d": "เริ่มต้นเพียง 80 บาท คุณภาพระดับพรีเมียม",
  "services.title": "บริการและราคา",
  "services.sub": "คุณภาพเยี่ยม ราคาสบายกระเป๋า",
  "gallery.title": "ผลงานของเรา",
  "gallery.sub": "Before & After ทรงจริงจากลูกค้าจริง",
  "reviews.title": "รีวิวจากลูกค้า",
  "reviews.sub": "เสียงจริงจากลูกค้าประจำของเรา",
  "promo.title": "โปรโมชั่นพิเศษ",
  "promo.card1.t": "นักเรียน / นักศึกษา",
  "promo.card1.d": "แสดงบัตรนักเรียนรับส่วนลด 10% ทุกบริการ",
  "promo.card2.t": "มาเป็นกลุ่ม 3 คนขึ้นไป",
  "promo.card2.d": "ลดทันที 20 บาทต่อคน จองล่วงหน้าเท่านั้น",
  "promo.card3.t": "แพ็คเกจสมาชิก",
  "promo.card3.d": "ตัด 10 ครั้ง จ่ายเพียง 8 ครั้ง คุ้มกว่าเดิม",
  "footer.tagline": "กัปตันผู้นำเทรนทรงผมเท่ๆ ใกล้บ้านคุณ",
  "footer.hours": "เปิดทุกวัน 09:00 - 20:00",
  "footer.rights": "© 2025 Captain Barber. All rights reserved.",
  "about.title": "เกี่ยวกับ Captain Barber",
  "about.sub": "เรื่องราวของช่างกัปตันและร้านของเรา",
  "about.p1": "Captain Barber ก่อตั้งขึ้นเมื่อกว่า 4 ปีที่แล้ว โดยช่างกัปตัน ผู้หลงใหลในศิลปะการตัดผมชายสไตล์ Classic Barber ผสมผสานกับความเป็น Modern Gentleman",
  "about.p2": "เราเชื่อว่าทรงผมที่ดีเปลี่ยนบุคลิกและความมั่นใจของคุณได้ ทีมของเราจึงตั้งใจให้บริการทุกท่านด้วยเทคนิคที่แม่นยำ ใส่ใจในทุกดีเทล และให้คำแนะนำทรงผมที่เหมาะกับคุณจริง ๆ",
  "about.p3": "ไม่ว่าคุณจะเป็นนักเรียน นักศึกษา คนทำงาน หรือคุณพ่อพาลูกมาตัด เรายินดีต้อนรับทุกท่านให้เป็นครอบครัวเดียวกัน",
  "about.mission.t": "พันธกิจของเรา",
  "about.mission.d": "ยกระดับประสบการณ์การตัดผมชายในย่านนี้ให้เข้าถึงง่าย คุณภาพระดับพรีเมียม",
  "about.vision.t": "วิสัยทัศน์",
  "about.vision.d": "เป็นร้านประจำในใจของสุภาพบุรุษทุกวัย ที่มาแล้วต้องกลับมาอีก",
  "about.value.t": "คุณค่าที่เรายึดถือ",
  "about.value.d": "ใส่ใจทุกดีเทล จริงใจกับลูกค้า และไม่หยุดพัฒนาฝีมือ",
  "booking.title": "จองคิวออนไลน์",
  "booking.sub": "กรอกข้อมูลด้านล่าง ทีมงานจะยืนยันคิวผ่าน LINE หรือโทรกลับภายใน 30 นาที",
  "booking.name": "ชื่อ - นามสกุล",
  "booking.phone": "เบอร์โทรศัพท์",
  "booking.date": "วันที่",
  "booking.time": "เวลา",
  "booking.service": "บริการที่ต้องการ",
  "booking.note": "หมายเหตุเพิ่มเติม",
  "booking.submit": "ยืนยันจองคิว",
  "booking.success": "จองคิวสำเร็จ! ทีมงานจะติดต่อกลับเร็วที่สุด",
  "contact.title": "ติดต่อร้าน",
  "contact.sub": "แวะมาหาเราได้ทุกวัน หรือติดต่อผ่านช่องทางด้านล่าง",
  "contact.address": "99 ถนนสุขุมวิท ตำบลตัวอย่าง อำเภอตัวอย่าง จังหวัดตัวอย่าง 10110",
  "contact.hours.label": "เวลาทำการ",
  "contact.hours.value": "ทุกวัน 09:00 - 20:00",
  "contact.phone.label": "โทรศัพท์",
  "contact.line.label": "LINE Official",
  "contact.fb.label": "Facebook",
  "filter.all": "ทั้งหมด",
  "filter.fade": "Fade",
  "filter.classic": "รองทรง",
  "filter.color": "ย้อมสี",
  "filter.shave": "โกนหนวด",
  "before": "ก่อน",
  "after": "หลัง",
  "backtotop": "ขึ้นบนสุด",
};

const en: Dict = {
  "nav.home": "Home",
  "nav.about": "About",
  "nav.services": "Services",
  "nav.gallery": "Gallery",
  "nav.reviews": "Reviews",
  "nav.contact": "Contact",
  "nav.booking": "Book Now",
  "cta.book": "Book Now",
  "cta.call": "Call",
  "cta.line": "Chat LINE",
  "hero.title": "Captain Barber",
  "hero.sub": "The captain of modern men's haircuts, right in your neighborhood.",
  "hero.desc": "A men's barber shop blending Classic Barber craft with Modern Gentleman style — specialists in fades and personalised styling.",
  "features.title": "Why Captain Barber",
  "features.f1.t": "Fade Specialists",
  "features.f1.d": "Over 4 years of hands-on experience — every fade dialled in perfectly.",
  "features.f2.t": "Personal Styling Advice",
  "features.f2.d": "We recommend the right cut for your face shape and lifestyle.",
  "features.f3.t": "VIP Air-Conditioned Studio",
  "features.f3.d": "Clean, modern and comfortable — with a welcome drink on us.",
  "features.f4.t": "Fair, Friendly Prices",
  "features.f4.d": "Premium quality from just 80 THB.",
  "services.title": "Services & Pricing",
  "services.sub": "Great quality at friendly prices.",
  "gallery.title": "Our Work",
  "gallery.sub": "Real Before & After results from real clients.",
  "reviews.title": "Client Reviews",
  "reviews.sub": "Honest words from our regulars.",
  "promo.title": "Special Offers",
  "promo.card1.t": "Students",
  "promo.card1.d": "Show your student ID and get 10% off any service.",
  "promo.card2.t": "Group of 3+",
  "promo.card2.d": "Get 20 THB off per person. Advance booking only.",
  "promo.card3.t": "Loyalty Package",
  "promo.card3.d": "Pay for 8 cuts, get 10. Better value every visit.",
  "footer.tagline": "The captain of modern men's haircuts near you.",
  "footer.hours": "Open daily 09:00 - 20:00",
  "footer.rights": "© 2025 Captain Barber. All rights reserved.",
  "about.title": "About Captain Barber",
  "about.sub": "The story of Captain and his shop.",
  "about.p1": "Captain Barber was founded over 4 years ago by Captain, a barber passionate about blending Classic Barber craft with Modern Gentleman style.",
  "about.p2": "We believe a great haircut changes how you carry yourself. Our team is committed to precise technique, meticulous detail, and giving you honest styling advice tailored to you.",
  "about.p3": "Whether you're a student, a professional, or a dad bringing his son for a first cut — you're always welcome here as family.",
  "about.mission.t": "Our Mission",
  "about.mission.d": "Bring premium men's grooming to the neighborhood at an accessible price.",
  "about.vision.t": "Our Vision",
  "about.vision.d": "Be the trusted go-to barber for every gentleman in the area.",
  "about.value.t": "Our Values",
  "about.value.d": "Detail-obsessed. Honest with clients. Always refining our craft.",
  "booking.title": "Book Online",
  "booking.sub": "Fill in the form and we'll confirm your slot via LINE or a call back within 30 minutes.",
  "booking.name": "Full Name",
  "booking.phone": "Phone Number",
  "booking.date": "Date",
  "booking.time": "Time",
  "booking.service": "Service",
  "booking.note": "Additional Notes",
  "booking.submit": "Confirm Booking",
  "booking.success": "Booking received! We'll be in touch shortly.",
  "contact.title": "Contact Us",
  "contact.sub": "Drop by any day, or reach us through the channels below.",
  "contact.address": "99 Sukhumvit Rd, Sample District, Sample Province 10110",
  "contact.hours.label": "Opening Hours",
  "contact.hours.value": "Daily 09:00 - 20:00",
  "contact.phone.label": "Phone",
  "contact.line.label": "LINE Official",
  "contact.fb.label": "Facebook",
  "filter.all": "All",
  "filter.fade": "Fade",
  "filter.classic": "Classic",
  "filter.color": "Color",
  "filter.shave": "Shave",
  "before": "Before",
  "after": "After",
  "backtotop": "Back to top",
};

const dict: Record<Lang, Dict> = { th, en };

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: string) => string;
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("th");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("cb_lang") as Lang | null) : null;
    if (saved === "th" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("cb_lang", l);
  };

  const t = (k: string) => dict[lang][k] ?? k;
  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const c = useContext(I18nContext);
  if (!c) throw new Error("useI18n must be used inside I18nProvider");
  return c;
}
