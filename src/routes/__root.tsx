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
      { title: "GM Cabs Services — Hyderabad Airport Taxi, One Way & Outstation Cabs" },
      { name: "description", content: "Premium airport taxi, one way drop & luxury outstation cabs across Telangana & Andhra Pradesh. 24×7 professional chauffeurs. Book on WhatsApp — 6301875485." },
      { name: "author", content: "GM Cabs Services" },
      { name: "theme-color", content: "#FF8C42" },
      { property: "og:title", content: "GM Cabs Services — Hyderabad's Premium Airport & Outstation Cab Partner" },
      { property: "og:description", content: "Airport pickup & drop, one way taxi, outstation & luxury car rentals across Telangana and Andhra Pradesh. Call 6301875485." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "GM Cabs Services" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "GM Cabs Services — Premium Hyderabad Cabs" },
      { name: "twitter:description", content: "Airport, One Way & Outstation cabs across Telangana & Andhra Pradesh." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.jpg", type: "image/jpeg" },
      { rel: "apple-touch-icon", href: "/favicon.jpg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap" },
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

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
