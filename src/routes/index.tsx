import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroCab from "@/assets/hero-cab.jpg";
import airportImg from "@/assets/airport.jpg";
import outstationImg from "@/assets/outstation.jpg";
import localImg from "@/assets/local.jpg";
import ramojiImg from "@/assets/ramoji.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const PHONE = "6301875485";
const PHONE_INTL = "916301875485";
const EMAIL = "gmcabs@gmail.com";
const ADDRESS = "H.No: 7-6/16, Sri Sai Colony, Nacharam, Hyderabad - 500076";

// Build a WhatsApp deep-link with a message tailored to the context
// (section on the page + current app route).
function waFor(context?: string, route?: string) {
  const base = "Hi GM Cabs,";
  const ctx = context
    ? ` I'm interested in *${context}*.`
    : " I would like to book a cab.";
  const from = route && route !== "/" ? ` (from page: ${route})` : "";
  const msg = `${base}${ctx}${from} Please share availability and pricing.`;
  return `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(msg)}`;
}
const waLink = waFor();
const telLink = `tel:+${PHONE_INTL}`;

// Map each in-page section id to a contextual WhatsApp message.
const SECTION_CONTEXT: Record<string, string> = {
  services: "your cab services",
  fleet: "your car fleet options",
  packages: "your Hyderabad cab packages",
  about: "GM Cabs Services",
  contact: "booking a cab",
};

const services = [
  { title: "Airport Drop", desc: "On-time pickups to Rajiv Gandhi International Airport with luggage assistance and flight tracking.", img: airportImg, icon: "✈️" },
  { title: "Airport Pickup", desc: "Meet-and-greet at arrivals, no waiting — clean cars ready 24×7 for late-night flights.", img: airportImg, icon: "🛬" },
  { title: "Local Rental", desc: "Hourly packages (4/8/12 hrs) across Hyderabad — perfect for meetings, shopping and city errands.", img: localImg, icon: "🏙️" },
  { title: "Outstation Trips", desc: "One-way or round trip to Bangalore, Vijayawada, Vizag, Tirupati and more with courteous drivers.", img: outstationImg, icon: "🛣️" },
  { title: "Sightseeing Tours", desc: "Ramoji Film City, Yadagirigutta, Statue of Equality and full Hyderabad city tour packages.", img: ramojiImg, icon: "📸" },
  { title: "Corporate Travel", desc: "Monthly billing, dedicated drivers and premium sedans for business travel and employee transport.", img: heroCab, icon: "💼" },
];

const fleet = [
  { name: "Sedan", ex: "Dzire · Etios · Xcent", seats: "4 + 1", bag: "2 Bags" },
  { name: "SUV", ex: "Ertiga · Innova", seats: "6 + 1", bag: "4 Bags" },
  { name: "Premium", ex: "Crysta · Hycross", seats: "6 + 1", bag: "5 Bags" },
  { name: "Tempo Traveller", ex: "12–17 Seater", seats: "12–17", bag: "Group" },
];

const packages = [
  {
    title: "8 Hrs / 80 Kms",
    tag: "City Package",
    duration: "8 Hours",
    distance: "80 Kms",
    ideal: "Meetings & shopping",
    includes: ["Fuel", "Driver charges", "Parking", "AC"],
  },
  {
    title: "12 Hrs / 120 Kms",
    tag: "Extended Day",
    duration: "12 Hours",
    distance: "120 Kms",
    ideal: "Full-day city errands",
    includes: ["Fuel", "Driver charges", "Parking", "AC"],
  },
  {
    title: "Hyderabad City Tour",
    tag: "Sightseeing",
    duration: "10 Hours",
    distance: "100 Kms",
    ideal: "Charminar, Golconda, Hussain Sagar",
    includes: ["Multi-stop", "Driver guide", "AC", "Bottled water"],
  },
  {
    title: "Ramoji Film City",
    tag: "Full Day",
    duration: "12 Hours",
    distance: "120 Kms",
    ideal: "Family day out",
    includes: ["Pickup & drop", "Waiting time", "AC", "Toll"],
  },
  {
    title: "Yadagirigutta Darshan",
    tag: "Round Trip",
    duration: "8 Hours",
    distance: "180 Kms",
    ideal: "Temple visit",
    includes: ["Round trip", "Waiting time", "AC", "Toll"],
  },
  {
    title: "Statue of Equality",
    tag: "Half Day",
    duration: "6 Hours",
    distance: "90 Kms",
    ideal: "Muchintal sightseeing",
    includes: ["Pickup & drop", "Waiting time", "AC", "Parking"],
  },
];

const whyUs = [
  { t: "Verified Drivers", d: "Trained, licensed & background-checked chauffeurs." },
  { t: "Transparent Booking", d: "Clear confirmations on WhatsApp — no hidden surprises." },
  { t: "24/7 Availability", d: "Round-the-clock booking and support across Hyderabad." },
  { t: "Well-Maintained Cars", d: "Sanitised, AC cabs serviced regularly for a smooth ride." },
];

