import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pic, picUrl } from "@/components/Pic";
import { WhatsAppIcon } from "@/components/FloatingWhatsApp";
import { trackEvent } from "@/lib/analytics";
import {
  TripType,
  TRIP_TYPES,
  QuoteVehicle,
  QUOTE_VEHICLES,
  calculateEstimate,
} from "@/lib/fare-estimate";
import { TRIP_ROUTE_LIST } from "@/lib/trip-routes";
import { PHONE_INTL, telLink } from "@/lib/whatsapp";

const SITE = "https://gmcabsservices.com";

export const Route = createFileRoute("/fare-estimate")({
  component: FareEstimatePage,
  head: () => ({
    meta: [
      { title: "Cab Fare Estimate Hyderabad | GM Cabs Services" },
      {
        name: "description",
        content:
          "Get an instant cab fare estimate for Hyderabad airport, one-way, outstation and local trips. Final fare confirmed on WhatsApp — no fixed pricing.",
      },
      {
        property: "og:title",
        content: "Cab Fare Estimate Hyderabad | GM Cabs Services",
      },
      {
        property: "og:description",
        content:
          "Instant fare estimate for airport, one-way, outstation and local cabs in Hyderabad. No fixed pricing — confirm the final fare on WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/fare-estimate` },
      { property: "og:image", content: `${SITE}${picUrl("hero-suv-front")}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE}${picUrl("hero-suv-front")}` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/fare-estimate` }],
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

const faqs = [
  {
    q: "Is the fare estimate the final price?",
    a: "No. The estimate is an indicative range based on distance and vehicle type. The final fare is confirmed on WhatsApp after we factor in tolls, waiting time, night charges and exact pickup/drop points.",
  },
  {
    q: "What is included in the estimate?",
    a: "The estimate covers the vehicle, fuel and driver charges for the selected trip type. Tolls, state permits, parking, driver bata for multi-day trips and extra waiting are quoted separately.",
  },
  {
    q: "Can I get an estimate for a round trip?",
    a: "Yes. Choose the Outstation trip type and enter your destination. The estimator doubles the one-way distance to give a round-trip indicative range.",
  },
  {
    q: "Do you show fixed pricing on the website?",
    a: "We do not publish fixed rates because every trip is different. Use this page to get a quick estimate, then message us on WhatsApp for a confirmed, all-inclusive quote.",
  },
  {
    q: "Which vehicle should I choose?",
    a: "Sedans are ideal for 1–4 passengers and airport transfers. Innova Crysta / Hycross suit families and outstation trips. Fortuner / Carnival are best for VIP events, weddings or large luggage.",
  },
];

function waEstimateUrl(
  trip: TripType,
  vehicle: QuoteVehicle,
  pickup: string,
  drop: string,
  date: string,
  time: string,
  pax: string,
  estimate: ReturnType<typeof calculateEstimate>,
) {
  const tripLabel = TRIP_TYPES.find((t) => t.id === trip)?.label ?? trip;
  const lines = [
    "Hi GM Cabs, I'd like a fare estimate for a cab.",
    "",
    `• Trip type: ${tripLabel}`,
    `• Vehicle: ${vehicle.name} (${vehicle.seats})`,
    pickup ? `• Pickup: ${pickup}` : "",
    drop ? `• Drop: ${drop}` : "",
    date ? `• Date: ${date}${time ? ` at ${time}` : ""}` : "",
    pax ? `• Passengers: ${pax}` : "",
    "",
    `• Estimated fare: ₹${estimate.low.toLocaleString("en-IN")} – ₹${estimate.high.toLocaleString("en-IN")}${estimate.km ? ` (~${estimate.km} km)` : ""}`,
    `• Note: ${estimate.note}`,
    "",
    "Please confirm the final fare and availability. Thank you!",
  ].filter(Boolean);
  return `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(lines.join("\n"))}`;
}

function FareEstimatePage() {
  const [trip, setTrip] = useState<TripType>("airport");
  const [vehicle, setVehicle] = useState<string>("crysta");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pax, setPax] = useState("2");
  const [quote, setQuote] = useState<ReturnType<typeof calculateEstimate> | null>(null);

  const veh = QUOTE_VEHICLES.find((v) => v.id === vehicle)!;
  const showDrop = trip !== "local";

  function calcQuote() {
    const result = calculateEstimate(trip, vehicle, pickup, drop);
    setQuote(result);
    const params = {
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
      source: "fare_estimate_page",
    };
    trackEvent("quote_request", params);
    trackEvent("fare_estimate_calculated", params);
    trackAdsConversion("fare_estimate_calculated", {
      value: Math.round((result.low + result.high) / 2),
      currency: "INR",
    });
  }

  function trackEstimateWhatsApp(buttonName: string, url: string) {
    trackEvent("whatsapp_click", {
      button_name: buttonName,
      link_url: url,
      context: "fare_estimate_page",
      trip_type: trip,
      vehicle_name: veh.name,
      estimate_low: quote?.low,
      estimate_high: quote?.high,
    });
    trackAdsConversion("fare_estimate_whatsapp", {
      value: quote ? Math.round((quote.low + quote.high) / 2) : undefined,
      currency: "INR",
    });
  }

  function bookOnWhatsApp() {
    if (!quote) return;
    const url = waEstimateUrl(trip, veh, pickup, drop, date, time, pax, quote);
    trackEvent("booking_started", {
      source: "fare_estimate_page",
      trip_type: trip,
      vehicle_name: veh.name,
    });
    trackEstimateWhatsApp("WhatsApp — Confirm Estimate", url);
    window.open(url, "_blank", "noopener,noreferrer");
  }


  function applyRoute(city: string, km: number) {
    setDrop(city);
    setTrip(km > 100 ? "outstation" : "oneway");
    setQuote(null);
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,color-mix(in_oklab,var(--gold)_16%,transparent)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 pt-8 pb-16 md:px-8 md:pt-14 md:pb-24">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-orange-ink hover:text-primary"
          >
            ← Back to home
          </Link>
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-primary shadow-card">
                <span className="h-2 w-2 rounded-full bg-gold" /> No fixed pricing
              </span>
              <h1 className="mt-5 font-display text-[2.1rem] font-bold leading-[1.08] text-primary sm:text-5xl md:text-6xl">
                Get a fare
                <span className="block text-gold-ink">estimate</span>
              </h1>
              <p className="mt-4 text-base font-medium text-muted-foreground md:text-lg">
                Airport · One Way · Outstation · Local packages
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Enter your pickup, drop and car type for an instant indicative range. The final fare is always confirmed on WhatsApp so there are no surprises.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${PHONE_INTL}?text=${encodeURIComponent("Hi GM Cabs, please share a fare estimate for my trip.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ga-name="WhatsApp — Fare Estimate Hero"
                  data-ga-context="fare_estimate_page"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--whatsapp-ink)] px-6 py-3.5 text-sm font-bold text-white shadow-elegant transition hover:opacity-90"
                >
                  <WhatsAppIcon className="h-4 w-4" /> Get quote on WhatsApp
                </a>
                <a
                  href={telLink}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary bg-background px-6 py-3.5 text-sm font-bold text-primary transition hover:bg-primary hover:text-primary-foreground"
                >
                  📞 Call Now
                </a>
              </div>
            </div>
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              <div className="absolute inset-x-6 bottom-3 h-8 rounded-[100%] bg-primary/15 blur-2xl" />
              <Pic
                name="hero-suv-front"
                alt="Premium Toyota Innova airport taxi from GM Cabs Services in Hyderabad"
                width={1600}
                height={1104}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="relative w-full rounded-2xl object-contain shadow-elegant"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ESTIMATOR */}
      <section className="relative z-10 -mt-6 px-4 md:-mt-10 md:px-8">
        <div className="mx-auto max-w-6xl rounded-2xl border border-border bg-card p-4 shadow-elegant md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-ink">Fare calculator</div>
              <h2 className="font-display text-xl font-bold text-primary md:text-2xl">Estimate your trip cost</h2>
            </div>
            <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold text-secondary-foreground">Indicative only</span>
          </div>

          {/* Trip type tabs */}
          <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
            {TRIP_TYPES.map((t) => {
              const active = trip === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTrip(t.id);
                    setQuote(null);
                  }}
                  className={`rounded-xl border px-3 py-3 text-left transition ${active ? "border-orange bg-brand-gradient text-white shadow-gold" : "border-border bg-background hover:border-orange/50"}`}
                >
                  <div className="text-lg">
                    {t.icon} <span className="ml-1 text-sm font-semibold">{t.label}</span>
                  </div>
                  <div className={`mt-0.5 text-[11px] ${active ? "text-white/85" : "text-muted-foreground"}`}>{t.hint}</div>
                </button>
              );
            })}
          </div>

          {/* Fields */}
          <div className="mt-4 grid gap-3 md:grid-cols-12">
            <div className={showDrop ? "md:col-span-4" : "md:col-span-6"}>
              <label className="text-xs font-semibold text-muted-foreground">
                {trip === "airport" ? "Pickup / Drop area" : "Pickup location"}
              </label>
              <input
                value={pickup}
                onChange={(e) => {
                  setPickup(e.target.value);
                  setQuote(null);
                }}
                placeholder={trip === "airport" ? "e.g. Gachibowli" : "e.g. HITEC City, Hyderabad"}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange"
              />
            </div>
            {showDrop && (
              <div className="md:col-span-4">
                <label className="text-xs font-semibold text-muted-foreground">Drop location</label>
                <input
                  value={drop}
                  onChange={(e) => {
                    setDrop(e.target.value);
                    setQuote(null);
                  }}
                  placeholder={trip === "outstation" ? "e.g. Vijayawada" : "e.g. RGIA Airport"}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange"
                />
              </div>
            )}
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-muted-foreground">Date</label>
              <input
                type="date"
                aria-label="Travel date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-muted-foreground">Time</label>
              <input
                type="time"
                aria-label="Pickup time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange"
              />
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
                    onClick={() => {
                      setVehicle(v.id);
                      setQuote(null);
                    }}
                    className={`rounded-xl border px-3 py-2.5 text-left transition ${active ? "border-gold bg-primary text-primary-foreground shadow-elegant" : "border-border bg-background hover:border-gold/50"}`}
                  >
                    <div className="text-sm font-semibold leading-tight">{v.name}</div>
                    <div className={`mt-0.5 text-[11px] ${active ? "text-white/80" : "text-muted-foreground"}`}>
                      {v.category} · {v.seats}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm">
              <label className="text-xs font-semibold text-muted-foreground">Passengers</label>
              <select
                aria-label="Passengers"
                value={pax}
                onChange={(e) => setPax(e.target.value)}
                className="rounded-lg border border-input bg-background px-2.5 py-2 text-sm outline-none focus:border-orange"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={calcQuote}
                className="inline-flex items-center gap-2 rounded-full border border-primary bg-background px-5 py-2.5 text-sm font-semibold text-primary hover:bg-secondary"
              >
                💰 Get estimate
              </button>
              <button
                type="button"
                onClick={bookOnWhatsApp}
                disabled={!quote}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--whatsapp-ink)] px-5 py-2.5 text-sm font-semibold text-white shadow-elegant hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <WhatsAppIcon className="h-4 w-4" /> Confirm on WhatsApp
              </button>
            </div>
          </div>

          {quote && (
            <div className="mt-4 rounded-xl border border-gold/40 bg-gold/10 p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-orange-ink">Estimated fare range</div>
                  <div className="font-display text-2xl font-bold text-primary md:text-3xl">
                    ₹{quote.low.toLocaleString("en-IN")} <span className="text-muted-foreground">–</span> ₹{quote.high.toLocaleString("en-IN")}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {veh.name} · {quote.note}
                    {quote.km ? ` · ~${quote.km} km` : ""}
                  </div>
                </div>
                <div className="max-w-xs text-[11px] text-muted-foreground">
                  Indicative estimate. Final fare confirmed on WhatsApp based on live route, tolls & waiting.
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* POPULAR ROUTES */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-ink">Popular routes</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">Quick estimates from Hyderabad</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Tap a route to pre-fill the calculator. Switch vehicle type to see how the estimate changes.</p>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TRIP_ROUTE_LIST.slice(0, 12).map((r) => {
            const est = calculateEstimate(r.km > 100 ? "outstation" : "oneway", vehicle, "Hyderabad", r.city);
            return (
              <div
                key={r.slug}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3.5 shadow-card transition hover:-translate-y-0.5 hover:border-orange hover:shadow-elegant"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <span>Hyderabad</span>
                    <span className="text-orange-ink">→</span>
                    <span className="truncate">{r.city}</span>
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">
                    {r.km} km · approx {r.hours} · ₹{est.low.toLocaleString("en-IN")} – ₹{est.high.toLocaleString("en-IN")}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => applyRoute(r.city, r.km)}
                  className="shrink-0 rounded-full bg-brand-gradient px-3 py-1.5 text-[11px] font-semibold text-white shadow-gold hover:opacity-90"
                >
                  Estimate
                </button>
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/routes"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-primary transition hover:border-orange"
          >
            View all route guides →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-accent/40 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-ink">Fare estimate FAQs</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">Common questions</h2>
          </div>
          <div className="mt-8 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-border bg-card p-5 shadow-card">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-primary">
                  {f.q}
                  <span className="text-orange-ink transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">Ready for a confirmed quote?</h2>
          <p className="mt-3 text-white/80">Message us on WhatsApp with your route and car type — we typically reply within a minute.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${PHONE_INTL}?text=${encodeURIComponent("Hi GM Cabs, please share a confirmed fare quote for my trip.")}`}
              target="_blank"
              rel="noopener noreferrer"
              data-ga-name="WhatsApp — Fare Estimate CTA"
              data-ga-context="fare_estimate_page"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--whatsapp-ink)] px-6 py-3 text-sm font-semibold text-white shadow-elegant hover:opacity-90"
            >
              <WhatsAppIcon className="h-4 w-4" /> Get confirmed quote
            </a>
            <a href={telLink} className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20">
              📞 Call {PHONE_INTL.replace("91", "")}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
