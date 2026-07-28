import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { TRIP_ROUTES, TRIP_ROUTE_LIST, type TripRoute } from "@/lib/trip-routes";
import outstationImg from "@/assets/outstation.webp";
import ramojiImg from "@/assets/ramoji.webp";
import localImg from "@/assets/local.webp";
import heroCab from "@/assets/hero-cab.webp";

const PHONE_INTL = "916301875485";
const SITE = "https://www.gmcabsservices.com";
const telLink = `tel:+${PHONE_INTL}`;

function wa(msg: string) {
  return `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(msg)}`;
}

const HERO_IMAGES: Record<string, string> = {
  "hyderabad-to-ramoji-film-city": ramojiImg,
  "hyderabad-to-yadagirigutta": localImg,
  "hyderabad-to-srisailam": heroCab,
};

function heroFor(slug: string) {
  return HERO_IMAGES[slug] ?? outstationImg;
}

export const Route = createFileRoute("/routes/$slug")({
  loader: ({ params }) => {
    if (!TRIP_ROUTES[params.slug]) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Route not found — GM Cabs" }, { name: "robots", content: "noindex" }] };
    }
    const r = TRIP_ROUTES[loaderData.slug]!;
    const url = `${SITE}/routes/${r.slug}`;
    const img = `${SITE}${heroFor(r.slug)}`;
    return {
      meta: [
        { title: r.seo.title },
        { name: "description", content: r.seo.desc },
        { property: "og:title", content: r.seo.title },
        { property: "og:description", content: r.seo.desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: img },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: img },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                name: `Hyderabad to ${r.city} Cab`,
                serviceType: "Outstation taxi service",
                description: r.seo.desc,
                url,
                areaServed: [
                  { "@type": "City", name: "Hyderabad" },
                  { "@type": "City", name: r.city },
                ],
                provider: {
                  "@type": "LocalBusiness",
                  name: "GM Cabs Services",
                  telephone: "+916301875485",
                  url: SITE,
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
                  { "@type": "ListItem", position: 2, name: "Outstation Routes", item: `${SITE}/routes` },
                  { "@type": "ListItem", position: 3, name: `Hyderabad to ${r.city}`, item: url },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: r.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
            ],
          }),
        },
      ],
    };
  },
  component: RoutePage,
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold text-primary">Route not found</h1>
      <p className="mt-3 text-muted-foreground">We don't have a dedicated page for that route yet.</p>
      <Link to="/routes" className="mt-6 inline-block rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white">
        See all routes
      </Link>
    </main>
  ),
  errorComponent: ({ reset }) => (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold text-primary">Something went wrong</h1>
      <button onClick={reset} className="mt-6 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white">
        Try again
      </button>
    </main>
  ),
});

function related(current: TripRoute) {
  return TRIP_ROUTE_LIST.filter((r) => r.slug !== current.slug)
    .sort((a, b) => Math.abs(a.km - current.km) - Math.abs(b.km - current.km))
    .slice(0, 6);
}

