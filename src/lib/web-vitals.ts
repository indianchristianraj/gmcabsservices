import { onCLS, onFCP, onLCP, onINP, onTTFB, type Metric } from "web-vitals";

type VitalsWindow = Window & {
  __webVitals?: Record<string, Metric>;
  dataLayer?: unknown[];
};

const emoji: Record<string, string> = {
  good: "🟢",
  "needs-improvement": "🟡",
  poor: "🔴",
};

function report(metric: Metric) {
  const w = window as VitalsWindow;
  w.__webVitals = w.__webVitals ?? {};
  w.__webVitals[metric.name] = metric;

  // Console log — inspect in DevTools or Lovable console
  // eslint-disable-next-line no-console
  console.log(
    `[web-vitals] ${emoji[metric.rating] ?? "⚪"} ${metric.name}: ${metric.value.toFixed(1)} (${metric.rating})`,
    metric,
  );

  // Push to dataLayer for GA4 / GTM if present
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({
      event: "web-vitals",
      metric_name: metric.name,
      metric_value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      metric_rating: metric.rating,
      metric_id: metric.id,
    });
  }

  // Send to GA4 if gtag is present
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") {
    gtag("event", metric.name, {
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_rating: metric.rating,
      non_interaction: true,
    });
  }
}

export function initWebVitals() {
  if (typeof window === "undefined") return;
  onFCP(report);
  onLCP(report);
  onCLS(report);
  onINP(report);
  onTTFB(report);
}
