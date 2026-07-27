import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import airportImg from "@/assets/airport.webp";
import outstationImg from "@/assets/outstation.webp";
import localImg from "@/assets/local.webp";
import ramojiImg from "@/assets/ramoji.webp";
import heroCab from "@/assets/hero-cab.webp";
import fleetPair from "@/assets/fleet-pair.png.asset.json";

const PHONE_INTL = "916301875485";
const telLink = `tel:+${PHONE_INTL}`;
function wa(msg: string) {
  return `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(msg)}`;
}

type ServiceDetail = {
  slug: string;
  title: string;
  tagline: string;
  hero: string;
  intro: string;
  highlights: { icon: string; label: string; desc: string }[];
  includes: string[];
  steps: { title: string; desc: string }[];
  vehicles: string[];
  faqs: { q: string; a: string }[];
  seo: { title: string; desc: string };
};

export const SERVICES: Record<string, ServiceDetail> = {
  "airport-pickup": {
    slug: "airport-pickup",
    title: "Airport Pickup",
    tagline: "24×7 meet-and-greet at Rajiv Gandhi International Airport",
    hero: airportImg,
    intro:
      "Land in Hyderabad with a professional chauffeur already waiting at the gate. We track your flight in real time so late arrivals, early landings or delays are handled without extra charges.",
    highlights: [
      { icon: "🛬", label: "Live flight tracking", desc: "We monitor your flight — driver waits even if you're delayed." },
      { icon: "🪧", label: "Meet & greet", desc: "Chauffeur meets you at Arrivals with a name placard." },
      { icon: "🧳", label: "Luggage assistance", desc: "Help with bags to the car, spacious boot for family travel." },
      { icon: "🕐", label: "24×7 availability", desc: "Red-eye or dawn landings — we operate round the clock." },
    ],
    includes: ["Toll & parking", "Waiting time up to 60 mins", "Bottled water", "Sanitized AC cab", "Verified professional driver"],
    steps: [
      { title: "Share flight details", desc: "Send flight number, landing time and drop location on WhatsApp." },
      { title: "Get confirmation", desc: "Receive driver details 2 hours before arrival." },
      { title: "Meet at Arrivals", desc: "Look for the placard at the pickup zone." },
      { title: "Ride home", desc: "Relaxed drive with GPS tracked route." },
    ],
    vehicles: ["Honda City / Amaze (Sedan)", "Toyota Innova Crysta", "Innova Hycross", "Kia Carnival (Luxury)"],
    faqs: [
      { q: "What if my flight is delayed?", a: "No problem. We track your flight and reschedule automatically at no extra cost." },
      { q: "How much waiting time is free?", a: "Up to 60 minutes after landing is included, covering baggage and immigration." },
    ],
    seo: { title: "Airport Pickup Taxi in Hyderabad | RGIA 24×7 — GM Cabs", desc: "Book premium airport pickup at Rajiv Gandhi International Airport (RGIA) Hyderabad. Meet-and-greet, flight tracking, luggage help — 24×7." },
  },
  "airport-drop": {
    slug: "airport-drop",
    title: "Airport Drop",
    tagline: "On-time drops to RGIA with luggage assistance",
    hero: airportImg,
    intro:
      "Fixed, transparent pricing for airport drops from anywhere in Hyderabad to Rajiv Gandhi International Airport. Clean, spacious cabs and drivers who know every route and shortcut.",
    highlights: [
      { icon: "⏱️", label: "On-time guarantee", desc: "Live traffic-aware pickup time so you never miss a flight." },
      { icon: "🚗", label: "Clean, AC cabs", desc: "Sanitized before every trip — sedan to luxury SUV options." },
      { icon: "📍", label: "Doorstep pickup", desc: "From any residence, hotel or office across Hyderabad." },
      { icon: "💳", label: "Flexible payment", desc: "UPI, cash or corporate billing." },
    ],
    includes: ["Toll & airport entry", "Doorstep pickup", "AC & fuel", "Sanitized cab", "Professional driver"],
    steps: [
      { title: "Share pickup + flight time", desc: "Send address and departure time on WhatsApp." },
      { title: "Approve fare", desc: "Get an instant quote based on car type and distance." },
      { title: "Cab arrives 10 mins early", desc: "Driver contacts you 30 mins prior with details." },
      { title: "Reach RGIA on time", desc: "Direct drop at Departures — Terminal 1 or International." },
    ],
    vehicles: ["Sedan (4+1)", "SUV — Innova Crysta / Hycross", "Luxury — Fortuner / Carnival"],
    faqs: [
      { q: "How early should I book?", a: "For best availability, book at least 4 hours in advance. Same-day bookings are usually possible on WhatsApp." },
      { q: "Do you provide receipts for corporate travel?", a: "Yes — GST-compliant invoices are available on request." },
    ],
    seo: { title: "Airport Drop Taxi in Hyderabad | RGIA On-Time Cabs — GM Cabs", desc: "On-time airport drops to RGIA Hyderabad. Doorstep pickup, sedan to luxury SUV, transparent fares, 24×7 WhatsApp booking." },
  },
  "one-way-taxi": {
    slug: "one-way-taxi",
    title: "One Way Taxi",
    tagline: "Pay only one side — perfect for one-direction travel",
    hero: outstationImg,
    intro:
      "Travelling only one way? Skip the round-trip cost. Our one-way taxi service covers all major routes across Telangana and Andhra Pradesh with fair, no-hidden-charges pricing.",
    highlights: [
      { icon: "➡️", label: "One-side charge", desc: "You pay only for the drop distance." },
      { icon: "🛣️", label: "All major routes", desc: "Hyderabad ↔ Vijayawada, Bangalore, Vizag, Tirupati & more." },
      { icon: "🧑‍✈️", label: "Trained drivers", desc: "Highway experience, safe night driving." },
      { icon: "💰", label: "Transparent quote", desc: "Fixed fare confirmed before pickup." },
    ],
    includes: ["Fuel & driver bata", "Toll (extra)", "AC cab", "State permit"],
    steps: [
      { title: "Tell us pickup + drop city", desc: "Send route and travel date via WhatsApp." },
      { title: "Get fixed one-way fare", desc: "Confirmed price for your chosen car type." },
      { title: "Cab arrives at doorstep", desc: "Start your journey on schedule." },
      { title: "Drop at destination", desc: "No return charges — pay only one side." },
    ],
    vehicles: ["Sedan — Honda City / Dzire", "Innova Crysta / Hycross", "Tempo Traveller (12+1)"],
    faqs: [
      { q: "Is state tax included?", a: "State permit is included. Inter-state tolls are billed as actuals." },
      { q: "Can I stop for meals or sightseeing?", a: "Yes — short breaks are complimentary; extended halts may be chargeable." },
    ],
    seo: { title: "One Way Taxi from Hyderabad | Pay Only One Side — GM Cabs", desc: "Affordable one-way cabs from Hyderabad to Vijayawada, Bangalore, Vizag, Tirupati and more. Fixed fare, no return charges, sedan to Innova." },
  },
  "outstation-cabs": {
    slug: "outstation-cabs",
    title: "Outstation Cabs",
    tagline: "Round trip & multi-day cabs from Hyderabad",
    hero: outstationImg,
    intro:
      "Plan a weekend getaway or a multi-day tour with a chauffeur who knows the roads. Round-trip and multi-day outstation packages with clean, well-maintained cars for family and group travel.",
    highlights: [
      { icon: "🌆", label: "Any destination", desc: "Bangalore, Vijayawada, Vizag, Tirupati, Chennai, Pune, Goa." },
      { icon: "🛌", label: "Multi-day rentals", desc: "Driver stays with the vehicle across days." },
      { icon: "🚙", label: "Family SUVs", desc: "Spacious Innova Crysta / Hycross for 6–7 passengers." },
      { icon: "🧾", label: "Clear billing", desc: "Per-km rate + driver bata — no surprises." },
    ],
    includes: ["Driver bata", "Fuel", "State permit", "AC", "Insurance"],
    steps: [
      { title: "Share itinerary", desc: "Cities, dates, halts and number of passengers." },
      { title: "Get custom quote", desc: "Choose sedan, SUV or Tempo based on group size." },
      { title: "Advance booking", desc: "Confirm with a small advance — cab reserved." },
      { title: "Enjoy the trip", desc: "Professional driver, GPS tracked, 24×7 support." },
    ],
    vehicles: ["Innova Crysta", "Innova Hycross", "Fortuner", "Tempo Traveller (12+1)"],
    faqs: [
      { q: "How is the fare calculated?", a: "Total km × per-km rate + driver bata (per day) + tolls & state permits at actuals." },
      { q: "Where does the driver stay?", a: "Driver bata covers meals and stay. You are not responsible for accommodation." },
    ],
    seo: { title: "Outstation Cabs from Hyderabad | Multi-day Tours — GM Cabs", desc: "Round trip & multi-day outstation cabs from Hyderabad to Bangalore, Vijayawada, Vizag, Tirupati, Goa. Innova Crysta, Hycross, Fortuner." },
  },
  "local-rental": {
    slug: "local-rental",
    title: "Local Rental",
    tagline: "Hourly cabs within Hyderabad — 4h / 8h / 12h packages",
    hero: localImg,
    intro:
      "Renting a cab by the hour is ideal for city meetings, shopping, medical visits or a full day of sightseeing. Fixed hourly packages with generous km limits and no per-stop charges.",
    highlights: [
      { icon: "🕒", label: "Flexible packages", desc: "4hr/40km, 8hr/80km, 12hr/120km slabs." },
      { icon: "🛍️", label: "Multi-stop friendly", desc: "Unlimited stops within the package limit." },
      { icon: "🏙️", label: "All Hyderabad zones", desc: "Gachibowli, HITEC City, Jubilee Hills, Secunderabad & more." },
      { icon: "👨‍💼", label: "Business-friendly", desc: "Corporate billing, GST invoices available." },
    ],
    includes: ["Driver", "Fuel", "AC", "Parking (extra as actuals)"],
    steps: [
      { title: "Choose package", desc: "4h, 8h or 12h based on your plan." },
      { title: "Share pickup point", desc: "We confirm car and driver details." },
      { title: "Use it your way", desc: "Meetings, shopping, sightseeing — you decide." },
      { title: "Pay for the package", desc: "Extra km/hour billed at fair rates." },
    ],
    vehicles: ["Sedan — Dzire / Amaze", "Innova Crysta", "Innova Hycross"],
    faqs: [
      { q: "What if I exceed the package?", a: "Extra kilometres and hours are billed at pre-agreed rates — always shared upfront." },
      { q: "Can I extend mid-trip?", a: "Yes. Just inform the driver or WhatsApp us and we'll extend." },
    ],
    seo: { title: "Local Cab Rental in Hyderabad | Hourly Packages — GM Cabs", desc: "Hourly cab rental in Hyderabad — 4hr, 8hr, 12hr packages with sedan or Innova. Perfect for meetings, shopping and city sightseeing." },
  },
  "corporate-travel": {
    slug: "corporate-travel",
    title: "Corporate Travel",
    tagline: "Employee transport, executive pickups & monthly billing",
    hero: heroCab,
    intro:
      "GM Cabs partners with businesses across Hyderabad for reliable executive transport. Dedicated chauffeurs, premium sedans, monthly invoicing and priority support for corporate accounts.",
    highlights: [
      { icon: "💼", label: "Executive cars", desc: "Premium sedans & SUVs for client visits and airport transfers." },
      { icon: "🧑‍💼", label: "Dedicated drivers", desc: "Same driver for your team — familiar with routes and preferences." },
      { icon: "📊", label: "Monthly billing", desc: "GST-compliant invoices, consolidated monthly." },
      { icon: "☎️", label: "Priority support", desc: "Dedicated account manager on WhatsApp." },
    ],
    includes: ["Uniformed chauffeur", "Sanitized cab", "GST invoice", "24×7 support"],
    steps: [
      { title: "Requirement call", desc: "Share volume, routes and vehicle preference." },
      { title: "Custom proposal", desc: "Per-trip or monthly retainer options." },
      { title: "Onboard team", desc: "WhatsApp booking channel for your employees." },
      { title: "Monthly settlement", desc: "One consolidated invoice at month-end." },
    ],
    vehicles: ["Honda City / Amaze", "Toyota Innova Crysta / Hycross", "Toyota Fortuner"],
    faqs: [
      { q: "Do you offer monthly contracts?", a: "Yes — dedicated cab + driver on a monthly retainer with pre-agreed km/hour caps." },
      { q: "Can we get a demo trip?", a: "Absolutely. We arrange a complimentary demo ride for decision makers." },
    ],
    seo: { title: "Corporate Cab Services in Hyderabad | Employee Transport — GM Cabs", desc: "Corporate travel & employee transport in Hyderabad. Executive sedans, dedicated chauffeurs, monthly GST billing and priority support." },
  },
  "wedding-cars": {
    slug: "wedding-cars",
    title: "Wedding Cars",
    tagline: "Luxury cars for wedding pickups, baraat & guest transport",
    hero: fleetPair.url,
    intro:
      "Make the big day flawless. From luxury cars for the bride and groom to fleet coordination for guest pickups, GM Cabs handles wedding transport end-to-end.",
    highlights: [
      { icon: "💍", label: "Luxury lead car", desc: "Fortuner, Camry, Carnival — decorated on request." },
      { icon: "🚐", label: "Guest transfers", desc: "Innova & Tempo Traveller fleets for family movement." },
      { icon: "🌸", label: "Decoration", desc: "Floral decoration for the bride/groom car available." },
      { icon: "🗓️", label: "Multi-day coverage", desc: "Haldi, Mehendi, Sangeet & Reception — all in one plan." },
    ],
    includes: ["Uniformed chauffeur", "Decoration (optional)", "Fuel", "State permit (if outstation)"],
    steps: [
      { title: "Share wedding schedule", desc: "Dates, venues and rough vehicle count." },
      { title: "Get fleet plan", desc: "We propose lead car + guest vehicles." },
      { title: "Confirm & advance", desc: "Advance secures the vehicles for your dates." },
      { title: "Enjoy stress-free travel", desc: "Coordinator on WhatsApp for the whole event." },
    ],
    vehicles: ["Toyota Fortuner", "Toyota Camry", "Kia Carnival", "Innova Crysta / Tempo Traveller"],
    faqs: [
      { q: "Do you decorate the car?", a: "Yes — floral decoration is available for lead cars at additional cost." },
      { q: "Can you cover destination weddings?", a: "Yes — multi-day outstation fleet packages are our specialty." },
    ],
    seo: { title: "Wedding Cars on Rent in Hyderabad | Luxury & Guest Fleet — GM Cabs", desc: "Wedding cars in Hyderabad — luxury lead car (Fortuner, Camry, Carnival) plus Innova & Tempo Traveller fleet for guest transport. Decoration on request." },
  },
  "temple-tours": {
    slug: "temple-tours",
    title: "Temple Tours",
    tagline: "Curated darshan trips across Telangana & AP",
    hero: ramojiImg,
    intro:
      "Peaceful, well-planned darshan trips to Tirupati, Yadagirigutta, Vemulawada, Srisailam, Basara and more. Experienced drivers, comfortable cars and flexible schedules built around temple timings.",
    highlights: [
      { icon: "🛕", label: "Popular darshans", desc: "Tirupati, Yadagirigutta, Vemulawada, Srisailam, Basara." },
      { icon: "🕰️", label: "Timing-aware", desc: "Drivers plan around aarti & darshan timings." },
      { icon: "👨‍👩‍👧", label: "Family friendly", desc: "Spacious Innova/Tempo for elders & children." },
      { icon: "🧭", label: "Multi-temple combos", desc: "Combine 2–3 temples in a single tour." },
    ],
    includes: ["Driver bata", "Fuel", "AC", "State permit", "Parking (extra)"],
    steps: [
      { title: "Choose temples", desc: "Single-temple or combo tour." },
      { title: "Pick dates & group size", desc: "We suggest ideal car type." },
      { title: "Confirm package", desc: "Fixed price for the tour." },
      { title: "Enjoy the darshan", desc: "Focus on prayer — we handle the driving." },
    ],
    vehicles: ["Innova Crysta", "Innova Hycross", "Tempo Traveller (12+1)"],
    faqs: [
      { q: "Do you help with darshan tickets?", a: "We guide with slot booking info — actual booking is done via the temple's official portal." },
      { q: "Is same-day Tirupati possible?", a: "Yes, subject to darshan availability. Overnight is more comfortable and recommended." },
    ],
    seo: { title: "Temple Tour Packages from Hyderabad | Tirupati, Srisailam — GM Cabs", desc: "Curated temple tour cabs from Hyderabad — Tirupati, Yadagirigutta, Vemulawada, Srisailam, Basara. Innova & Tempo Traveller for families." },
  },
  "luxury-car-rental": {
    slug: "luxury-car-rental",
    title: "Luxury Car Rental",
    tagline: "Chauffeur-driven premium cars for VIP occasions",
    hero: fleetPair.url,
    intro:
      "Fortuner, Camry, Kia Carnival and other premium cars for airport VIPs, corporate visits, anniversaries and photo shoots. Uniformed chauffeurs and immaculate interiors.",
    highlights: [
      { icon: "👑", label: "Premium fleet", desc: "Fortuner, Camry, Kia Carnival, Innova Hycross Top." },
      { icon: "🎩", label: "Uniformed chauffeur", desc: "Professionally dressed, courteous drivers." },
      { icon: "🧼", label: "Show-ready interiors", desc: "Deep-cleaned before every VIP trip." },
      { icon: "📸", label: "Events & shoots", desc: "Hourly & full-day rentals for special occasions." },
    ],
    includes: ["Uniformed chauffeur", "Fuel", "AC", "Sanitized interior"],
    steps: [
      { title: "Pick your car", desc: "Fortuner, Camry, Carnival or SUV top-variant." },
      { title: "Share occasion & duration", desc: "Airport VIP, event, shoot or full day." },
      { title: "Confirm & advance", desc: "Priority allocation of your chosen car." },
      { title: "Ride in style", desc: "Chauffeur reports 15 mins early." },
    ],
    vehicles: ["Toyota Fortuner", "Toyota Camry", "Kia Carnival", "Innova Hycross ZX"],
    faqs: [
      { q: "Can I rent for a photo shoot?", a: "Yes — hourly luxury rentals are available for weddings, pre-wedding shoots and events." },
      { q: "Is self-drive available?", a: "Currently we operate only chauffeur-driven for insurance and safety reasons." },
    ],
    seo: { title: "Luxury Car Rental in Hyderabad | Fortuner, Camry, Carnival — GM Cabs", desc: "Chauffeur-driven luxury car rental in Hyderabad — Toyota Fortuner, Camry, Kia Carnival. Perfect for airport VIPs, weddings, events and shoots." },
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICES);

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES[params.slug];
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service not found — GM Cabs" }, { name: "robots", content: "noindex" }] };
    }
    const s = loaderData.service;
    const url = `https://www.gmcabsservices.com/services/${s.slug}`;
    return {
      meta: [
        { title: s.seo.title },
        { name: "description", content: s.seo.desc },
        { property: "og:title", content: s.seo.title },
        { property: "og:description", content: s.seo.desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: s.hero },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: s.hero },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ServiceDetail,
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold text-primary">Service not found</h1>
      <p className="mt-3 text-muted-foreground">The service you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 inline-block rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white">Back to home</Link>
    </main>
  ),
  errorComponent: ({ reset }) => (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold text-primary">Something went wrong</h1>
      <button onClick={reset} className="mt-6 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white">Try again</button>
    </main>
  ),
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  const s = SERVICES[slug]!;
  const bookMsg = `Hi GM Cabs, I'd like to book *${s.title}*. Please share availability and fare.`;

  return (
    <main className="bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={s.hero} alt={s.title} fetchPriority="high" decoding="async" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/70 to-primary/90" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 pt-24 pb-20 md:px-8 md:pt-32 md:pb-28">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-orange hover:text-white">
            ← Back to all services
          </Link>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">{s.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">{s.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={wa(bookMsg)} target="_blank" rel="noopener noreferrer" data-ga-name={`WhatsApp — ${svc.title}`} data-ga-context="service_page" className="inline-flex items-center gap-2 rounded-full bg-[var(--whatsapp-ink)] px-6 py-3 text-sm font-semibold text-white shadow-elegant hover:opacity-90">
              💬 Book on WhatsApp
            </a>
            <a href={telLink} className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-gold hover:opacity-90">
              📞 Call 6301875485
            </a>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-20">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-ink">Overview</div>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground md:text-xl">{s.intro}</p>
      </section>

      {/* HIGHLIGHTS */}
      <section className="bg-accent/40 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-ink">Why choose this service</div>
          <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">Every detail, taken care of</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {s.highlights.map((h) => (
              <div key={h.label} className="rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elegant">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-gradient text-2xl shadow-gold">{h.icon}</div>
                <h3 className="mt-4 font-display text-lg font-bold text-primary">{h.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INCLUDES + VEHICLES */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-ink">What's included</div>
            <h2 className="mt-3 font-display text-2xl font-bold text-primary md:text-3xl">All the essentials, no surprises</h2>
            <ul className="mt-6 space-y-3">
              {s.includes.map((it) => (
                <li key={it} className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-card">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white">✓</span>
                  <span className="text-sm text-primary">{it}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-ink">Recommended vehicles</div>
            <h2 className="mt-3 font-display text-2xl font-bold text-primary md:text-3xl">Pick the right car for the ride</h2>
            <ul className="mt-6 space-y-3">
              {s.vehicles.map((v) => (
                <li key={v} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-card">
                  <span className="text-xl">🚗</span>
                  <span className="text-sm font-semibold text-primary">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-accent/40 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-ink">How it works</div>
          <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">Book in 4 simple steps</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {s.steps.map((st, i) => (
              <div key={st.title} className="relative rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-white shadow-gold">{i + 1}</div>
                <h3 className="mt-4 font-display text-lg font-bold text-primary">{st.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-20">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-ink">Frequently asked</div>
        <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">{s.title} — FAQs</h2>
        <div className="mt-8 space-y-3">
          {s.faqs.map((f) => (
            <details key={f.q} className="group rounded-xl border border-border bg-card p-5 shadow-card">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-primary">
                {f.q}
                <span className="text-orange-ink transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">Ready to book {s.title.toLowerCase()}?</h2>
          <p className="mt-3 text-white/80">Message us on WhatsApp — we typically respond within a minute.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={wa(bookMsg)} target="_blank" rel="noopener noreferrer" data-ga-name={`WhatsApp — ${svc.title}`} data-ga-context="service_page" className="inline-flex items-center gap-2 rounded-full bg-[var(--whatsapp-ink)] px-6 py-3 text-sm font-semibold text-white shadow-elegant hover:opacity-90">
              💬 Book on WhatsApp
            </a>
            <a href={telLink} className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-gold hover:opacity-90">
              📞 Call 6301875485
            </a>
          </div>
          <div className="mt-10 border-t border-white/10 pt-8">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orange">Explore more services</div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {Object.values(SERVICES).filter((o) => o.slug !== s.slug).slice(0, 6).map((o) => (
                <Link key={o.slug} to="/services/$slug" params={{ slug: o.slug }} className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:border-orange hover:bg-white/10">
                  {o.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
