import { createFileRoute, useRouterState, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { TRIP_ROUTE_LIST } from "@/lib/trip-routes";
import { PHONE, PHONE_INTL, telLink, waFor, bookingStore, EMPTY_DRAFT } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/FloatingWhatsApp";

import heroCab from "@/assets/hero-suv-front.webp";
import airportImg from "@/assets/airport.webp";
import outstationImg from "@/assets/outstation.webp";
import localImg from "@/assets/local.webp";
import ramojiImg from "@/assets/ramoji.webp";
import gmLogo from "@/assets/gm-logo.jpg.asset.json";
import gmLogoMark from "@/assets/gm-logo-mark.png.asset.json";
import innovaRamoji from "@/assets/innova-ramoji.png.asset.json";
import innovaHycross from "@/assets/innova-hycross.png.asset.json";
import fleetPair from "@/assets/fleet-pair.png.asset.json";
import innovaCrystaReal from "@/assets/innova-crysta-real.jpg.asset.json";
import innovaHycrossReal from "@/assets/innova-hycross-real.jpg.asset.json";
import instagramQR from "@/assets/gmcabs-instagram-qr.jpg.asset.json";
import vehInnova from "@/assets/veh-innova.webp";
import vehFortuner from "@/assets/veh-fortuner.webp";
import vehCamry from "@/assets/veh-camry.webp";
import vehCarnival from "@/assets/veh-carnival.webp";
import vehXuv700 from "@/assets/veh-xuv700.webp";
import vehScorpio from "@/assets/veh-scorpio.webp";
import vehCity from "@/assets/veh-city.webp";
import vehVerna from "@/assets/veh-verna.webp";
import vehDzire from "@/assets/veh-dzire.webp";
import vehAmaze from "@/assets/veh-amaze.webp";
import svcWedding from "@/assets/svc-wedding.webp";
import svcCorporate from "@/assets/svc-corporate.webp";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "GM Cabs Services — Premium Airport Taxi, One Way & Outstation Cabs in Hyderabad" },
      { name: "description", content: "Book premium airport pickup & drop, one way taxi, outstation cabs and luxury car rentals in Hyderabad. Innova Crysta, Hycross, Fortuner & more. 24×7 — 6301875485." },
      { property: "og:title", content: "GM Cabs Services — Premium Airport Taxi, One Way & Outstation Cabs in Hyderabad" },
      { property: "og:description", content: "Book premium airport pickup & drop, one way taxi, outstation cabs and luxury car rentals in Hyderabad. Innova Crysta, Hycross, Fortuner & more. 24×7 — 6301875485." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.gmcabsservices.com/" },
    ],
    links: [
      { rel: "canonical", href: "https://www.gmcabsservices.com/" },
      { rel: "preload", as: "image", href: heroCab, fetchPriority: "high" } as any,
    ],
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

const EMAIL = "gmcabsservices@gmail.com";
const EMAIL_RENTALS = "gmcabrentals@gmail.com";
const ADDRESS = "H.No: 7-6/16, Sri Sai Colony, Nacharam, Hyderabad - 500076";

const waLink = waFor();