function RoutePage() {
  const { slug } = Route.useParams();
  const r = TRIP_ROUTES[slug]!;
  const title = `Hyderabad to ${r.city}`;
  const bookMsg = `Hi GM Cabs, I'd like to book a *${title}* cab. Please share vehicle options and availability.`;

  return (
    <main className="bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroFor(slug)}
            alt={`${title} outstation cab by GM Cabs Services`}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/70 to-primary/90" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 pt-24 pb-20 md:px-8 md:pt-32 md:pb-28">
          <nav aria-label="Breadcrumb" className="text-xs font-semibold uppercase tracking-widest text-orange">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-2 text-white/40">/</span>
            <Link to="/routes" className="hover:text-white">Outstation routes</Link>
          </nav>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {title} Cab
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">{r.tagline}</p>

          <dl className="mt-8 flex flex-wrap gap-3">
            <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur">
              <dt className="text-[10px] uppercase tracking-wider text-white/60">Distance</dt>
              <dd className="text-sm font-semibold text-white">{r.km} km</dd>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur">
              <dt className="text-[10px] uppercase tracking-wider text-white/60">Drive time</dt>
              <dd className="text-sm font-semibold text-white">{r.hours}</dd>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur">
              <dt className="text-[10px] uppercase tracking-wider text-white/60">Trip type</dt>
              <dd className="text-sm font-semibold text-white">One-way & round trip</dd>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur">
              <dt className="text-[10px] uppercase tracking-wider text-white/60">Availability</dt>
              <dd className="text-sm font-semibold text-white">24×7</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={wa(bookMsg)}
              target="_blank"
              rel="noopener noreferrer"
              data-ga-name={`WhatsApp — ${title}`}
              data-ga-context="route_page"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--whatsapp-ink)] px-6 py-3 text-sm font-semibold text-white shadow-elegant hover:opacity-90"
            >
              💬 Book on WhatsApp
            </a>
            <a
              href={telLink}
              data-ga-name={`Call — ${title}`}
              data-ga-context="route_page"
              className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-gold hover:opacity-90"
            >
              📞 Call 6301875485
            </a>
          </div>
        </div>
      </section>

      {/* INTRO + ROUTE MAP */}
      <section className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-20">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-ink">About this route</div>
        <h2 className="mt-3 font-display text-2xl font-bold text-primary md:text-3xl">
          What the {title} drive is really like
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{r.intro}</p>

        <div className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Route taken</div>
          <ol className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm font-semibold text-primary">
            <li className="rounded-full bg-brand-gradient px-3 py-1 text-white">Hyderabad</li>
            {r.via.map((v) => (
              <li key={v} className="flex items-center gap-2">
                <span aria-hidden="true" className="text-orange-ink">→</span>
                <span className="rounded-full border border-border bg-accent/50 px-3 py-1">{v}</span>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="text-orange-ink">→</span>
              <span className="rounded-full bg-brand-gradient px-3 py-1 text-white">{r.city}</span>
            </li>
          </ol>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="bg-accent/40 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-ink">Why book with GM Cabs</div>
          <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">
            Planned around this route, not a generic ride
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {r.highlights.map((h) => (
              <div key={h.label} className="rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elegant">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-gradient text-2xl shadow-gold">{h.icon}</div>
                <h3 className="mt-4 font-display text-lg font-bold text-primary">{h.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STOPS + VEHICLES */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-ink">Stops & sightseeing</div>
            <h2 className="mt-3 font-display text-2xl font-bold text-primary md:text-3xl">Worth stopping for</h2>
            <ol className="mt-6 space-y-3">
              {r.stops.map((s, i) => (
                <li key={s.title} className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-card">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white">{i + 1}</span>
                  <span>
                    <span className="block text-sm font-semibold text-primary">{s.title}</span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">{s.desc}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-ink">Recommended vehicles</div>
            <h2 className="mt-3 font-display text-2xl font-bold text-primary md:text-3xl">Choose the right car</h2>
            <ul className="mt-6 space-y-3">
              {r.vehicles.map((v) => (
                <li key={v} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-card">
                  <span aria-hidden="true" className="text-xl">🚗</span>
                  <span className="text-sm font-semibold text-primary">{v}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl border border-border bg-accent/40 p-5">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Best for</div>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {r.bestFor.map((b) => (
                  <li key={b} className="rounded-full border border-border bg-card px-2.5 py-0.5 text-[11px] text-muted-foreground">✓ {b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-accent/40 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-ink">FAQs</div>
          <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">{title} — common questions</h2>
          <div className="mt-8 space-y-3">
            {r.faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-border bg-card p-5 shadow-card">
                <summary className="cursor-pointer list-none text-sm font-semibold text-primary marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {f.q}
                    <span aria-hidden="true" className="text-orange-ink transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED ROUTES */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-ink">Other routes</div>
        <h2 className="mt-3 font-display text-2xl font-bold text-primary md:text-3xl">Popular outstation cabs from Hyderabad</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {related(r).map((o) => (
            <Link
              key={o.slug}
              to="/routes/$slug"
              params={{ slug: o.slug }}
              className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3.5 shadow-card transition hover:-translate-y-0.5 hover:border-orange hover:shadow-elegant"
            >
              <span className="min-w-0">
                <span className="flex items-center gap-2 text-sm font-semibold text-primary">
                  Hyderabad <span className="text-orange-ink">→</span> <span className="truncate">{o.city}</span>
                </span>
                <span className="mt-0.5 block text-[11px] text-muted-foreground">{o.km} km · {o.hours}</span>
              </span>
              <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-orange-ink transition group-hover:bg-brand-gradient group-hover:text-white">→</span>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/routes" className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-primary hover:border-orange">
            All outstation routes
          </Link>
          <Link to="/services/$slug" params={{ slug: "outstation-cabs" }} className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-primary hover:border-orange">
            Outstation service details
          </Link>
          <Link to="/" hash="fleet" className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-primary hover:border-orange">
            View our fleet
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-hero-gradient py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">Ready to book your {title} cab?</h2>
          <p className="mt-3 text-white/80">Share your travel date and pickup point — we'll confirm the vehicle and an all-inclusive quote within minutes.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={wa(bookMsg)}
              target="_blank"
              rel="noopener noreferrer"
              data-ga-name={`WhatsApp — ${title} CTA`}
              data-ga-context="route_page_cta"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--whatsapp-ink)] px-6 py-3 text-sm font-semibold text-white shadow-elegant hover:opacity-90"
            >
              💬 Book on WhatsApp
            </a>
            <a href={telLink} data-ga-name={`Call — ${title} CTA`} data-ga-context="route_page_cta" className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-gold hover:opacity-90">
              📞 Call 6301875485
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
