import { createFileRoute, Link } from "@tanstack/react-router";
import { BookingForm } from "@/components/BookingForm";
import { Pic, picUrlAt } from "@/components/Pic";
import { WhatsAppIcon } from "@/components/FloatingWhatsApp";
import { PHONE, PHONE_INTL, telLink, waFor } from "@/lib/whatsapp";

export const Route = createFileRoute("/book")({
  component: BookPage,
  head: () => ({
    meta: [
      { title: "Book a Cab | GM Cabs Services Hyderabad" },
      { name: "description", content: "Book airport pickup, drop, one way taxi or outstation cab in Hyderabad. Fill your pickup, drop, date, time and car preference — we reply on WhatsApp within minutes." },
      { property: "og:title", content: "Book a Cab | GM Cabs Services Hyderabad" },
      { property: "og:description", content: "Book airport pickup, drop, one way taxi or outstation cab in Hyderabad. Fill your pickup, drop, date, time and car preference — we reply on WhatsApp within minutes." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://gmcabsservices.com/book" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Book a Cab | GM Cabs Services Hyderabad" },
      { name: "twitter:description", content: "Book airport pickup, drop, one way taxi or outstation cab in Hyderabad. Fill your pickup, drop, date, time and car preference — we reply on WhatsApp within minutes." },
    ],
    links: [
      { rel: "canonical", href: "https://gmcabsservices.com/book" },
      { rel: "preload", as: "image", href: picUrlAt("hero-suv-front", 600), fetchPriority: "high" } as unknown as { rel: string; href: string },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Book a Cab | GM Cabs Services",
          description: "Online cab booking form for Hyderabad airport transfers, one-way and outstation trips.",
          url: "https://gmcabsservices.com/book",
          mainEntity: {
            "@type": "LocalBusiness",
            name: "GM Cabs Services",
            telephone: "+91" + PHONE,
            url: "https://gmcabsservices.com",
          },
        }),
      },
    ],
  }),
});

function BookPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-card shadow-card">
        <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between gap-4 px-4 md:h-20 md:px-8">
          <Link to="/" className="flex min-w-0 shrink items-center py-1.5" aria-label="GM Cabs Services home">
            <Pic
              name="gm-logo-mark"
              alt="GM Cabs Services Hyderabad"
              title="GM Cabs Services"
              width={954}
              height={518}
              sizes="(min-width: 768px) 130px, 111px"
              priority
              className="h-[60px] w-auto max-w-full object-contain md:h-[70px]"
            />
          </Link>
          <div className="flex items-center gap-2">
            <a
              href={waFor("Cab booking")}
              target="_blank"
              rel="noopener noreferrer"
              data-ga-name="WhatsApp — Book header"
              data-ga-context="book_header"
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--whatsapp-ink)] px-4 py-2 text-xs font-semibold text-white shadow-card hover:opacity-90"
            >
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href={telLink}
              className="hidden items-center gap-1.5 rounded-full bg-brand-gradient px-4 py-2 text-xs font-semibold text-white shadow-gold hover:opacity-90 sm:inline-flex"
            >
              📞 {PHONE}
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-background">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,color-mix(in_oklab,var(--gold)_16%,transparent)_0%,transparent_60%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-primary shadow-card">
                <span className="h-2 w-2 rounded-full bg-gold" /> 24×7 Premium Cabs
              </span>
              <h1 className="mt-5 font-display text-[2.1rem] font-bold leading-[1.1] text-primary sm:text-5xl">
                Book Your Ride <span className="text-gold-ink">in Seconds</span>
              </h1>
              <p className="mt-4 text-base font-medium text-muted-foreground md:text-lg">
                Tell us where you are going and we will confirm availability, driver details and a transparent fare on WhatsApp.
              </p>
            </div>

            <div className="mx-auto mt-8 max-w-3xl">
              <BookingForm
                title="Start your booking"
                description="Fill the details below. We will reply on WhatsApp with fare and driver info."
              />
            </div>

            <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
              <ContactCard icon="📞" title="Call us" line={PHONE} href={telLink} />
              <ContactCard icon="💬" title="WhatsApp" line="6301875485" href={waFor("Cab booking")} />
              <ContactCard icon="📍" title="Service area" line="Hyderabad & outstation" />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-primary-foreground/70 md:flex-row md:px-8">
          <div>© {new Date().getFullYear()} GM Cabs Services. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-orange">Home</Link>
            <Link to="/fare-estimate" className="hover:text-orange">Fare Estimate</Link>
            <a href={telLink} className="hover:text-orange">{PHONE}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ContactCard({ icon, title, line, href }: { icon: string; title: string; line: string; href?: string }) {
  const inner = (
    <>
      <div className="text-2xl">{icon}</div>
      <h3 className="mt-2 font-display text-sm font-bold text-primary">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{line}</p>
    </>
  );
  const cls = "flex flex-col items-center rounded-2xl border border-border bg-card p-5 text-center shadow-card transition hover:-translate-y-1 hover:border-orange hover:shadow-elegant";
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className={cls}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
