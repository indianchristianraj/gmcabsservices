// GA4 analytics helper — auto page_view (SPA), scroll depth, outbound / mail /
// tel / whatsapp click delegation, plus a `trackEvent` API for domain events.
// Loads gtag.js lazily to keep TTI unaffected.

export const GA_MEASUREMENT_ID = "G-BK309MJNHS";

/**
 * Google Ads conversion configuration.
 *
 * Everything below is configurable WITHOUT code changes:
 *
 * 1. Environment (build time) — set in your `.env` / hosting env:
 *      VITE_ADS_CONVERSION_ID="AW-18349476379"
 *      VITE_ADS_CONVERSION_LABELS='{"booking_form_submit":"AbC-D_efG","fare_estimate_whatsapp":"XyZ123"}'
 *    The labels var also accepts a compact form:
 *      VITE_ADS_CONVERSION_LABELS="booking_form_submit=AbC-D_efG,whatsapp_click=XyZ123"
 *
 * 2. Runtime override (no rebuild) — from the browser console or a tag manager:
 *      localStorage.setItem('ads_conversion_labels', '{"whatsapp_click":"XyZ123"}')
 *      window.__ADS_CONVERSION_LABELS = { whatsapp_click: "XyZ123" }
 *
 * Precedence: runtime override > env > built-in defaults.
 * Without a label the hit still reaches the Ads account via send_to (AW id only).
 */
const DEFAULT_ADS_CONVERSION_ID = "AW-18349476379";

const DEFAULT_ADS_CONVERSION_LABELS: Record<string, string | undefined> = {
  booking_form_submit: "9TdaCMud3N0cEJuU261E",
  fare_estimate_calculated: undefined,
  fare_estimate_whatsapp: undefined,
  whatsapp_click: undefined,
};

function parseLabels(raw: unknown): Record<string, string> {
  if (!raw || typeof raw !== "string") {
    return raw && typeof raw === "object" ? ({ ...(raw as Record<string, string>) }) : {};
  }
  const value = raw.trim();
  if (!value) return {};
  if (value.startsWith("{")) {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }
  // "key=label,key2=label2" form
  const out: Record<string, string> = {};
  for (const pair of value.split(",")) {
    const [k, v] = pair.split(/[=:]/);
    if (k && v) out[k.trim()] = v.trim();
  }
  return out;
}

export const ADS_CONVERSION_ID =
  (import.meta.env?.VITE_ADS_CONVERSION_ID as string | undefined)?.trim() ||
  DEFAULT_ADS_CONVERSION_ID;

const ENV_LABELS = parseLabels(import.meta.env?.VITE_ADS_CONVERSION_LABELS);

/** Labels overridden at runtime (localStorage / window global), browser only. */
function runtimeLabels(): Record<string, string> {
  if (typeof window === "undefined") return {};
  let stored: Record<string, string> = {};
  try {
    stored = parseLabels(window.localStorage.getItem("ads_conversion_labels"));
  } catch {
    stored = {};
  }
  const globalLabels = parseLabels(
    (window as unknown as { __ADS_CONVERSION_LABELS?: unknown }).__ADS_CONVERSION_LABELS,
  );
  return { ...stored, ...globalLabels };
}

/** Effective label map: defaults < env < runtime override. */
export function getAdsConversionLabels(): Record<string, string | undefined> {
  return { ...DEFAULT_ADS_CONVERSION_LABELS, ...ENV_LABELS, ...runtimeLabels() };
}

/** Set (or clear, with `undefined`) a label at runtime and persist it. */
export function setAdsConversionLabel(key: string, label?: string) {
  if (typeof window === "undefined") return;
  try {
    const current = parseLabels(window.localStorage.getItem("ads_conversion_labels"));
    if (label) current[key] = label;
    else delete current[key];
    window.localStorage.setItem("ads_conversion_labels", JSON.stringify(current));
  } catch {
    /* storage unavailable */
  }
}

/** Back-compat export — snapshot of the effective labels. */
export const ADS_CONVERSION_LABELS: Record<string, string | undefined> = getAdsConversionLabels();

/** Fire a Google Ads conversion. Safe no-op if gtag hasn't loaded yet. */
export function trackAdsConversion(key: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const label = getAdsConversionLabels()[key];
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
