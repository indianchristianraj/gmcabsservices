import { createFileRoute, Link } from "@tanstack/react-router";
import { TRIP_ROUTE_LIST } from "@/lib/trip-routes";
import { Pic, picUrl } from "@/components/Pic";

const PHONE_INTL = "916301875485";
const SITE = "https://gmcabsservices.com";
const telLink = `tel:+${PHONE_INTL}`;

function wa(msg: string) {
  return `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(msg)}`;
}

const TITLE = "Outstation Cab Routes from Hyderabad | One Way & Round Trip — GM Cabs";
const DESC =
  "Dedicated route guides for outstation cabs from Hyderabad — Vijayawada, Srisailam, Tirupati, Warangal, Bangalore, Vizag and more. Distance, drive time, stops and 24×7 booking.";

export const Route = createFileRoute("/routes/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/routes` },
      { property: "og:image", content: `${SITE}${picUrl("outstation")}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE}${picUrl("outstation")}` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/routes` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
                { "@type": "ListItem", position: 2, name: "Outstation Routes", item: `${SITE}/routes` },
              ],
            },
            {
              "@type": "ItemList",
              name: "Outstation cab routes from Hyderabad",
              itemListElement: TRIP_ROUTE_LIST.map((r, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: `Hyderabad to ${r.city} Cab`,
                url: `${SITE}/routes/${r.slug}`,
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: RoutesIndex,
});

function RoutesIndex() {
  return (
    <main className="bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Pic name="outstation" alt="Outstation cab from Hyderabad on the highway" sizes="100vw" priority className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/70 to-primary/90" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 pt-24 pb-16 md:px-8 md:pt-32 md:pb-24">
          <nav aria-label="Breadcrumb" className="text-xs font-semibold uppercase tracking-widest text-orange">
            <Link to="/" className="hover:text-white">Home</Link>
          </nav>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Outstation cab routes from Hyderabad
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Route-by-route guides with real distances, drive times, halts and the vehicles we recommend — so you know exactly
            what to expect before you book.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={wa("Hi GM Cabs, I'd like to book an outstation cab from Hyderabad.")}
              target="_blank"
              rel="noopener noreferrer"
              data-ga-name="WhatsApp — Routes index"
              data-ga-context="routes_index"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--whatsapp-ink)] px-6 py-3 text-sm font-semibold text-white shadow-elegant hover:opacity-90"
            >
              💬 Book on WhatsApp
            </a>
            <a href={telLink} data-ga-name="Call — Routes index" data-ga-context="routes_index" className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-gold hover:opacity-90">
              📞 Call 6301875485
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TRIP_ROUTE_LIST.map((r) => (
            <article key={r.slug} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:border-orange hover:shadow-elegant">
              <h2 className="font-display text-xl font-bold text-primary">
                Hyderabad <span className="text-orange-ink">→</span> {r.city}
              </h2>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                {r.km} km · {r.hours}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{r.tagline}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  to="/routes/$slug"
                  params={{ slug: r.slug }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-primary hover:border-orange"
                >
                  Route details →
                </Link>
                <a
                  href={wa(`Hi GM Cabs, I'd like to book a *Hyderabad to ${r.city}* cab.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ga-name={`WhatsApp — Hyderabad to ${r.city}`}
                  data-ga-context="routes_index_card"
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-4 py-2 text-xs font-semibold text-white shadow-gold hover:opacity-90"
                >
                  Book now
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-accent/40 p-6">
          <h2 className="font-display text-xl font-bold text-primary">Don't see your destination?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We drive anywhere in Telangana, Andhra Pradesh and neighbouring states. Message us your pickup and drop and we'll
            share a vehicle option and an all-inclusive quote.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={wa("Hi GM Cabs, I need an outstation cab quote for a custom route.")}
              target="_blank"
              rel="noopener noreferrer"
              data-ga-name="WhatsApp — Custom route"
              data-ga-context="routes_index_custom"
              className="rounded-full bg-[var(--whatsapp-ink)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              💬 Ask for a custom route
            </a>
            <Link to="/services/$slug" params={{ slug: "outstation-cabs" }} className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-primary hover:border-orange">
              Outstation service details
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
