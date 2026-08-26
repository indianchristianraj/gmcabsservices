import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Pic } from "@/components/Pic";
import { WhatsAppIcon } from "@/components/FloatingWhatsApp";
import { PHONE, telLink, waLink } from "@/lib/whatsapp";

function Logo() {
  return (
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
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-card shadow-card">
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between gap-4 px-4 md:h-20 md:px-8">
        <Link to="/" className="flex min-w-0 shrink items-center py-1.5" aria-label="GM Cabs Services home">
          <Logo />
        </Link>

        <div className="flex shrink-0 items-center gap-3 lg:gap-6">
          <nav className="hidden items-center gap-7 text-sm font-medium text-foreground/80 lg:flex">
            <Link to="/services" className="hover:text-orange-ink">Services</Link>
            <Link to="/" hash="fleet" className="hover:text-orange-ink">Fleet</Link>
            <Link to="/" hash="routes" className="hover:text-orange-ink">Routes</Link>
            <Link to="/" hash="packages" className="hover:text-orange-ink">Packages</Link>
            <Link to="/" hash="about" className="hover:text-orange-ink">About</Link>
            <Link to="/" hash="contact" className="hover:text-orange-ink">Contact</Link>
            <Link to="/book" className="rounded-full bg-brand-gradient px-3.5 py-1.5 text-xs font-semibold text-white shadow-gold hover:opacity-90">Book</Link>
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              data-ga-name="WhatsApp — Header"
              data-ga-context="header"
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--whatsapp-ink)] px-4 py-2 text-xs font-semibold text-white shadow-card hover:opacity-90"
            >
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href={telLink}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-4 py-2 text-xs font-semibold text-white shadow-gold hover:opacity-90"
            >
              📞 Call Now
            </a>
          </div>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-border bg-card text-primary shadow-card lg:hidden"
          >
            <span className="text-xl leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-card lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-sm font-medium">
            <Link to="/services" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 font-semibold text-gold-ink hover:bg-accent">Services</Link>
            {["Fleet", "Routes", "Packages", "About", "Contact"].map((l) => (
              <Link key={l} to="/" hash={l.toLowerCase()} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 hover:bg-accent">{l}</Link>
            ))}
            <Link to="/book" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 font-semibold text-gold-ink hover:bg-accent">Book Now</Link>
            <div className="mt-2 grid grid-cols-2 gap-2 pt-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                data-ga-name="WhatsApp — Mobile menu"
                data-ga-context="header_menu"
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--whatsapp-ink)] px-4 py-2.5 text-xs font-semibold text-white shadow-card"
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </a>
              <a
                href={telLink}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-gradient px-4 py-2.5 text-xs font-semibold text-white shadow-gold"
              >
                📞 Call
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
