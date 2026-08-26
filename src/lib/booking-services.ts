export const SERVICE_OPTIONS = [
  "Airport Pickup",
  "Airport Drop",
  "One Way Taxi",
  "Outstation Cab",
  "Local Rental",
  "Corporate Travel",
  "Wedding Cars",
  "Temple Tour",
  "Luxury Car Rental",
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

/** Maps /services/<slug> pages to the matching option in the booking form. */
export const SLUG_TO_SERVICE: Record<string, ServiceOption> = {
  "airport-pickup": "Airport Pickup",
  "airport-drop": "Airport Drop",
  "one-way-taxi": "One Way Taxi",
  "outstation-cabs": "Outstation Cab",
  "local-rental": "Local Rental",
  "corporate-travel": "Corporate Travel",
  "wedding-cars": "Wedding Cars",
  "temple-tours": "Temple Tour",
  "luxury-car-rental": "Luxury Car Rental",
};

/** Accepts a slug or a service label and returns a valid option (or undefined). */
export function resolveService(value?: string | null): ServiceOption | undefined {
  if (!value) return undefined;
  const v = value.trim();
  if (SLUG_TO_SERVICE[v]) return SLUG_TO_SERVICE[v];
  const match = SERVICE_OPTIONS.find((o) => o.toLowerCase() === v.toLowerCase());
  return match;
}
