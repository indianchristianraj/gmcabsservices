// GA4 analytics helper — auto page_view (SPA), scroll depth, outbound / mail /
// tel / whatsapp click delegation, plus a `trackEvent` API for domain events.
// Loads gtag.js lazily to keep TTI unaffected.

export const GA_MEASUREMENT_ID = "G-BK309MJNHS";
export const ADS_CONVERSION_ID = "AW-18349476379";

/**
 * Google Ads conversion labels. Replace the value with the label from
 * Google Ads → Goals → Conversions → (action) → Tag setup, e.g. "AbC-D_efG".
 * Without a label the hit still reaches the Ads account via send_to.
 */
export const ADS_CONVERSION_LABELS: Record<string, string | undefined> = {
  booking_form_submit: undefined,
};

/** Fire a Google Ads conversion. Safe no-op if gtag hasn't loaded yet. */
export function trackAdsConversion(
  key: keyof typeof ADS_CONVERSION_LABELS | string,
  params: Record<string, unknown> = {},
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const label = ADS_CONVERSION_LABELS[key];
  window.gtag("event", "conversion", {
    send_to: label ? `${ADS_CONVERSION_ID}/${label}` : ADS_CONVERSION_ID,
    ...params,
  });
}


type Params = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    __gaInit?: boolean;
  }
}

function deviceType(): "mobile" | "tablet" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 640) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function baseParams(): Params {
  if (typeof window === "undefined") return {};
  return {
    device_type: deviceType(),
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
    page_title: typeof document !== "undefined" ? document.title : undefined,
    timestamp: new Date().toISOString(),
  };
}

export function trackEvent(name: string, params: Params = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, { ...baseParams(), ...params });
}

export function trackPageView(path: string, title?: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    ...baseParams(),
    page_path: path,
    page_location: window.location.origin + path,
    page_title: title ?? document.title,
  });
}

/* ---------------- auto listeners ---------------- */

let lastPath = "";
let scrollMarks = new Set<number>();
let scrollTicking = false;

function resetScrollMarks() {
  scrollMarks = new Set();
}

function onScroll() {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    scrollTicking = false;
    const doc = document.documentElement;
    const total = (doc.scrollHeight || 0) - window.innerHeight;
    if (total <= 0) return;
    const pct = Math.min(100, Math.max(0, Math.round((window.scrollY / total) * 100)));
    for (const m of [25, 50, 75, 90]) {
      if (pct >= m && !scrollMarks.has(m)) {
        scrollMarks.add(m);
        trackEvent("scroll", { percent_scrolled: m });
      }
    }
  });
}

function onDocClick(e: MouseEvent) {
  const target = e.target as HTMLElement | null;
  if (!target) return;
  const a = target.closest?.("a") as HTMLAnchorElement | null;
  if (!a) return;
  const rawHref = a.getAttribute("href") || "";
  if (!rawHref || rawHref.startsWith("#")) return;
  const name = (a.dataset.gaName || a.getAttribute("aria-label") || a.textContent || "").trim().slice(0, 80);
  const context = a.dataset.gaContext || "";

  if (rawHref.startsWith("mailto:")) {
    trackEvent("email_click", { button_name: name, link_url: rawHref });
    return;
  }
  if (rawHref.startsWith("tel:")) {
    trackEvent("call_button_click", { button_name: name, link_url: rawHref });
    return;
  }
  if (/wa\.me|api\.whatsapp\.com|^whatsapp:/.test(rawHref)) {
    trackEvent("whatsapp_click", { button_name: name, link_url: rawHref, context });
    return;
  }
  try {
    const url = new URL(rawHref, window.location.href);
    if (url.hostname && url.hostname !== window.location.hostname) {
      trackEvent("outbound_click", {
        button_name: name,
        link_url: url.href,
        link_domain: url.hostname,
      });
    }
  } catch {
    /* ignore malformed hrefs */
  }
}

/**
 * Initialise GA4. `subscribeRoute` receives a callback and must call it on every
 * SPA route change; return an unsubscribe function.
 */
export function initAnalytics(
  subscribeRoute?: (cb: (path: string) => void) => (() => void) | void,
) {
  if (typeof window === "undefined" || window.__gaInit) return;
  window.__gaInit = true;

  // The base Google tag is installed statically in <head> (see __root.tsx).
  // Only bootstrap it here if, for any reason, it is not present yet.
  if (typeof window.gtag !== "function") {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, { transport_type: "beacon" });

    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(s);
  }

  lastPath = window.location.pathname + window.location.search;

  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("click", onDocClick, { capture: true });

  if (subscribeRoute) {
    subscribeRoute((path) => {
      if (path === lastPath) return;
      lastPath = path;
      resetScrollMarks();
      // Defer so the new route's <title> is applied before page_view fires.
      setTimeout(() => trackPageView(path, document.title), 60);
    });
  }
}
