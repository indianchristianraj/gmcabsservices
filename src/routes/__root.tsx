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
      { title: "GM Cabs Services — Premium Airport Taxi, One Way & Outstation Cabs in Hyderabad" },
      { name: "description", content: "Book premium airport pickup & drop, one way taxi, outstation cabs and luxury car rentals in Hyderabad. Innova Crysta, Hycross, Fortuner & more. 24×7 — 6301875485." },
      { name: "author", content: "GM Cabs Services" },
      { name: "google-site-verification", content: "JwN_4BJkTdWUTjIs_hD_-RpERVpxy62QQXTh6-SB3Jg" },

      { name: "theme-color", content: "#FF8C42" },
      { property: "og:title", content: "GM Cabs Services — Premium Airport Taxi, One Way & Outstation Cabs in Hyderabad" },
      { property: "og:description", content: "Book premium airport pickup & drop, one way taxi, outstation cabs and luxury car rentals in Hyderabad. Innova Crysta, Hycross, Fortuner & more. 24×7 — 6301875485." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "GM Cabs Services" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "GM Cabs Services — Premium Airport Taxi, One Way & Outstation Cabs in Hyderabad" },
      { name: "twitter:description", content: "Book premium airport pickup & drop, one way taxi, outstation cabs and luxury car rentals in Hyderabad. Innova Crysta, Hycross, Fortuner & more. 24×7 — 6301875485." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ea1dea85-749d-4579-a8f3-5a0b577c1528/id-preview-325eb9b3--85b49764-1e1b-42b2-8631-ee0ef9b44953.lovable.app-1784873450046.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ea1dea85-749d-4579-a8f3-5a0b577c1528/id-preview-325eb9b3--85b49764-1e1b-42b2-8631-ee0ef9b44953.lovable.app-1784873450046.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.jpg", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/favicon.jpg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Playfair+Display:wght@700&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "TaxiService"],
          name: "GM Cabs Services",
          image: "https://glide-seamless.lovable.app/favicon.jpg",
          telephone: "+916301875485",
          email: "gmcabs@gmail.com",
          url: "https://glide-seamless.lovable.app",
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
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    void import("../lib/web-vitals").then((m) => m.initWebVitals());
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
