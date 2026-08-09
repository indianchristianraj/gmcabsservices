import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { FloatingWhatsApp } from "../components/FloatingWhatsApp";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "GM Cabs Services — Premium Taxi Hire in Hyderabad" },
      { name: "description", content: "Premium chauffeur-driven cabs in Hyderabad for airport transfers, city rentals and outstation trips. Available 24×7 on 6301875485." },
      { name: "author", content: "GM Cabs Services" },
      { name: "google-site-verification", content: "JwN_4BJkTdWUTjIs_hD_-RpERVpxy62QQXTh6-SB3Jg" },

      { name: "theme-color", content: "#FF8C42" },
      { property: "og:title", content: "GM Cabs Services — Premium Taxi Hire in Hyderabad" },
      { property: "og:description", content: "Premium chauffeur-driven cabs in Hyderabad for airport transfers, city rentals and outstation trips. Available 24×7 on 6301875485." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "GM Cabs Services" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "GM Cabs Services — Premium Taxi Hire in Hyderabad" },
      { name: "twitter:description", content: "Premium chauffeur-driven cabs in Hyderabad for airport transfers, city rentals and outstation trips. Available 24×7 on 6301875485." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ea1dea85-749d-4579-a8f3-5a0b577c1528/id-preview-325eb9b3--85b49764-1e1b-42b2-8631-ee0ef9b44953.lovable.app-1784873450046.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ea1dea85-749d-4579-a8f3-5a0b577c1528/id-preview-325eb9b3--85b49764-1e1b-42b2-8631-ee0ef9b44953.lovable.app-1784873450046.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.jpg", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/favicon.jpg" },
      { rel: "preload", as: "font", type: "font/woff2", href: "/fonts/inter-latin.woff2", crossOrigin: "anonymous" },
      { rel: "preload", as: "font", type: "font/woff2", href: "/fonts/playfairdisplay-700-latin.woff2", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://www.googletagmanager.com" },
      { rel: "dns-prefetch", href: "https://www.googletagmanager.com" },
    ],
    scripts: [
      // Google Tag Manager — loaded first in <head> so the container initializes
      // before any downstream gtag/GA4/Ads configuration.
      {
        children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WCXWQRJ6');`,
      },
      // Google tag (gtag.js) — loaded in <head> on every page so Google Ads /
      // GA4 / Enhanced Conversions and future GTM detection always find it.
      { src: "https://www.googletagmanager.com/gtag/js?id=G-BK309MJNHS", async: true },
      {
        children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','G-BK309MJNHS',{send_page_view:true,transport_type:'beacon'});gtag('config','AW-18349476379');gtag('config','GT-PLTMJBBS');gtag('config','GT-WKGB8FSL');window.__gaTagInstalled=true;`,
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "TaxiService"],
          name: "GM Cabs Services",
          image: "https://gmcabsservices.com/favicon.jpg",
          telephone: "+916301875485",
          email: "gmcabs@gmail.com",
          url: "https://gmcabsservices.com",
          priceRange: "₹₹",
          address: {
            "@type": "PostalAddress",
            streetAddress: "H.No: 7-6/16, Sri Sai Colony, Nacharam",
            addressLocality: "Hyderabad",
            postalCode: "500076",
            addressRegion: "TS",
            addressCountry: "IN",
          },
          areaServed: ["Hyderabad", "Telangana", "Andhra Pradesh"],
          openingHours: "Mo-Su 00:00-23:59",
          sameAs: [],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {/* Google Tag Manager (noscript) — immediately after opening <body> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WCXWQRJ6"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    // Third-party / measurement code is deferred until the page is interactive
    // (browser idle) or the user's first interaction — whichever comes first.
    let done = false;
    const events = ["pointerdown", "keydown", "touchstart", "scroll"] as const;

    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, load));
    };

    function load() {
      if (done) return;
      done = true;
      cleanup();
      void import("../lib/web-vitals").then((m) => m.initWebVitals());
      void import("../lib/analytics").then(({ initAnalytics }) => {
        initAnalytics((cb) => {
          const unsub = router.subscribe("onResolved", () => {
            if (typeof window !== "undefined") {
              cb(window.location.pathname + window.location.search);
            }
          });
          return unsub;
        });
      });
    }

    events.forEach((e) => window.addEventListener(e, load, { passive: true, once: true }));

    const ric = (window as unknown as {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    }).requestIdleCallback;
    const timer = ric ? ric(load, { timeout: 4000 }) : window.setTimeout(load, 2500);

    return () => {
      cleanup();
      if (!ric) window.clearTimeout(timer);
    };
  }, [router]);


  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <FloatingWhatsApp />
    </QueryClientProvider>
  );
}