// Coverage helps users see how far we go and what routes are supported.
const coverage = [
  { icon: "🏙️", label: "All Hyderabad", detail: "Secunderabad · Gachibowli · HITEC City · LB Nagar · Kompally" },
  { icon: "✈️", label: "RGIA Airport", detail: "24×7 pickup & drop with flight tracking" },
  { icon: "🛕", label: "Pilgrim Trips", detail: "Tirupati · Yadagirigutta · Vemulawada · Srisailam" },
  { icon: "🌆", label: "Outstation", detail: "Bangalore · Vijayawada · Vizag · Chennai · Pune" },
];

// Simple, calm process to reassure first-time visitors.
const process = [
  { step: "01", t: "Share your trip", d: "Tell us pickup, drop, date & car type on WhatsApp or call." },
  { step: "02", t: "Get instant quote", d: "We confirm availability and a transparent fare." },
  { step: "03", t: "Driver assigned", d: "You receive driver name, photo and vehicle number." },
  { step: "04", t: "Ride & pay", d: "Enjoy the trip — pay by cash, UPI or online transfer." },
];

// Real questions people ask before booking.
const faqs = [
  { q: "How do I book a cab?", a: "Tap the WhatsApp button or call 6301875485. Share pickup, drop, date and time — we confirm within minutes." },
  { q: "Do you provide outstation and one-way trips?", a: "Yes. We handle round trip and one-way outstation to Bangalore, Vijayawada, Vizag, Tirupati and more." },
  { q: "Are your drivers verified?", a: "Every driver is licensed, background-verified and trained in safe, courteous driving." },
  { q: "What payment options do you accept?", a: "Cash, UPI (GPay / PhonePe / Paytm) and direct bank transfer. Corporate invoicing is available on request." },
  { q: "Can I cancel or reschedule?", a: "Yes — free cancellation up to 2 hours before pickup. Reschedule anytime by messaging us." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <a href="#top" className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-gold-gradient font-display text-lg font-bold text-gold-foreground shadow-gold">GM</span>
            <div className="leading-tight">
              <div className="font-display text-lg font-bold text-primary">GM Cabs</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Services · Hyderabad</div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/80 md:flex">
            <a href="#services" className="hover:text-primary">Services</a>
            <a href="#fleet" className="hover:text-primary">Fleet</a>
            <a href="#packages" className="hover:text-primary">Packages</a>
            <a href="#about" className="hover:text-primary">About</a>
            <a href="#contact" className="hover:text-primary">Contact</a>
          </nav>
          <a href={telLink} className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:opacity-90 md:inline-flex">
            📞 {PHONE}
          </a>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden">
        <img src={heroCab} alt="Premium cab on Hyderabad highway at sunset" width={1920} height={1200} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-gradient opacity-90" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-36">
          <div className="max-w-2xl animate-float-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-gold" /> Hyderabad's Trusted Cabs
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white md:text-6xl">
              The best car travel <br />
              <span className="bg-gold-gradient bg-clip-text text-transparent">experience in Hyderabad.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/85 md:text-lg">
              Airport transfers, local rentals, outstation trips and sightseeing tours — all types of cars, professional drivers, round the clock.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[var(--whatsapp)] px-6 py-3.5 text-sm font-semibold text-white shadow-elegant transition hover:opacity-90">
                <WhatsAppIcon className="h-5 w-5" /> Book on WhatsApp
              </a>
              <a href={telLink} className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-3.5 text-sm font-semibold text-gold-foreground shadow-gold transition hover:opacity-90">
                📞 Call {PHONE}
              </a>
            </div>
            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 text-white">
              {[["10+", "Years Trusted"], ["24/7", "Availability"], ["100%", "Safe Rides"]].map(([n, l]) => (
                <div key={l} className="rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur">
                  <div className="font-display text-2xl font-bold text-gold">{n}</div>
                  <div className="text-xs uppercase tracking-wider text-white/70">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionHead eyebrow="What We Offer" title="Cab services built around your journey" sub="From quick airport runs to multi-day outstation trips, choose the service that fits your plan." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.title} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elegant">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-xl bg-background/95 text-xl shadow-card">{s.icon}</div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <a href={waFor(s.title)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-gold">
                  Book this service →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="fleet" className="bg-accent/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHead eyebrow="Our Fleet" title="All types of cars available" sub="Choose from compact sedans to spacious tempo travellers — every cab is clean, insured and ready." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {fleet.map((f) => (
              <div key={f.name} className="rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elegant">
                <div className="grid h-14 w-14 place-items-center rounded-xl bg-gold-gradient text-2xl shadow-gold">🚗</div>
                <h3 className="mt-5 font-display text-xl font-bold text-primary">{f.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.ex}</p>
                <div className="mt-4 flex justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                  <span>👥 {f.seats}</span>
                  <span>🧳 {f.bag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionHead eyebrow="Popular Packages" title="Ready-made cab packages in Hyderabad" sub="Popular trips our customers book most — every package includes fuel, driver and AC." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((p) => (
            <article key={p.title} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:border-gold hover:shadow-elegant">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-gold">{p.tag}</div>
              <h3 className="mt-1 font-display text-xl font-bold text-primary">{p.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">Ideal for {p.ideal}</p>

              <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-accent/50 p-3 text-xs">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Duration</div>
                  <div className="mt-0.5 font-semibold text-primary">⏱ {p.duration}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Distance</div>
                  <div className="mt-0.5 font-semibold text-primary">📍 {p.distance}</div>
                </div>
              </div>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {p.includes.map((i) => (
                  <li key={i} className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground">
                    ✓ {i}
                  </li>
                ))}
              </ul>

              <a
                href={waFor(`${p.title} package`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground transition hover:bg-gold hover:text-gold-foreground"
              >
                <WhatsAppIcon className="h-4 w-4" /> Get quote on WhatsApp
              </a>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">* Fare depends on car type, kms travelled and season. Message us for an exact quote — no obligation.</p>
      </section>

      {/* SERVICE COVERAGE */}
      <section className="bg-accent/40 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHead eyebrow="Coverage" title="Where we drive" sub="From every Hyderabad neighbourhood to long outstation routes." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coverage.map((c) => (
              <div key={c.label} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gold-gradient text-2xl shadow-gold">{c.icon}</div>
                <h3 className="mt-4 font-display text-lg font-bold text-primary">{c.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
        <SectionHead eyebrow="How it works" title="Booking a cab in 4 simple steps" sub="No apps, no accounts — just message or call us." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((s) => (
            <div key={s.step} className="relative rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="font-display text-4xl font-bold text-gold/80">{s.step}</div>
              <h3 className="mt-2 font-display text-lg font-bold text-primary">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="bg-hero-gradient py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:px-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">About GM Cabs</span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">A local Hyderabad cab service you can rely on.</h2>
            <p className="mt-5 text-white/80">
              Founded by <strong className="text-white">Mohsin Khan</strong>, GM Cabs Services has grown into one of Nacharam's trusted travel partners. We focus on one thing — giving every rider a safe, comfortable and professional journey across Hyderabad and beyond.
            </p>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold text-gold-foreground shadow-gold">
              <WhatsAppIcon className="h-4 w-4" /> Chat with us
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {whyUs.map((w) => (
              <div key={w.t} className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-gold text-gold-foreground">✓</div>
                <h3 className="mt-4 font-display text-lg font-bold text-white">{w.t}</h3>
                <p className="mt-1 text-sm text-white/75">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionHead eyebrow="Get in Touch" title="Book your cab in one call" sub="Reach us anytime — we respond within minutes." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <ContactCard icon="📞" title="Call / SMS" line={PHONE} href={telLink} />
          <ContactCard icon="✉️" title="Email" line={EMAIL} href={`mailto:${EMAIL}`} />
          <ContactCard icon="📍" title="Visit Us" line={ADDRESS} />
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[var(--whatsapp)] px-8 py-4 text-base font-semibold text-white shadow-elegant transition hover:opacity-90">
            <WhatsAppIcon className="h-5 w-5" /> Message on WhatsApp
          </a>
          <a href={telLink} className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-elegant transition hover:opacity-90">
            📞 Call {PHONE}
          </a>
        </div>
      </section>

      <footer className="border-t border-border bg-primary py-10 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold-gradient font-display text-sm font-bold text-gold-foreground">GM</span>
            <div className="text-sm">
              <div className="font-semibold">GM Cabs Services</div>
              <div className="text-xs text-primary-foreground/70">Proprietor: Mohsin Khan</div>
            </div>
          </div>
          <div className="text-xs text-primary-foreground/70">© {new Date().getFullYear()} GM Cabs Services. All rights reserved.</div>
        </div>
      </footer>

      <FloatingWhatsApp />
    </div>
  );
}

function FloatingWhatsApp() {
  const [section, setSection] = useState<string | null>(null);
  const route = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ids = Object.keys(SECTION_CONTEXT);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
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
        for (const [id, ratio] of visible) {
          if (ratio > best) {
            best = ratio;
            top = id;
          }
        }
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
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[var(--whatsapp)] py-3 pl-3 pr-4 text-white shadow-elegant animate-pulse-ring transition hover:scale-105"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="hidden text-sm font-semibold sm:inline">
        {context ? "Ask about this" : "Chat with us"}
      </span>
    </a>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">{title}</h2>
      <p className="mt-3 text-muted-foreground">{sub}</p>
    </div>
  );
}

function ContactCard({ icon, title, line, href }: { icon: string; title: string; line: string; href?: string }) {
  const inner = (
    <>
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-gold-gradient text-xl shadow-gold">{icon}</div>
      <h3 className="mt-4 font-display text-lg font-bold text-primary">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{line}</p>
    </>
  );
  const cls = "block rounded-2xl border border-border bg-card p-6 text-left shadow-card transition hover:-translate-y-1 hover:border-gold hover:shadow-elegant";
  return href ? <a href={href} className={cls}>{inner}</a> : <div className={cls}>{inner}</div>;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.15-.174.199-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 2C6.58 2 2.13 6.451 2.13 11.912a9.87 9.87 0 0 0 1.417 5.086L2 22l5.13-1.517a9.86 9.86 0 0 0 4.91 1.29c5.462 0 9.912-4.45 9.912-9.912S17.502 2 12.04 2z" />
    </svg>
  );
}
