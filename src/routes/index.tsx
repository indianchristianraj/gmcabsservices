import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroCab from "@/assets/hero-cab.jpg";
import airportImg from "@/assets/airport.jpg";
import outstationImg from "@/assets/outstation.jpg";
import localImg from "@/assets/local.jpg";
import ramojiImg from "@/assets/ramoji.jpg";
import gmLogo from "@/assets/gm-logo.jpg.asset.json";
import innovaRamoji from "@/assets/innova-ramoji.png.asset.json";
import innovaHycross from "@/assets/innova-hycross.png.asset.json";
import fleetPair from "@/assets/fleet-pair.png.asset.json";
import innovaCrystaReal from "@/assets/innova-crysta-real.jpg.asset.json";
import innovaHycrossReal from "@/assets/innova-hycross-real.jpg.asset.json";
import instagramQR from "@/assets/gmcabs-instagram-qr.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "GM Cabs Services — Premium Airport Taxi, One Way & Outstation Cabs in Hyderabad" },
      { name: "description", content: "Book premium airport pickup & drop, one way taxi, outstation cabs and luxury car rentals in Hyderabad. Innova Crysta, Hycross, Fortuner & more. 24×7 — 6301875485." },
      { property: "og:title", content: "GM Cabs Services — Premium Hyderabad Cabs & Chauffeur Service" },
      { property: "og:description", content: "Airport, One Way, Outstation & Luxury cabs across Telangana & Andhra Pradesh. Professional chauffeurs, luxury fleet, 24×7 support." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://glide-seamless.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://glide-seamless.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

const PHONE = "6301875485";
const PHONE_INTL = "916301875485";
const EMAIL = "gmcabsservices@gmail.com";
const ADDRESS = "H.No: 7-6/16, Sri Sai Colony, Nacharam, Hyderabad - 500076";

function waFor(context?: string, route?: string) {
  const base = "Hi GM Cabs,";
  const ctx = context ? ` I'm interested in *${context}*.` : " I would like to book a cab.";
  const from = route && route !== "/" ? ` (from page: ${route})` : "";
  const msg = `${base}${ctx}${from} Please share availability and pricing.`;
  return `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(msg)}`;
}
const waLink = waFor();
const telLink = `tel:+${PHONE_INTL}`;

const SECTION_CONTEXT: Record<string, string> = {
  services: "your cab services",
  fleet: "your premium fleet",
  routes: "your popular outstation routes",
  packages: "your Hyderabad cab packages",
  about: "GM Cabs Services",
  contact: "booking a cab",
};

const services = [
  { title: "Airport Pickup", desc: "24×7 meet-and-greet at Rajiv Gandhi International Airport with real-time flight tracking.", img: airportImg, icon: "🛬" },
  { title: "Airport Drop", desc: "On-time drops to RGIA with luggage assistance, clean cabs and professional chauffeurs.", img: airportImg, icon: "✈️" },
  { title: "One Way Taxi", desc: "Affordable one way drops across Telangana & Andhra Pradesh — you pay only one side.", img: outstationImg, icon: "➡️" },
  { title: "Outstation Cabs", desc: "Round trip and multi-day outstation to Bangalore, Vijayawada, Vizag, Tirupati & more.", img: outstationImg, icon: "🛣️" },
  { title: "Local Rental", desc: "Hourly packages (4/8/12 hrs) across Hyderabad — perfect for meetings & city errands.", img: localImg, icon: "🏙️" },
  { title: "Corporate Travel", desc: "Monthly billing, dedicated chauffeurs and premium sedans for business & employee transport.", img: heroCab, icon: "💼" },
  { title: "Wedding Cars", desc: "Luxury cars for wedding pickups, baraat and guest transportation with decoration on request.", img: fleetPair.url, icon: "💍" },
  { title: "Temple Tours", desc: "Curated darshan trips to Tirupati, Yadagirigutta, Vemulawada, Srisailam and Basara.", img: ramojiImg, icon: "🛕" },
  { title: "Luxury Car Rental", desc: "Fortuner, Camry, Kia Carnival — chauffeur-driven premium cars for VIP occasions.", img: fleetPair.url, icon: "👑" },
];

type Vehicle = {
  name: string;
  category: "Economy" | "Sedan" | "SUV" | "Luxury";
  seats: string;
  bags: string;
  fuel: string;
  best: string;
  badge?: string;
  img: string;
};

const fleet: Vehicle[] = [
  { name: "Toyota Innova Crysta", category: "SUV", seats: "6 + 1", bags: "4 Bags", fuel: "Diesel", best: "Family · Outstation", badge: "Most Booked", img: innovaCrystaReal.url },
  { name: "Toyota Innova Hycross", category: "SUV", seats: "6 + 1", bags: "4 Bags", fuel: "Hybrid", best: "Premium family travel", badge: "New Model", img: innovaHycrossReal.url },
  { name: "Toyota Innova", category: "SUV", seats: "7 + 1", bags: "3 Bags", fuel: "Diesel", best: "Group & tours", img: fleetPair.url },
  { name: "Toyota Fortuner", category: "Luxury", seats: "6 + 1", bags: "4 Bags", fuel: "Diesel", best: "VIP · Wedding", badge: "Luxury", img: heroCab },
  { name: "Toyota Camry Hybrid", category: "Luxury", seats: "4 + 1", bags: "3 Bags", fuel: "Hybrid", best: "Executive travel", badge: "Corporate Choice", img: heroCab },
  { name: "Kia Carnival", category: "Luxury", seats: "6 + 1", bags: "5 Bags", fuel: "Diesel", best: "Airport VIP", badge: "Airport Special", img: fleetPair.url },
  { name: "Mahindra XUV700", category: "SUV", seats: "6 + 1", bags: "4 Bags", fuel: "Diesel", best: "Comfort & power", img: outstationImg },
  { name: "Mahindra Scorpio N", category: "SUV", seats: "6 + 1", bags: "3 Bags", fuel: "Diesel", best: "Highway trips", img: outstationImg },
  { name: "Honda City", category: "Sedan", seats: "4 + 1", bags: "2 Bags", fuel: "Petrol", best: "Airport transfer", badge: "One Way Bestseller", img: airportImg },
  { name: "Hyundai Verna", category: "Sedan", seats: "4 + 1", bags: "2 Bags", fuel: "Petrol", best: "City & business", img: airportImg },
  { name: "Maruti Swift Dzire", category: "Economy", seats: "4 + 1", bags: "2 Bags", fuel: "Petrol", best: "City & short drops", badge: "Family Favourite", img: localImg },
  { name: "Honda Amaze", category: "Economy", seats: "4 + 1", bags: "2 Bags", fuel: "Petrol", best: "Budget airport rides", img: localImg },
];

const packages = [
  { title: "8 Hrs / 80 Kms", tag: "City Package", duration: "8 Hours", distance: "80 Kms", ideal: "Meetings & shopping", includes: ["Fuel", "Driver", "Parking", "AC"] },
  { title: "12 Hrs / 120 Kms", tag: "Extended Day", duration: "12 Hours", distance: "120 Kms", ideal: "Full-day city errands", includes: ["Fuel", "Driver", "Parking", "AC"] },
  { title: "Hyderabad City Tour", tag: "Sightseeing", duration: "10 Hours", distance: "100 Kms", ideal: "Charminar, Golconda, Hussain Sagar", includes: ["Multi-stop", "Guide", "AC", "Water"] },
  { title: "Ramoji Film City", tag: "Full Day", duration: "12 Hours", distance: "120 Kms", ideal: "Family day out", includes: ["Pickup & drop", "Waiting", "AC", "Toll"] },
  { title: "Yadagirigutta Darshan", tag: "Round Trip", duration: "8 Hours", distance: "180 Kms", ideal: "Temple visit", includes: ["Round trip", "Waiting", "AC", "Toll"] },
  { title: "Statue of Equality", tag: "Half Day", duration: "6 Hours", distance: "90 Kms", ideal: "Muchintal sightseeing", includes: ["Pickup & drop", "Waiting", "AC", "Parking"] },
];

const routes = [
  { to: "Warangal", km: "150 km", time: "3 hrs" },
  { to: "Vijayawada", km: "275 km", time: "5 hrs" },
  { to: "Guntur", km: "290 km", time: "5.5 hrs" },
  { to: "Tenali", km: "310 km", time: "6 hrs" },
  { to: "Eluru", km: "340 km", time: "6 hrs" },
  { to: "Rajahmundry", km: "445 km", time: "8 hrs" },
  { to: "Kakinada", km: "500 km", time: "9 hrs" },
  { to: "Visakhapatnam", km: "620 km", time: "11 hrs" },
  { to: "Tirupati", km: "560 km", time: "10 hrs" },
  { to: "Nellore", km: "460 km", time: "8 hrs" },
  { to: "Ongole", km: "370 km", time: "7 hrs" },
  { to: "Bangalore", km: "570 km", time: "10 hrs" },
];

const whyUs = [
  { t: "24×7 Support", d: "Round-the-clock booking & assistance." },
  { t: "Verified Drivers", d: "Licensed, background-checked chauffeurs." },
  { t: "Luxury Fleet", d: "Sedans, SUVs & premium cars — all AC." },
  { t: "GPS Enabled", d: "Live tracking on every ride." },
  { t: "Transparent Pricing", d: "Clear quotes on WhatsApp — no hidden charges." },
  { t: "On-Time Pickup", d: "Punctual pickups with flight tracking." },
  { t: "Sanitized Cars", d: "Deep-cleaned interiors before every trip." },
  { t: "Safe Journey", d: "Insured cars & courteous, safe driving." },
];

const coverage = [
  { icon: "🏙️", label: "All Hyderabad", detail: "Secunderabad · Gachibowli · HITEC City · LB Nagar · Kompally" },
  { icon: "✈️", label: "RGIA Airport", detail: "24×7 pickup & drop with flight tracking" },
  { icon: "🛕", label: "Pilgrim Trips", detail: "Tirupati · Yadagirigutta · Vemulawada · Srisailam" },
  { icon: "🌆", label: "Outstation", detail: "Bangalore · Vijayawada · Vizag · Chennai · Pune" },
];

const process = [
  { step: "01", t: "Share your trip", d: "Tell us pickup, drop, date & car type on WhatsApp or call." },
  { step: "02", t: "Get instant quote", d: "We confirm availability and a transparent fare." },
  { step: "03", t: "Driver assigned", d: "You receive driver name, photo and vehicle number." },
  { step: "04", t: "Ride & pay", d: "Enjoy the trip — pay by cash, UPI or online transfer." },
];

const faqs = [
  { q: "How do I book a cab with GM Cabs?", a: "Tap the WhatsApp button or call 6301875485. Share pickup, drop, date and time — we confirm within minutes." },
  { q: "Do you provide airport pickup and drop 24×7?", a: "Yes. We operate 24×7 at Rajiv Gandhi International Airport with real-time flight tracking, so drivers are ready even for late-night arrivals." },
  { q: "Do you offer outstation and one-way trips?", a: "Yes. We handle both round trip and one-way outstation trips to Bangalore, Vijayawada, Vizag, Tirupati, Warangal and more." },
  { q: "What vehicles are available?", a: "Our fleet includes Swift Dzire, Honda City, Innova, Innova Crysta, Innova Hycross, Fortuner, Camry, Kia Carnival, XUV700 and more." },
  { q: "Are your drivers verified?", a: "Every driver is licensed, background-verified and trained in safe, courteous driving." },
  { q: "What payment options do you accept?", a: "Cash, UPI (GPay / PhonePe / Paytm) and direct bank transfer. Corporate invoicing available on request." },
  { q: "Can I cancel or reschedule my booking?", a: "Yes — free cancellation up to 2 hours before pickup. Reschedule anytime by messaging us on WhatsApp." },
];

const stats = [
  { n: 10, suffix: "+", label: "Years Trusted" },
  { n: 25000, suffix: "+", label: "Happy Rides" },
  { n: 50, suffix: "+", label: "Cars in Fleet" },
  { n: 24, suffix: "/7", label: "Availability" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <QuoteWidget />
      <StatsBar />
      <Services />
      <Fleet />
      <Routes />
      <Packages />
      <Coverage />
      <HowItWorks />
      <WhyUs />
      <FAQ />
      <Instagram />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
      <ScrollTop />
    </div>
  );
}

/* ---------------- HEADER ---------------- */
function Logo({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src={gmLogo.url}
        alt="GM Cabs Services"
        width={size}
        height={size}
        className="shrink-0 rounded-lg object-cover shadow-card"
        style={{ width: size, height: size }}
      />
      <div className="leading-tight">
        <div className="font-display text-base font-bold text-primary sm:text-lg">GM Cabs Services</div>
        <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-orange sm:text-[10px]">Airport · One Way · Outstation</div>
      </div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-lg">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 md:px-8">
        <a href="#top" className="min-w-0"><Logo /></a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-foreground/80 lg:flex">
          <a href="#services" className="hover:text-orange">Services</a>
          <a href="#fleet" className="hover:text-orange">Fleet</a>
          <a href="#routes" className="hover:text-orange">Routes</a>
          <a href="#packages" className="hover:text-orange">Packages</a>
          <a href="#about" className="hover:text-orange">About</a>
          <a href="#contact" className="hover:text-orange">Contact</a>
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-[var(--whatsapp)] px-4 py-2 text-xs font-semibold text-white shadow-card hover:opacity-90">
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </a>
          <a href={telLink} className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-4 py-2 text-xs font-semibold text-white shadow-gold hover:opacity-90">
            📞 Call Now
          </a>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Open menu"
          className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-card text-primary shadow-card lg:hidden"
        >
          <span className="text-xl leading-none">{open ? "✕" : "☰"}</span>
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-card lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-sm font-medium">
            {[["Services", "#services"], ["Fleet", "#fleet"], ["Routes", "#routes"], ["Packages", "#packages"], ["About", "#about"], ["Contact", "#contact"]].map(([l, h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 hover:bg-accent">{l}</a>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2 pt-2">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--whatsapp)] px-4 py-2.5 text-xs font-semibold text-white shadow-card">
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </a>
              <a href={telLink} className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-gradient px-4 py-2.5 text-xs font-semibold text-white shadow-gold">
                📞 Call
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <img src={heroCab} alt="Premium GM Cabs Services luxury car" width={1920} height={1200} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-hero-gradient opacity-90" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-32">
        <div className="max-w-2xl animate-float-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-orange" /> ⭐ Hyderabad's Trusted Cab Services
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-white md:text-6xl">
            Premium Airport Taxi
            <span className="mt-2 block text-3xl font-semibold text-gold md:text-5xl">& Luxury One Way Cab Services</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/85 md:text-lg">
            Travel anywhere across Telangana & Andhra Pradesh with safe, comfortable, affordable and premium taxi services.
          </p>

          <div className="mt-6 grid max-w-xl grid-cols-2 gap-2 text-sm text-white/90 sm:grid-cols-3">
            {["✈️ Airport Pickup & Drop", "➡️ One Way Taxi", "🛣️ Outstation Cabs", "👑 Luxury Fleet", "🕐 24×7 Available", "🧑‍✈️ Pro Drivers"].map((f) => (
              <div key={f} className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 backdrop-blur">{f}</div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[var(--whatsapp)] px-6 py-3.5 text-sm font-semibold text-white shadow-elegant hover:opacity-90">
              <WhatsAppIcon className="h-5 w-5" /> Book on WhatsApp
            </a>
            <a href={telLink} className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-gold hover:opacity-90">
              📞 Call {PHONE}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- STATS ---------------- */
function StatsBar() {
  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 sm:grid-cols-4 md:px-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-3xl font-bold text-primary md:text-4xl">
              <Counter to={s.n} />{s.suffix}
            </div>
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Counter({ to }: { to: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const start = performance.now();
        const dur = 1200;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setN(Math.floor(p * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n.toLocaleString()}</span>;
}

/* ---------------- SERVICES ---------------- */
function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <SectionHead eyebrow="What We Offer" title="Cab services built around your journey" sub="From quick airport runs to multi-day outstation trips — every service, one trusted partner." />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <article key={s.title} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elegant">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-xl bg-background/95 text-xl shadow-card">{s.icon}</div>
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-bold text-primary">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <div className="mt-4 flex gap-2">
                <a href={waFor(s.title)} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[var(--whatsapp)] px-3 py-2 text-xs font-semibold text-white hover:opacity-90">
                  <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp
                </a>
                <a href={telLink} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-brand-gradient px-3 py-2 text-xs font-semibold text-white hover:opacity-90">
                  📞 Call
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- FLEET ---------------- */
const CATEGORIES = ["All", "Economy", "Sedan", "SUV", "Luxury"] as const;
type Cat = (typeof CATEGORIES)[number];

function Fleet() {
  const [cat, setCat] = useState<Cat>("All");
  const items = fleet.filter((f) => cat === "All" || f.category === cat);
  return (
    <section id="fleet" className="bg-accent/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHead eyebrow="Our Premium Fleet" title="Chauffeur-driven cars for every occasion" sub="From compact sedans to premium SUVs and executive luxury cars — every cab is sanitized, AC and insured." />
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${cat === c ? "bg-brand-gradient text-white shadow-gold" : "border border-border bg-card text-primary hover:border-orange"}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((v) => (
            <article key={v.name} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elegant">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img src={v.img} alt={v.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                {v.badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-brand-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-gold">{v.badge}</span>
                )}
                <span className="absolute right-3 top-3 rounded-full bg-primary/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">{v.category}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-primary">{v.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">Best for {v.best}</p>
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4 text-[11px] text-muted-foreground">
                  <div><div className="text-primary">👥 {v.seats}</div><div className="text-[10px]">Seats</div></div>
                  <div><div className="text-primary">🧳 {v.bags}</div><div className="text-[10px]">Luggage</div></div>
                  <div><div className="text-primary">⛽ {v.fuel}</div><div className="text-[10px]">Fuel</div></div>
                </div>
                <div className="mt-4 flex gap-2">
                  <a href={waFor(`${v.name} booking`)} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-1 rounded-full bg-[var(--whatsapp)] px-3 py-2 text-[11px] font-semibold text-white hover:opacity-90">
                    <WhatsAppIcon className="h-3 w-3" /> WhatsApp
                  </a>
                  <a href="#contact" className="inline-flex flex-1 items-center justify-center rounded-full bg-brand-gradient px-3 py-2 text-[11px] font-semibold text-white hover:opacity-90">
                    Book Now
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ROUTES ---------------- */
function Routes() {
  return (
    <section id="routes" className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <SectionHead eyebrow="Popular Routes" title="Outstation cabs from Hyderabad" sub="One-way and round trip cabs to every major destination in Telangana & Andhra Pradesh." />
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {routes.map((r) => (
          <a
            key={r.to}
            href={waFor(`Hyderabad to ${r.to} taxi`)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3.5 shadow-card transition hover:-translate-y-0.5 hover:border-orange hover:shadow-elegant"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <span>Hyderabad</span>
                <span className="text-orange">→</span>
                <span className="truncate">{r.to}</span>
              </div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">{r.km} · approx {r.time}</div>
            </div>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-orange transition group-hover:bg-brand-gradient group-hover:text-white">→</span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------------- PACKAGES ---------------- */
function Packages() {
  return (
    <section id="packages" className="bg-accent/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHead eyebrow="Popular Packages" title="Ready-made cab packages in Hyderabad" sub="Popular trips our customers book most — every package includes fuel, driver and AC." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((p) => (
            <article key={p.title} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:border-orange hover:shadow-elegant">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-orange">{p.tag}</div>
              <h3 className="mt-1 font-display text-xl font-bold text-primary">{p.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">Ideal for {p.ideal}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-accent/50 p-3 text-xs">
                <div><div className="text-[10px] uppercase tracking-wider text-muted-foreground">Duration</div><div className="mt-0.5 font-semibold text-primary">⏱ {p.duration}</div></div>
                <div><div className="text-[10px] uppercase tracking-wider text-muted-foreground">Distance</div><div className="mt-0.5 font-semibold text-primary">📍 {p.distance}</div></div>
              </div>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {p.includes.map((i) => (
                  <li key={i} className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground">✓ {i}</li>
                ))}
              </ul>
              <a href={waFor(`${p.title} package`)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-4 py-2.5 text-xs font-semibold text-white shadow-gold hover:opacity-90">
                <WhatsAppIcon className="h-4 w-4" /> Get quote on WhatsApp
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- COVERAGE ---------------- */
function Coverage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
      <SectionHead eyebrow="Coverage" title="Where we drive" sub="From every Hyderabad neighbourhood to long outstation routes." />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {coverage.map((c) => (
          <div key={c.label} className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-gradient text-2xl text-white shadow-gold">{c.icon}</div>
            <h3 className="mt-4 font-display text-lg font-bold text-primary">{c.label}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
function HowItWorks() {
  return (
    <section className="bg-accent/40 py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHead eyebrow="How it works" title="Booking a cab in 4 simple steps" sub="No apps, no accounts — just message or call us." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((s) => (
            <div key={s.step} className="relative rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="font-display text-4xl font-bold text-orange/80">{s.step}</div>
              <h3 className="mt-2 font-display text-lg font-bold text-primary">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHY US ---------------- */
function WhyUs() {
  return (
    <section id="about" className="bg-hero-gradient py-20 text-white md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:px-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-orange">Why GM Cabs</span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">A local Hyderabad cab service you can rely on.</h2>
          <p className="mt-5 text-white/80">
            Founded by <strong className="text-white">Mohsin Khan</strong>, GM Cabs Services has grown into one of Nacharam's trusted travel partners — with a premium fleet, verified chauffeurs and a passion for punctual, comfortable rides across Hyderabad, Telangana and Andhra Pradesh.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-gold hover:opacity-90">
              <WhatsAppIcon className="h-4 w-4" /> Chat with us
            </a>
            <a href={telLink} className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20">
              📞 Call {PHONE}
            </a>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {whyUs.map((w) => (
            <div key={w.t} className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand-gradient text-white shadow-gold">✓</div>
              <h3 className="mt-3 font-display text-base font-bold text-white">{w.t}</h3>
              <p className="mt-1 text-xs text-white/75">{w.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  return (
    <section className="bg-accent/40 py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <SectionHead eyebrow="FAQ" title="Answers before you book" sub="Still unsure? Message us on WhatsApp — we reply in minutes." />
        <div className="mt-10 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-xl border border-border bg-card p-5 shadow-card transition open:shadow-elegant">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-bold text-primary">
                {f.q}
                <span className="text-orange transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <SectionHead eyebrow="Get in Touch" title="Book your cab in a few clicks" sub="Fill in the trip details below — we'll confirm on WhatsApp within minutes." />
      <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <BookingForm />
        <div className="space-y-4">
          <ContactCard icon="📞" title="Call / SMS" line={PHONE} href={telLink} />
          <ContactCard icon="✉️" title="Email" line={EMAIL} href={`mailto:${EMAIL}`} />
          <ContactCard icon="📍" title="Visit Us" line={ADDRESS} />
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--whatsapp)] px-6 py-3.5 text-sm font-semibold text-white shadow-elegant hover:opacity-90">
            <WhatsAppIcon className="h-5 w-5" /> Quick WhatsApp chat
          </a>
          <div className="overflow-hidden rounded-2xl border border-border shadow-card">
            <iframe
              title="GM Cabs Services location"
              src="https://maps.google.com/maps?q=Nacharam,Hyderabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="220"
              loading="lazy"
              className="border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- INSTAGRAM ---------------- */
function Instagram() {
  return (
    <section id="instagram" className="bg-background py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2 md:items-center md:px-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange">Follow Us</span>
          <h2 className="mt-2 font-display text-3xl font-bold text-primary md:text-4xl">Ride stories on Instagram</h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Airport pickups, luxury trips and behind-the-wheel moments. Scan the QR or tap the button to follow <span className="font-semibold text-primary">@gmcabs786</span>.
          </p>
          <a
            href="https://instagram.com/gmcabs786"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-gold hover:opacity-90"
          >
            📸 Follow @gmcabs786
          </a>
        </div>
        <a
          href="https://instagram.com/gmcabs786"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto block w-full max-w-xs overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-elegant transition hover:-translate-y-1"
          aria-label="Scan to open GM Cabs Instagram"
        >
          <img src={instagramQR.url} alt="GM Cabs Instagram QR code — @gmcabs786" className="h-auto w-full rounded-xl" loading="lazy" />
          <div className="mt-3 text-center text-sm font-semibold text-primary">@gmcabs786</div>
          <div className="text-center text-xs text-muted-foreground">Scan with your camera</div>
        </a>
      </div>
    </section>
  );
}


function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 md:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <img src={gmLogo.url} alt="GM Cabs Services" width={44} height={44} className="rounded-lg" />
            <div>
              <div className="font-display text-base font-bold text-white">GM Cabs Services</div>
              <div className="text-[10px] uppercase tracking-widest text-orange">Airport · One Way · Outstation</div>
            </div>
          </div>
          <p className="mt-4 text-xs text-primary-foreground/70">Premium airport taxi, one way & luxury outstation cabs across Telangana & Andhra Pradesh.</p>
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-orange">Quick Links</div>
          <ul className="mt-4 space-y-2 text-sm">
            {[["Home", "#top"], ["Services", "#services"], ["Fleet", "#fleet"], ["Routes", "#routes"], ["Contact", "#contact"]].map(([l, h]) => (
              <li key={h}><a href={h} className="text-primary-foreground/80 hover:text-orange">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-orange">Services</div>
          <ul className="mt-4 space-y-2 text-sm">
            {["Airport Pickup & Drop", "One Way Taxi", "Outstation Cab", "Luxury Car Rental", "Corporate Travel"].map((l) => (
              <li key={l}><a href="#services" className="text-primary-foreground/80 hover:text-orange">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-orange">Contact</div>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li>📞 <a href={telLink} className="hover:text-orange">{PHONE}</a></li>
            <li>✉️ <a href={`mailto:${EMAIL}`} className="hover:text-orange break-all">{EMAIL}</a></li>
            <li>📍 {ADDRESS}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-primary-foreground/70 md:flex-row md:px-8">
          <div>© {new Date().getFullYear()} GM Cabs Services. All rights reserved.</div>
          <div>Proprietor: Mohsin Khan</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- FLOATING WA + SCROLL TOP ---------------- */
function FloatingWhatsApp() {
  const [section, setSection] = useState<string | null>(null);
  const route = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ids = Object.keys(SECTION_CONTEXT);
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        }
        let top: string | null = null;
        let best = 0;
        for (const [id, ratio] of visible) if (ratio > best) { best = ratio; top = id; }
        setSection(top);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-80px 0px -40% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const context = section ? SECTION_CONTEXT[section] : undefined;
  const href = waFor(context, route);
  const label = context ? `Chat on WhatsApp about ${context}` : "Chat on WhatsApp";
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[var(--whatsapp)] py-3 pl-3 pr-4 text-white shadow-elegant animate-pulse-ring transition hover:scale-105">
      <WhatsAppIcon className="h-7 w-7" />
      <span className="hidden text-sm font-semibold sm:inline">{context ? "Ask about this" : "Chat with us"}</span>
    </a>
  );
}

function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-24 right-6 z-50 grid h-11 w-11 place-items-center rounded-full bg-primary text-white shadow-elegant transition hover:bg-orange"
    >↑</button>
  );
}

/* ---------------- BOOKING FORM (unchanged logic) ---------------- */
type BookingFields = "name" | "phone" | "service" | "car" | "pickup" | "drop" | "date" | "time" | "tripType" | "passengers" | "luggage" | "notes";
type Errors = Partial<Record<BookingFields, string>>;

function todayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 10);
}

function validateField(name: BookingFields, value: string, form: Record<BookingFields, string>): string | undefined {
  switch (name) {
    case "phone": {
      const digits = value.replace(/\D/g, "");
      if (!value.trim()) return "Mobile number is required.";
      if (!/^[0-9+ \-]+$/.test(value)) return "Only digits, +, spaces and dashes are allowed.";
      if (digits.length < 10) return "Enter at least 10 digits.";
      if (digits.length > 13) return "Number is too long.";
      if (/^\+?91/.test(digits) ? !/^[6-9]/.test(digits.replace(/^\+?91/, "")) : !/^[6-9]/.test(digits))
        return "Indian mobile numbers start with 6, 7, 8 or 9.";
      return undefined;
    }
    case "date": {
      if (!value) return "Travel date is required.";
      if (value < todayISO()) return "Date can't be in the past.";
      return undefined;
    }
    case "time": {
      if (!value) return undefined;
      if (form.date && form.date === todayISO()) {
        const now = new Date();
        const [h, m] = value.split(":").map(Number);
        if (h * 60 + m <= now.getHours() * 60 + now.getMinutes()) return "Pickup time must be later than now.";
      }
      return undefined;
    }
    case "pickup":
    case "drop": {
      const other = name === "pickup" ? form.drop : form.pickup;
      const label = name === "pickup" ? "Pickup" : "Drop";
      const v = value.trim();
      if (!v) return `${label} location is required.`;
      if (v.length < 3) return `${label} location must be at least 3 characters.`;
      if (v.length > 120) return `${label} location is too long.`;
      if (!/[a-zA-Z\u0900-\u097F\u0C00-\u0C7F]/.test(v)) return `Enter a valid ${label.toLowerCase()} location.`;
      if (other.trim() && other.trim().toLowerCase() === v.toLowerCase()) return "Pickup and drop can't be the same.";
      return undefined;
    }
    case "passengers": {
      if (!value) return "Select the number of passengers.";
      const n = value === "7+" ? 7 : parseInt(value, 10);
      if (Number.isNaN(n) || n < 1) return "At least 1 passenger.";
      if (n > 17) return "For 17+ people please call us.";
      return undefined;
    }
    default:
      return undefined;
  }
}

function BookingForm() {
  const [form, setForm] = useState<Record<BookingFields, string>>({
    name: "", phone: "", service: "Airport Pickup", car: "Sedan", pickup: "", drop: "",
    date: "", time: "", tripType: "One-way", passengers: "2", luggage: "1", notes: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<BookingFields, boolean>>>({});
  const validated: BookingFields[] = ["phone", "pickup", "drop", "date", "time", "passengers"];

  function runValidation(next: Record<BookingFields, string>): Errors {
    const errs: Errors = {};
    for (const f of validated) { const msg = validateField(f, next[f], next); if (msg) errs[f] = msg; }
    return errs;
  }

  const update = (k: BookingFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...form, [k]: e.target.value };
    setForm(next);
    if (touched[k] || errors[k]) setErrors(runValidation(next));
  };
  const blur = (k: BookingFields) => () => { setTouched((t) => ({ ...t, [k]: true })); setErrors(runValidation(form)); };

  const canSubmit = form.name && form.phone && form.pickup && form.drop && form.date && Object.keys(runValidation(form)).length === 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = runValidation(form);
    setErrors(errs);
    setTouched({ phone: true, pickup: true, drop: true, date: true, time: true, passengers: true });
    if (Object.keys(errs).length > 0 || !form.name || !form.pickup || !form.drop) return;
    const lines = [
      "Hi GM Cabs, I'd like to book a cab. Here are my trip details:", "",
      `• Name: ${form.name}`, `• Phone: ${form.phone}`, `• Service: ${form.service}`, `• Car type: ${form.car}`,
      `• Trip type: ${form.tripType}`, `• Pickup: ${form.pickup}`, `• Drop: ${form.drop}`,
      `• Date: ${form.date}${form.time ? ` at ${form.time}` : ""}`, `• Passengers: ${form.passengers}`, `• Luggage: ${form.luggage}`,
    ];
    if (form.notes.trim()) lines.push(`• Notes: ${form.notes.trim()}`);
    lines.push("", "Please share availability and fare. Thank you!");
    const url = `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const baseInput = "w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2";
  const okInput = "border-border focus:border-orange focus:ring-orange/30";
  const errInput = "border-destructive focus:border-destructive focus:ring-destructive/30";
  const inputCls = (k: BookingFields) => `${baseInput} ${errors[k] ? errInput : okInput}`;
  const labelCls = "text-xs font-semibold uppercase tracking-wider text-muted-foreground";
  const errMsg = (k: BookingFields) => errors[k] ? (
    <p role="alert" className="mt-1 flex items-start gap-1 text-xs font-medium text-destructive"><span aria-hidden>⚠</span><span>{errors[k]}</span></p>
  ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gradient text-xl text-white shadow-gold">📝</span>
        <div>
          <h3 className="font-display text-xl font-bold text-primary">Booking request</h3>
          <p className="text-xs text-muted-foreground">All fields marked * are required.</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1.5"><span className={labelCls}>Full name *</span>
          <input required value={form.name} onChange={update("name")} className={`${baseInput} ${okInput}`} placeholder="Your name" /></label>
        <label className="space-y-1.5"><span className={labelCls}>Mobile number *</span>
          <input required type="tel" inputMode="tel" value={form.phone} onChange={update("phone")} onBlur={blur("phone")} aria-invalid={!!errors.phone} className={inputCls("phone")} placeholder="10-digit mobile" />
          {errMsg("phone")}</label>
        <label className="space-y-1.5"><span className={labelCls}>Preferred service *</span>
          <select value={form.service} onChange={update("service")} className={`${baseInput} ${okInput}`}>
            {["Airport Pickup", "Airport Drop", "One Way Taxi", "Outstation Cab", "Local Rental", "Corporate Travel", "Wedding Cars", "Temple Tour", "Luxury Car Rental"].map((o) => <option key={o}>{o}</option>)}
          </select></label>
        <label className="space-y-1.5"><span className={labelCls}>Car type</span>
          <select value={form.car} onChange={update("car")} className={`${baseInput} ${okInput}`}>
            {["Economy (Dzire/Amaze)", "Sedan (City/Verna)", "SUV (Innova/Crysta)", "Premium (Hycross)", "Luxury (Fortuner/Camry)", "Kia Carnival"].map((o) => <option key={o}>{o}</option>)}
          </select></label>
        <label className="space-y-1.5 sm:col-span-2"><span className={labelCls}>Pickup location *</span>
          <input required value={form.pickup} onChange={update("pickup")} onBlur={blur("pickup")} aria-invalid={!!errors.pickup} className={inputCls("pickup")} placeholder="e.g. Nacharam, Hyderabad" />
          {errMsg("pickup")}</label>
        <label className="space-y-1.5 sm:col-span-2"><span className={labelCls}>Drop location *</span>
          <input required value={form.drop} onChange={update("drop")} onBlur={blur("drop")} aria-invalid={!!errors.drop} className={inputCls("drop")} placeholder="e.g. RGIA Airport / Tirupati" />
          {errMsg("drop")}</label>
        <label className="space-y-1.5"><span className={labelCls}>Travel date *</span>
          <input required type="date" min={todayISO()} value={form.date} onChange={update("date")} onBlur={blur("date")} aria-invalid={!!errors.date} className={inputCls("date")} />
          {errMsg("date")}</label>
        <label className="space-y-1.5"><span className={labelCls}>Pickup time</span>
          <input type="time" value={form.time} onChange={update("time")} onBlur={blur("time")} aria-invalid={!!errors.time} className={inputCls("time")} />
          {errMsg("time")}</label>
        <label className="space-y-1.5"><span className={labelCls}>Trip type</span>
          <select value={form.tripType} onChange={update("tripType")} className={`${baseInput} ${okInput}`}>
            {["One-way", "Round trip", "Multi-day"].map((o) => <option key={o}>{o}</option>)}
          </select></label>
        <div className="grid grid-cols-2 gap-3">
          <label className="space-y-1.5"><span className={labelCls}>Passengers *</span>
            <select value={form.passengers} onChange={update("passengers")} onBlur={blur("passengers")} aria-invalid={!!errors.passengers} className={inputCls("passengers")}>
              {["1", "2", "3", "4", "5", "6", "7+"].map((o) => <option key={o}>{o}</option>)}
            </select>
            {errMsg("passengers")}</label>
          <label className="space-y-1.5"><span className={labelCls}>Luggage</span>
            <select value={form.luggage} onChange={update("luggage")} className={`${baseInput} ${okInput}`}>
              {["0", "1", "2", "3", "4+"].map((o) => <option key={o}>{o}</option>)}
            </select></label>
        </div>
        <label className="space-y-1.5 sm:col-span-2"><span className={labelCls}>Additional notes</span>
          <textarea rows={3} value={form.notes} onChange={update("notes")} className={`${baseInput} ${okInput}`} placeholder="Flight number, child seat, stops on the way…" /></label>
      </div>
      <button type="submit" disabled={!canSubmit}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--whatsapp)] px-6 py-3.5 text-sm font-semibold text-white shadow-elegant transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
        <WhatsAppIcon className="h-5 w-5" /> Send booking on WhatsApp
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">Your details open in WhatsApp so you can review before sending.</p>
    </form>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">{title}</h2>
      <p className="mt-3 text-muted-foreground">{sub}</p>
    </div>
  );
}

function ContactCard({ icon, title, line, href }: { icon: string; title: string; line: string; href?: string }) {
  const inner = (<>
    <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-gradient text-xl text-white shadow-gold">{icon}</div>
    <h3 className="mt-4 font-display text-lg font-bold text-primary">{title}</h3>
    <p className="mt-1 text-sm text-muted-foreground break-words">{line}</p>
  </>);
  const cls = "block rounded-2xl border border-border bg-card p-6 text-left shadow-card transition hover:-translate-y-1 hover:border-orange hover:shadow-elegant";
  return href ? <a href={href} className={cls}>{inner}</a> : <div className={cls}>{inner}</div>;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.15-.174.199-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 2C6.58 2 2.13 6.451 2.13 11.912a9.87 9.87 0 0 0 1.417 5.086L2 22l5.13-1.517a9.86 9.86 0 0 0 4.91 1.29c5.462 0 9.912-4.45 9.912-9.912S17.502 2 12.04 2z" />
    </svg>
  );
}