const services = [
  { slug: "airport-pickup", title: "Airport Pickup", desc: "24×7 meet-and-greet at Rajiv Gandhi International Airport with real-time flight tracking.", img: airportImg, icon: "🛬" },
  { slug: "airport-drop", title: "Airport Drop", desc: "On-time drops to RGIA with luggage assistance, clean cabs and professional chauffeurs.", img: vehCarnival, icon: "✈️" },
  { slug: "one-way-taxi", title: "One Way Taxi", desc: "Affordable one way drops across Telangana & Andhra Pradesh — you pay only one side.", img: outstationImg, icon: "➡️" },
  { slug: "outstation-cabs", title: "Outstation Cabs", desc: "Round trip and multi-day outstation to Bangalore, Vijayawada, Vizag, Tirupati & more.", img: vehXuv700, icon: "🛣️" },
  { slug: "local-rental", title: "Local Rental", desc: "Hourly packages (4/8/12 hrs) across Hyderabad — perfect for meetings & city errands.", img: localImg, icon: "🏙️" },
  { slug: "corporate-travel", title: "Corporate Travel", desc: "Monthly billing, dedicated chauffeurs and premium sedans for business & employee transport.", img: svcCorporate, icon: "💼" },
  { slug: "wedding-cars", title: "Wedding Cars", desc: "Luxury cars for wedding pickups, baraat and guest transportation with decoration on request.", img: svcWedding, icon: "💍" },
  { slug: "temple-tours", title: "Temple Tours", desc: "Curated darshan trips to Tirupati, Yadagirigutta, Vemulawada, Srisailam and Basara.", img: ramojiImg, icon: "🛕" },
  { slug: "luxury-car-rental", title: "Luxury Car Rental", desc: "Fortuner, Camry, Kia Carnival — chauffeur-driven premium cars for VIP occasions.", img: vehFortuner, icon: "👑" },
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
  { name: "Toyota Innova", category: "SUV", seats: "7 + 1", bags: "3 Bags", fuel: "Diesel", best: "Group & tours", img: vehInnova },
  { name: "Toyota Fortuner", category: "Luxury", seats: "6 + 1", bags: "4 Bags", fuel: "Diesel", best: "VIP · Wedding", badge: "Luxury", img: vehFortuner },
  { name: "Toyota Camry Hybrid", category: "Luxury", seats: "4 + 1", bags: "3 Bags", fuel: "Hybrid", best: "Executive travel", badge: "Corporate Choice", img: vehCamry },
  { name: "Kia Carnival", category: "Luxury", seats: "6 + 1", bags: "5 Bags", fuel: "Diesel", best: "Airport VIP", badge: "Airport Special", img: vehCarnival },
  { name: "Mahindra XUV700", category: "SUV", seats: "6 + 1", bags: "4 Bags", fuel: "Diesel", best: "Comfort & power", img: vehXuv700 },
  { name: "Mahindra Scorpio N", category: "SUV", seats: "6 + 1", bags: "3 Bags", fuel: "Diesel", best: "Highway trips", img: vehScorpio },
  { name: "Honda City", category: "Sedan", seats: "4 + 1", bags: "2 Bags", fuel: "Petrol", best: "Airport transfer", badge: "One Way Bestseller", img: vehCity },
  { name: "Hyundai Verna", category: "Sedan", seats: "4 + 1", bags: "2 Bags", fuel: "Petrol", best: "City & business", img: vehVerna },
  { name: "Maruti Swift Dzire", category: "Economy", seats: "4 + 1", bags: "2 Bags", fuel: "Petrol", best: "City & short drops", badge: "Family Favourite", img: vehDzire },
  { name: "Honda Amaze", category: "Economy", seats: "4 + 1", bags: "2 Bags", fuel: "Petrol", best: "Budget airport rides", img: vehAmaze },
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
      <ScrollProgress />
      <Header />
      <Hero />
      <QuoteWidget />
      <StatsBar />
      <Services />
      <Fleet />
      <Routes />
      <Packages />
      <Testimonials />
      <Coverage />
      <HowItWorks />
      <WhyUs />
      <FAQ />
      <Instagram />
      <Contact />
      <Footer />
      <FloatingCall />

      <ScrollTop />
    </div>
  );
}

