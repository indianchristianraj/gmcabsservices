import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import {
  SECTION_CONTEXT, PHONE_INTL, telLink, waFor,
  useBookingDraft, hasBookingDetails, buildBookingMessage,
} from "@/lib/whatsapp";

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.15-.174.199-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 2C6.58 2 2.13 6.451 2.13 11.912a9.87 9.87 0 0 0 1.417 5.086L2 22l5.13-1.517a9.86 9.86 0 0 0 4.91 1.29c5.462 0 9.912-4.45 9.912-9.912S17.502 2 12.04 2z" />
    </svg>
  );
}

function titleize(slug: string) {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

/** Page-level fallback context derived from the current route. */
function contextFromPath(path: string): string | undefined {
  const m = path.match(/^\/services\/([^/]+)/);
  if (m) return `${titleize(m[1])} service`;
  const r = path.match(/^\/routes\/([^/]+)/);
  if (r) return `${titleize(r[1]).replace(/\bTo\b/, "to")} taxi`;
  if (path.startsWith("/routes")) return "your outstation routes";
  return undefined;
}

/**
 * Global WhatsApp CTA — rendered once in __root so it appears on every page.
 * Mobile: slim sticky bar. Tablet/desktop: floating pill.
 */
export function FloatingWhatsApp() {
  const [section, setSection] = useState<string | null>(null);
  const route = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    setSection(null);
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
  }, [route]);

  const draft = useBookingDraft();
  const hasDraft = hasBookingDetails(draft);
  const context = (section ? SECTION_CONTEXT[section] : undefined) ?? contextFromPath(route);
  const href = hasDraft
    ? `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(buildBookingMessage(draft))}`
    : waFor(context, route);
  const label = hasDraft
    ? "Send your booking details on WhatsApp"
    : context ? `Chat on WhatsApp about ${context}` : "Chat on WhatsApp";
  const shortLabel = hasDraft ? "Send booking" : context ? "Ask about this" : "Chat with us";

  return (
    <>
      {/* keeps the mobile sticky bar from covering page content */}
      <div aria-hidden className="h-[76px] sm:hidden" />

      {/* Mobile: slim sticky action bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 flex items-center gap-2 border-t border-border bg-background/95 px-3 py-2.5 shadow-elegant backdrop-blur sm:hidden"
        style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))" }}
      >
        <a
          href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}
          data-ga-name="WhatsApp — Sticky bar" data-ga-context="sticky_bar"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--whatsapp-ink)] px-4 py-3 text-sm font-bold text-white shadow-card active:scale-[0.98]"
        >
          <WhatsAppIcon className="h-5 w-5" /> {shortLabel}
        </a>
        <a
          href={telLink} aria-label="Call GM Cabs Services"
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-gradient px-4 py-3 text-sm font-bold text-white shadow-card active:scale-[0.98]"
        >
          📞 Call
        </a>
      </div>

      {/* Tablet / desktop: floating pill */}
      <a
        href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}
        data-ga-name="WhatsApp — Floating" data-ga-context="floating"
        className="fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-full bg-[var(--whatsapp-ink)] py-3 pl-3 pr-4 text-white shadow-elegant animate-pulse-ring transition hover:scale-105 sm:flex"
      >
        <WhatsAppIcon className="h-7 w-7" />
        <span className="text-sm font-semibold">{shortLabel}</span>
      </a>
    </>
  );
}
