export type TripType = "airport" | "oneway" | "outstation" | "local";

export const TRIP_TYPES: { id: TripType; label: string; icon: string; hint: string }[] = [
  { id: "airport", label: "Airport", icon: "✈️", hint: "Pickup / Drop at RGIA" },
  { id: "oneway", label: "One Way", icon: "➡️", hint: "Drop to any city" },
  { id: "outstation", label: "Outstation", icon: "🛣️", hint: "Round trip · Multi-day" },
  { id: "local", label: "Local (Hourly)", icon: "🏙️", hint: "8/12 hr packages" },
];

export type QuoteVehicle = {
  id: string;
  name: string;
  seats: string;
  perKm: number;
  base: number;
  category: string;
};

export const QUOTE_VEHICLES: QuoteVehicle[] = [
  { id: "dzire", name: "Swift Dzire / Amaze", seats: "4+1", perKm: 12, base: 250, category: "Sedan" },
  { id: "city", name: "Honda City / Verna", seats: "4+1", perKm: 14, base: 300, category: "Sedan+" },
  { id: "innova", name: "Toyota Innova", seats: "7+1", perKm: 17, base: 400, category: "SUV" },
  { id: "crysta", name: "Innova Crysta / Hycross", seats: "6+1", perKm: 20, base: 500, category: "Premium SUV" },
  { id: "fortuner", name: "Fortuner / Carnival", seats: "6+1", perKm: 28, base: 800, category: "Luxury" },
];

export const KM_HINTS: Record<string, number> = {
  warangal: 150,
  vijayawada: 275,
  guntur: 290,
  tirupati: 560,
  bangalore: 570,
  visakhapatnam: 620,
  vizag: 620,
  chennai: 630,
  rajahmundry: 445,
  nellore: 460,
  ongole: 370,
  srisailam: 220,
  yadagirigutta: 60,
  ramoji: 30,
  shamshabad: 30,
  rgia: 30,
  airport: 30,
  pune: 560,
  mumbai: 710,
  kakinada: 500,
};

export function guessKm(text: string): number | null {
  const t = text.toLowerCase();
  for (const key of Object.keys(KM_HINTS)) {
    if (t.includes(key)) return KM_HINTS[key];
  }
  return null;
}

export type EstimateResult = {
  low: number;
  high: number;
  km: number;
  note: string;
};

export function calculateEstimate(
  trip: TripType,
  vehicleId: string,
  pickup = "",
  drop = "",
): EstimateResult {
  const veh = QUOTE_VEHICLES.find((v) => v.id === vehicleId) ?? QUOTE_VEHICLES[3];

  if (trip === "local") {
    const low = veh.base + veh.perKm * 80;
    const high = veh.base + veh.perKm * 120;
    return { low, high, km: 0, note: "8–12 hr city package · fuel & driver included" };
  }

  if (trip === "airport") {
    const low = Math.max(veh.base + veh.perKm * 25, 700);
    const high = veh.base + veh.perKm * 45;
    return { low, high, km: 30, note: "Flat airport transfer within Hyderabad" };
  }

  const km = guessKm(drop) ?? guessKm(pickup) ?? 250;
  const multiplier = trip === "outstation" ? 2 : 1;
  const eff = km * multiplier;
  const low = veh.base + veh.perKm * eff;
  const high = low + veh.perKm * (trip === "outstation" ? 60 : 20);
  return {
    low,
    high,
    km: eff,
    note: trip === "outstation" ? "Round trip · driver bata & tolls extra" : "One way drop · tolls extra",
  };
}