/* ---------------- HEADER ---------------- */
function Logo() {
  return (
    <img
      src={gmLogoMark.url}
      alt="GM Cabs Services Hyderabad"
      title="GM Cabs Services"
      width={954}
      height={518}
      decoding="async"
      fetchPriority="high"
      className="h-[60px] w-auto max-w-full object-contain md:h-[70px]"
    />
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-card shadow-card">
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between gap-4 px-4 md:h-20 md:px-8">
        <a href="#top" className="flex min-w-0 shrink items-center py-1.5" aria-label="GM Cabs Services home"><Logo /></a>

        <div className="flex shrink-0 items-center gap-3 lg:gap-6">
          <nav className="hidden items-center gap-7 text-sm font-medium text-foreground/80 lg:flex">
            <a href="#services" className="hover:text-orange-ink">Services</a>
            <a href="#fleet" className="hover:text-orange-ink">Fleet</a>
            <a href="#routes" className="hover:text-orange-ink">Routes</a>
            <a href="#packages" className="hover:text-orange-ink">Packages</a>
            <a href="#about" className="hover:text-orange-ink">About</a>
            <a href="#contact" className="hover:text-orange-ink">Contact</a>
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <a href={waLink} target="_blank" rel="noopener noreferrer" data-ga-name="WhatsApp — Header" data-ga-context="header" className="inline-flex items-center gap-1.5 rounded-full bg-[var(--whatsapp-ink)] px-4 py-2 text-xs font-semibold text-white shadow-card hover:opacity-90">
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp
            </a>
            <a href={telLink} className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-4 py-2 text-xs font-semibold text-white shadow-gold hover:opacity-90">
              📞 Call Now
            </a>
          </div>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Open menu"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-border bg-card text-primary shadow-card lg:hidden"
          >
            <span className="text-xl leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-card lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-sm font-medium">
            {[["Services", "#services"], ["Fleet", "#fleet"], ["Routes", "#routes"], ["Packages", "#packages"], ["About", "#about"], ["Contact", "#contact"]].map(([l, h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 hover:bg-accent">{l}</a>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2 pt-2">
              <a href={waLink} target="_blank" rel="noopener noreferrer" data-ga-name="WhatsApp — Mobile menu" data-ga-context="header_menu" className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--whatsapp-ink)] px-4 py-2.5 text-xs font-semibold text-white shadow-card">
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
    <section id="top" className="relative overflow-hidden bg-background">
      {/* soft premium backdrop — no harsh colour bars */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,color-mix(in_oklab,var(--gold)_16%,transparent)_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-accent/40" />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-8 md:px-8 md:pb-32 md:pt-14">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* 1 — VEHICLE: primary focal point, always fully visible */}
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-2xl">
              <div className="absolute inset-x-6 bottom-3 h-8 rounded-[100%] bg-primary/15 blur-2xl" />
              <img
                src={heroCab}
                alt="Premium white Toyota Innova airport taxi from GM Cabs Services at Rajiv Gandhi International Airport, Hyderabad — front three-quarter view"
                width={1600}
                height={1104}
                fetchPriority="high"
                decoding="async"
                className="relative w-full rounded-2xl object-contain shadow-elegant"
              />
              <div className="absolute bottom-3 left-3 rounded-full border border-border bg-background/90 px-3 py-1.5 text-[11px] font-semibold text-primary shadow-card backdrop-blur">
                🕐 24×7 · Airport Meet &amp; Greet
              </div>
            </div>
          </div>

          {/* 2 — HEADLINE, 3 — CTAs, 4 — TRUST */}
          <div className="order-2 animate-float-in lg:order-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-primary shadow-card">
              <span className="h-2 w-2 rounded-full bg-gold" /> ⭐ Hyderabad&apos;s Trusted Cab Partner
            </span>

            <h1 className="mt-5 font-display text-[2.1rem] font-bold leading-[1.08] text-primary sm:text-5xl md:text-6xl">
              Premium Cab Services
              <span className="block text-gold-ink">in Hyderabad</span>
            </h1>

            <p className="mt-4 text-base font-medium text-muted-foreground md:text-lg">
              Airport Transfers <span className="text-gold-ink">•</span> One Way Trips <span className="text-gold-ink">•</span> Outstation Travel
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#quote"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 py-4 text-sm font-bold text-white shadow-gold transition hover:opacity-90"
              >
                Book Now <span aria-hidden>→</span>
              </a>
              <a
                href={waFor("Airport & outstation cab booking")}
                target="_blank"
                rel="noopener noreferrer"
                data-ga-name="WhatsApp — Hero"
                data-ga-context="hero"
                aria-label="Book a cab on WhatsApp"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--whatsapp-ink)] px-7 py-4 text-sm font-bold text-white shadow-elegant transition hover:opacity-90"
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp Booking
              </a>
              <a
                href={telLink}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary bg-background px-7 py-4 text-sm font-bold text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                📞 Call Now
              </a>
            </div>


            <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { k: "10+ yrs", v: "Experience" },
                { k: "24×7", v: "Availability" },
                { k: "4.9★", v: "Rated service" },
                { k: "100%", v: "Verified drivers" },
              ].map((t) => (
                <div key={t.k} className="rounded-xl border border-border bg-card px-3 py-2.5 text-center shadow-card">
                  <dt className="font-display text-base font-bold text-primary">{t.k}</dt>
                  <dd className="mt-0.5 text-[11px] font-medium text-muted-foreground">{t.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ---------------- QUOTE WIDGET ---------------- */
type TripType = "airport" | "oneway" | "outstation" | "local";

const TRIP_TYPES: { id: TripType; label: string; icon: string; hint: string }[] = [
  { id: "airport", label: "Airport", icon: "✈️", hint: "Pickup / Drop at RGIA" },
  { id: "oneway", label: "One Way", icon: "➡️", hint: "Drop to any city" },
  { id: "outstation", label: "Outstation", icon: "🛣️", hint: "Round trip · Multi-day" },
  { id: "local", label: "Local (Hourly)", icon: "🏙️", hint: "8/12 hr packages" },
];

type QuoteVehicle = { id: string; name: string; seats: string; perKm: number; base: number; category: string };
const QUOTE_VEHICLES: QuoteVehicle[] = [
  { id: "dzire", name: "Swift Dzire / Amaze", seats: "4+1", perKm: 12, base: 250, category: "Sedan" },
  { id: "city", name: "Honda City / Verna", seats: "4+1", perKm: 14, base: 300, category: "Sedan+" },
  { id: "innova", name: "Toyota Innova", seats: "7+1", perKm: 17, base: 400, category: "SUV" },
  { id: "crysta", name: "Innova Crysta / Hycross", seats: "6+1", perKm: 20, base: 500, category: "Premium SUV" },
  { id: "fortuner", name: "Fortuner / Carnival", seats: "6+1", perKm: 28, base: 800, category: "Luxury" },
];

const KM_HINTS: Record<string, number> = {
  "warangal": 150, "vijayawada": 275, "guntur": 290, "tirupati": 560,
  "bangalore": 570, "visakhapatnam": 620, "vizag": 620, "chennai": 630,
  "rajahmundry": 445, "nellore": 460, "ongole": 370, "srisailam": 220,
  "yadagirigutta": 60, "ramoji": 30, "shamshabad": 30, "rgia": 30, "airport": 30,
  "pune": 560, "mumbai": 710, "kakinada": 500,
};

function guessKm(text: string): number | null {
  const t = text.toLowerCase();
  for (const key of Object.keys(KM_HINTS)) if (t.includes(key)) return KM_HINTS[key];
  return null;
}

function QuoteWidget() {
  const [trip, setTrip] = useState<TripType>("airport");
  const [vehicle, setVehicle] = useState<string>("crysta");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pax, setPax] = useState("2");
  const [quote, setQuote] = useState<{ low: number; high: number; km: number; note: string } | null>(null);

  const veh = QUOTE_VEHICLES.find((v) => v.id === vehicle)!;

  function calcQuote() {
    let result: { low: number; high: number; km: number; note: string };
    if (trip === "local") {
      const low = veh.base + veh.perKm * 80;
      const high = veh.base + veh.perKm * 120;
      result = { low, high, km: 0, note: "8–12 hr city package · fuel & driver included" };
    } else if (trip === "airport") {
      const low = Math.max(veh.base + veh.perKm * 25, 700);
      const high = veh.base + veh.perKm * 45;
      result = { low, high, km: 30, note: "Flat airport transfer within Hyderabad" };
    } else {
      const km = guessKm(drop) ?? guessKm(pickup) ?? 250;
      const multiplier = trip === "outstation" ? 2 : 1;
      const eff = km * multiplier;
      const low = veh.base + veh.perKm * eff;
      const high = low + veh.perKm * (trip === "outstation" ? 60 : 20);
      result = {
        low,
        high,
        km: eff,
        note: trip === "outstation" ? "Round trip · driver bata & tolls extra" : "One way drop · tolls extra",
      };
    }
    setQuote(result);
    trackEvent("quote_request", {
      trip_type: trip,
      service_type: TRIP_TYPES.find((t) => t.id === trip)?.label,
      vehicle_name: veh.name,
      vehicle_category: veh.category,
      pickup_location: pickup || undefined,
      drop_location: drop || undefined,
      passengers: Number(pax),
      estimate_low: result.low,
      estimate_high: result.high,
      estimate_km: result.km,
    });
  }

  function bookOnWhatsApp() {
    const lines = [
      "*GM Cabs — Quote Request*",
      `• Trip: ${TRIP_TYPES.find((t) => t.id === trip)?.label}`,
      `• Vehicle: ${veh.name} (${veh.seats})`,
      pickup && `• Pickup: ${pickup}`,
      drop && `• Drop: ${drop}`,
      date && `• Date: ${date}${time ? " · " + time : ""}`,
      `• Passengers: ${pax}`,
      quote && `• Est. fare: ₹${quote.low.toLocaleString("en-IN")} – ₹${quote.high.toLocaleString("en-IN")}${quote.km ? ` (~${quote.km} km)` : ""}`,
      quote?.note && `• Note: ${quote.note}`,
      "",
      "Please confirm availability and final fare.",
    ].filter(Boolean);
    const url = `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(lines.join("\n"))}`;
    trackEvent("book_now_click", {
      button_name: "Quote widget — Book on WhatsApp",
      trip_type: trip,
      service_type: TRIP_TYPES.find((t) => t.id === trip)?.label,
      vehicle_name: veh.name,
      vehicle_category: veh.category,
      pickup_location: pickup || undefined,
      drop_location: drop || undefined,
      passengers: Number(pax),
    });
    trackEvent("booking_started", {
      source: "quote_widget",
      trip_type: trip,
      vehicle_name: veh.name,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const showDrop = trip !== "local";
  const showPickupLabel = trip === "airport" ? "Pickup / Drop area" : "Pickup location";

  return (
    <section id="quote" className="relative z-10 -mt-10 px-4 md:-mt-16 md:px-8">
      <div className="mx-auto max-w-6xl rounded-2xl border border-border bg-card p-4 shadow-elegant md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-ink">Instant Quote</div>
            <h2 className="font-display text-xl font-bold text-primary md:text-2xl">Get a fare estimate in seconds</h2>
          </div>
          <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold text-secondary-foreground">No signup · WhatsApp confirmation</span>
        </div>

        {/* Trip type tabs */}
        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
          {TRIP_TYPES.map((t) => {
            const active = trip === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => { setTrip(t.id); setQuote(null); }}
                className={`rounded-xl border px-3 py-3 text-left transition ${active ? "border-orange bg-brand-gradient text-white shadow-gold" : "border-border bg-background hover:border-orange/50"}`}
              >
                <div className="text-lg">{t.icon} <span className="ml-1 text-sm font-semibold">{t.label}</span></div>
                <div className={`mt-0.5 text-[11px] ${active ? "text-white/85" : "text-muted-foreground"}`}>{t.hint}</div>
              </button>
            );
          })}
        </div>

        {/* Fields */}
        <div className="mt-4 grid gap-3 md:grid-cols-12">
          <div className={`md:col-span-${showDrop ? "4" : "6"}`}>
            <label className="text-xs font-semibold text-muted-foreground">{showPickupLabel}</label>
            <input
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder={trip === "airport" ? "e.g. Gachibowli" : "e.g. HITEC City, Hyderabad"}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange"
            />
          </div>
          {showDrop && (
            <div className="md:col-span-4">
              <label className="text-xs font-semibold text-muted-foreground">Drop location</label>
              <input
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                placeholder={trip === "outstation" ? "e.g. Vijayawada" : "e.g. RGIA Airport"}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange"
              />
            </div>
          )}
          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-muted-foreground">Date</label>
            <input type="date" aria-label="Travel date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-muted-foreground">Time</label>
            <input type="time" aria-label="Pickup time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange" />
          </div>
        </div>

        {/* Vehicle picker */}
        <div className="mt-4">
          <label className="text-xs font-semibold text-muted-foreground">Choose vehicle</label>
          <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-5">
            {QUOTE_VEHICLES.map((v) => {
              const active = vehicle === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => { setVehicle(v.id); setQuote(null); }}
                  className={`rounded-xl border px-3 py-2.5 text-left transition ${active ? "border-gold bg-primary text-primary-foreground shadow-elegant" : "border-border bg-background hover:border-gold/50"}`}
                >
                  <div className="text-sm font-semibold leading-tight">{v.name}</div>
                  <div className={`mt-0.5 text-[11px] ${active ? "text-white/80" : "text-muted-foreground"}`}>{v.category} · {v.seats}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm">
            <label className="text-xs font-semibold text-muted-foreground">Passengers</label>
            <select aria-label="Passengers" value={pax} onChange={(e) => setPax(e.target.value)} className="rounded-lg border border-input bg-background px-2.5 py-2 text-sm outline-none focus:border-orange">
              {[1,2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={calcQuote} className="inline-flex items-center gap-2 rounded-full border border-primary bg-background px-5 py-2.5 text-sm font-semibold text-primary hover:bg-secondary">
              💰 Get Instant Quote
            </button>
            <button type="button" onClick={bookOnWhatsApp} className="inline-flex items-center gap-2 rounded-full bg-[var(--whatsapp-ink)] px-5 py-2.5 text-sm font-semibold text-white shadow-elegant hover:opacity-90">
              <WhatsAppIcon className="h-4 w-4" /> Book on WhatsApp
            </button>
          </div>
        </div>

        {quote && (
          <div className="mt-4 rounded-xl border border-gold/40 bg-gold/10 p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-widest text-orange-ink">Estimated fare</div>
                <div className="font-display text-2xl font-bold text-primary md:text-3xl">
                  ₹{quote.low.toLocaleString("en-IN")} <span className="text-muted-foreground">–</span> ₹{quote.high.toLocaleString("en-IN")}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{veh.name} · {quote.note}{quote.km ? ` · ~${quote.km} km` : ""}</div>
              </div>
              <div className="text-[11px] text-muted-foreground max-w-xs">
                Indicative estimate. Final fare confirmed on WhatsApp based on live route, tolls & waiting.
              </div>
            </div>
          </div>
        )}
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
      <div className="mt-12 grid auto-rows-fr gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <article key={s.title} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elegant">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={s.img} alt={`${s.title} — GM Cabs Services in Hyderabad`} loading="lazy" decoding="async" width={1280} height={800} className="h-full w-full object-cover transition duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent" />
              <div className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-xl bg-background/95 text-xl shadow-card">{s.icon}</div>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-xl font-bold leading-snug text-primary">{s.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <Link to="/services/$slug" params={{ slug: s.slug }} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-orange-ink hover:text-primary">
                Learn more <span aria-hidden>→</span>
              </Link>
              <div className="mt-5 flex gap-2 pt-1 [margin-top:auto]">
                <a href={waFor(s.title)} target="_blank" rel="noopener noreferrer" data-ga-name={`WhatsApp — ${s.title}`} data-ga-context="service_card" aria-label={`Book ${s.title} on WhatsApp`} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[var(--whatsapp-ink)] px-3 py-2 text-xs font-semibold text-white hover:opacity-90">
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
              onClick={() => { setCat(c); trackEvent("vehicle_category_view", { vehicle_category: c }); }}
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
                <img src={v.img} alt={`${v.name} ${v.category} chauffeur-driven cab for hire in Hyderabad`} loading="lazy" decoding="async" width={1280} height={800} className="h-full w-full object-cover transition duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
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
                  <a href={waFor(`${v.name} booking`)} target="_blank" rel="noopener noreferrer" data-ga-name={`WhatsApp — ${v.name}`} data-ga-context="fleet_card" aria-label={`Book ${v.name} on WhatsApp`} className="inline-flex flex-1 items-center justify-center gap-1 rounded-full bg-[var(--whatsapp-ink)] px-3 py-2 text-[11px] font-semibold text-white hover:opacity-90">
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
        {TRIP_ROUTE_LIST.map((r) => (
          <div
            key={r.slug}
            className="group flex items-center justify-between gap-2 rounded-xl border border-border bg-card px-4 py-3.5 shadow-card transition hover:-translate-y-0.5 hover:border-orange hover:shadow-elegant"
          >
            <Link
              to="/routes/$slug"
              params={{ slug: r.slug }}
              className="min-w-0 flex-1"
              aria-label={`Hyderabad to ${r.city} cab — route details`}
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-primary">
                <span>Hyderabad</span>
                <span className="text-orange-ink">→</span>
                <span className="truncate">{r.city}</span>
              </span>
              <span className="mt-0.5 block text-[11px] text-muted-foreground">{r.km} km · approx {r.hours}</span>
            </Link>
            <a
              href={waFor(`Hyderabad to ${r.city} taxi`)}
              target="_blank"
              rel="noopener noreferrer"
              data-ga-name={`WhatsApp — Hyderabad to ${r.city}`}
              data-ga-context="route_card"
              aria-label={`Book a Hyderabad to ${r.city} taxi on WhatsApp`}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-orange-ink transition hover:bg-brand-gradient hover:text-white"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          to="/routes"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-primary transition hover:border-orange"
        >
          View all outstation route guides →
        </Link>
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
        <div className="mt-12 grid auto-rows-fr gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((p) => (
            <article key={p.title} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:border-orange hover:shadow-elegant">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-orange-ink">{p.tag}</div>
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
              <a href={waFor(`${p.title} package`)} target="_blank" rel="noopener noreferrer" data-ga-name={`WhatsApp — ${p.title}`} data-ga-context="package_card" aria-label={`Get a quote for ${p.title} on WhatsApp`} className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-4 py-2.5 text-xs font-semibold text-white shadow-gold hover:opacity-90">
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
              <div className="font-display text-4xl font-bold text-orange-ink-ink/90">{s.step}</div>
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
          <span className="text-xs font-semibold uppercase tracking-widest text-orange-ink">Why GM Cabs</span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">A local Hyderabad cab service you can rely on.</h2>
          <p className="mt-5 text-white/80">
            Founded by <strong className="text-white">Mohsin Khan</strong>, GM Cabs Services has grown into one of Nacharam's trusted travel partners — with a premium fleet, verified chauffeurs and a passion for punctual, comfortable rides across Hyderabad, Telangana and Andhra Pradesh.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={waLink} target="_blank" rel="noopener noreferrer" data-ga-name="WhatsApp — About section" data-ga-context="about" className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-gold hover:opacity-90">
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
                <span className="text-orange-ink transition group-open:rotate-45">+</span>
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
          <a href={waLink} target="_blank" rel="noopener noreferrer" data-ga-name="WhatsApp — Contact section" data-ga-context="contact" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--whatsapp-ink)] px-6 py-3.5 text-sm font-semibold text-white shadow-elegant hover:opacity-90">
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
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-ink">Follow Us</span>
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
        >
          <img src={instagramQR.url} alt="GM Cabs Instagram QR code — @gmcabs786" className="h-auto w-full rounded-xl" loading="lazy" decoding="async" width={512} height={512} />
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
            <img src={gmLogo.url} alt="GM Cabs Services" width={44} height={44} loading="lazy" decoding="async" className="rounded-lg" />
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
            <li>✉️ <a href={`mailto:${EMAIL_RENTALS}`} className="hover:text-orange break-all">{EMAIL_RENTALS}</a></li>
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

/* ---------------- SCROLL TOP ---------------- */



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
      className="fixed bottom-[88px] right-4 z-40 grid h-11 w-11 sm:bottom-24 sm:right-6 place-items-center rounded-full bg-primary text-white shadow-elegant transition hover:bg-orange"
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
  const startedRef = useRef(false);
  useEffect(() => { bookingStore.set(form); }, [form]);
  useEffect(() => () => { bookingStore.set(EMPTY_DRAFT); }, []);
  const validated: BookingFields[] = ["phone", "pickup", "drop", "date", "time", "passengers"];

  function runValidation(next: Record<BookingFields, string>): Errors {
    const errs: Errors = {};
    for (const f of validated) { const msg = validateField(f, next[f], next); if (msg) errs[f] = msg; }
    return errs;
  }

  const update = (k: BookingFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...form, [k]: e.target.value };
    setForm(next);
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("booking_started", { source: "booking_form", first_field: k });
    }
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
    const eventParams = {
      service_type: form.service,
      vehicle_category: form.car,
      trip_type: form.tripType,
      pickup_location: form.pickup,
      drop_location: form.drop,
      passengers: Number(form.passengers) || undefined,
      luggage: Number(form.luggage) || undefined,
      travel_date: form.date,
      travel_time: form.time || undefined,
    };
    trackEvent("contact_form_submit", { form_name: "booking_form", ...eventParams });
    trackEvent("enquiry_submitted", eventParams);
    trackEvent("booking_completed", eventParams);
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
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--whatsapp-ink)] px-6 py-3.5 text-sm font-semibold text-white shadow-elegant transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
        <WhatsAppIcon className="h-5 w-5" /> Send booking on WhatsApp
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">Your details open in WhatsApp so you can review before sending.</p>
    </form>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-ink">{eyebrow}</span>
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

/* ---------------- SCROLL PROGRESS ---------------- */
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[60] h-[3px] w-full bg-transparent">
      <div
        className="h-full bg-brand-gradient transition-[width] duration-150 ease-out"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}

/* ---------------- FLOATING CALL ---------------- */
function FloatingCall() {
  return (
    <a
      href={telLink}
      aria-label="Call GM Cabs Services"
      title="Call now"
      className="fixed bottom-6 left-6 z-50 hidden h-12 w-12 place-items-center rounded-full bg-orange text-white shadow-elegant transition hover:scale-105 sm:grid sm:h-14 sm:w-14"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden>
        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.21 2.2z" />
      </svg>
    </a>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
const testimonials = [
  { name: "Rakesh Menon", role: "Corporate Traveller · HITEC City", stars: 5, text: "GM Cabs has been our go-to for airport transfers for over a year. Immaculate cars, punctual chauffeurs and zero hidden charges." },
  { name: "Priya Reddy", role: "Family trip to Tirupati", stars: 5, text: "Booked a Crysta for a 2-day Tirupati darshan. The driver was courteous, the car was spotless, and the whole trip felt safe and premium." },
  { name: "Ahmed Hussain", role: "Wedding · Banjara Hills", stars: 5, text: "Arranged a Fortuner and two Innovas for our wedding. On time, decorated beautifully, and the team handled everything without fuss." },
  { name: "Sneha Iyer", role: "Outstation · Hyderabad → Bangalore", stars: 5, text: "Very transparent booking on WhatsApp. Fair pricing, smooth Hycross, and the driver Mohsin bhai was incredibly professional." },
  { name: "Vikram Naidu", role: "Airport pickup · RGIA", stars: 5, text: "Landed at 2 AM and the cab was already waiting at the gate. Clean car, friendly driver — exactly what a premium taxi should feel like." },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="reviews" className="border-t border-border bg-gradient-to-b from-background to-secondary/40 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
            ★ 4.9 / 5 · Verified guests
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">Loved by travellers across Hyderabad</h2>
          <p className="mt-2 text-sm text-muted-foreground">Real stories from families, executives and wedding guests.</p>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-elegant md:p-10">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${i * 100}%)` }}
          >
            {testimonials.map((t) => (
              <div key={t.name} className="w-full shrink-0 px-2 md:px-6">
                <div className="mx-auto max-w-3xl text-center">
                  <div className="mb-3 text-gold" aria-label={`${t.stars} out of 5 stars`}>
                    {"★".repeat(t.stars)}
                    <span className="text-muted-foreground/40">{"★".repeat(5 - t.stars)}</span>
                  </div>
                  <p className="font-display text-lg italic leading-relaxed text-foreground md:text-2xl">
                    “{t.text}”
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-white">
                      {t.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-foreground">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Show review ${idx + 1}`}
                className="grid h-11 w-11 place-items-center"
                type="button"
              >
                <span
                  aria-hidden="true"
                  className={`block h-2 rounded-full transition-all ${idx === i ? "w-8 bg-orange" : "w-2 bg-border hover:bg-muted-foreground/40"}`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

