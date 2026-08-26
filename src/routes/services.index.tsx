import { createFileRoute, Link } from "@tanstack/react-router";
import { Pic, picUrl } from "@/components/Pic";
import { WhatsAppIcon } from "@/components/FloatingWhatsApp";
import { SERVICES } from "./services.$slug";
import { PHONE_INTL, waFor } from "@/lib/whatsapp";

const SERVICE_LIST = Object.values(SERVICES);

const HERO_PIC = "fleet-pair";

export const Route = createFileRoute("/services/")({
  component: ServicesPage,
  head: () => {
    const title = "Premium Cab Services in Hyderabad | GM Cabs Services";
    const desc =
      "Airport pickup, airport drop, one-way taxi, outstation cabs, local rental, corporate travel, wedding cars, temple tours and luxury car rental in Hyderabad.";
    const url = "https://gmcabsservices.com/services";
    const image = `https://gmcabsservices.com${picUrl(HERO_PIC)}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Taxi and Car Rental Services",
            provider: {
              "@type": "LocalBusiness",
              name: "GM Cabs Services",
              telephone: "+91-63018-75485",
              url: "https://gmcabsservices.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Hyderabad",
                addressRegion: "Telangana",
                addressCountry: "IN",
              },
            },
            areaServed: {
              "@type": "City",
              name: "Hyderabad",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "GM Cabs Services",
              itemListElement: SERVICE_LIST.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "Offer",
                  name: s.title,
                  description: s.tagline,
                  url: `https://gmcabsservices.com/services/${s.slug}`,
                },
              })),
            },
          }),
        },
      ],
    };
  },
});

function ServiceIcon({ hero }: { hero: string }) {
  const iconMap: Record<string, string> = {
    airport: "✈️",
    outstation: "🛣️",
    local: "🏙️",
    "hero-cab": "🚖",
    "fleet-pair": "🚙",
    ramoji: "🛕",
  };
  return (
    <span className="text-3xl" aria-hidden>
      {iconMap[hero] ?? "🚕"}
    </span>
  );
}

function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Pic
            name={HERO_PIC}
            alt="Premium GM Cabs fleet on an airport road in Hyderabad"
            className="h-full w-full object-cover"
            sizes="100vw"
            width={1920}
            height={800}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/40" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" /> Our Services
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] text-foreground sm:text-5xl lg:text-6xl">
              Premium cab services for <span className="text-gold-ink">every journey</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              From airport transfers to outstation trips, weddings to temple tours — GM Cabs Services offers
              reliable, chauffeur-driven travel across Hyderabad, Telangana and Andhra Pradesh.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/book"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-bold text-white shadow-gold transition hover:opacity-90"
              >
                Book a Cab <span aria-hidden>→</span>
              </Link>
              <a
                href={waFor("I want to know about GM Cabs services")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--whatsapp-ink)] px-7 py-3.5 text-sm font-bold text-white transition hover:opacity-90"
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24" aria-labelledby="services-heading">
        <div className="text-center">
          <h2 id="services-heading" className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Choose your service
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Neatly structured services designed around your travel needs. Click any card to learn more.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_LIST.map((service) => (
            <article
              key={service.slug}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="flex items-start justify-between">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/20 to-orange/10 text-3xl">
                  <ServiceIcon hero={service.hero} />
                </div>
                <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  24×7
                </span>
              </div>

              <h3 className="mt-5 font-display text-xl font-bold text-foreground">
                {service.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-gold-ink">{service.tagline}</p>
              <p className="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground">
                {service.intro}
              </p>

              <div className="mt-5 space-y-2">
                {service.highlights.slice(0, 3).map((h) => (
                  <div key={h.label} className="flex items-start gap-2 text-sm">
                    <span className="text-orange">{h.icon}</span>
                    <span className="text-foreground/80">{h.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-2 border-t border-border pt-5 sm:flex-row">
                <Link
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-accent"
                >
                  Learn more
                </Link>
                <a
                  href={waFor(`${service.title} booking`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ga-name={`WhatsApp — ${service.title}`}
                  data-ga-context="services_page"
                  aria-label={`Book ${service.title} on WhatsApp`}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[var(--whatsapp-ink)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  <WhatsAppIcon className="h-4 w-4" /> Book
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "🛡️", title: "Verified drivers", desc: "Background-checked, professional chauffeurs." },
              { icon: "🧼", title: "Sanitized cabs", desc: "Clean, AC cars before every trip." },
              { icon: "💰", title: "Transparent fares", desc: "No hidden charges. Fixed quote upfront." },
              { icon: "📱", title: "WhatsApp booking", desc: "Book, modify or get support instantly." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-card p-5 shadow-card">
                <div className="text-2xl">{item.icon}</div>
                <h4 className="mt-3 font-display text-lg font-bold text-foreground">{item.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/90 p-8 text-primary-foreground sm:p-12 lg:p-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange/20 blur-3xl" />
          <div className="relative z-10 flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                Not sure which service fits your trip?
              </h2>
              <p className="mt-2 max-w-xl text-primary-foreground/80">
                Tell us your pickup, drop and date on WhatsApp and we will recommend the right cab and fare.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${PHONE_INTL}?text=${encodeURIComponent("Hi GM Cabs, I need help choosing a service for my trip.")}`}
                target="_blank"
                rel="noopener noreferrer"
                data-ga-name="WhatsApp — Services help"
                data-ga-context="services_cta"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--whatsapp-ink)] px-7 py-3.5 text-sm font-bold text-white transition hover:opacity-90"
              >
                <WhatsAppIcon className="h-4 w-4" /> Ask on WhatsApp
              </a>
              <Link
                to="/book"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-7 py-3.5 text-sm font-bold text-primary-foreground backdrop-blur transition hover:bg-primary-foreground/20"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
