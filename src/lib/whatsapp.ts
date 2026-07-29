import { useSyncExternalStore } from "react";

export const PHONE = "6301875485";
export const PHONE_INTL = "916301875485";
export const telLink = `tel:+${PHONE_INTL}`;

export function waFor(context?: string, route?: string) {
  const base = "Hi GM Cabs,";
  const ctx = context ? ` I'm interested in *${context}*.` : " I would like to book a cab.";
  const from = route && route !== "/" ? ` (from page: ${route})` : "";
  const msg = `${base}${ctx}${from} Please share availability and pricing.`;
  return `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(msg)}`;
}

export const SECTION_CONTEXT: Record<string, string> = {
  services: "your cab services",
  fleet: "your premium fleet",
  routes: "your popular outstation routes",
  packages: "your Hyderabad cab packages",
  about: "GM Cabs Services",
  contact: "booking a cab",
};

/* ---- shared booking draft (used by BookingForm + FloatingWhatsApp) ---- */
export type BookingDraft = {
  name: string; phone: string; service: string; car: string;
  pickup: string; drop: string; date: string; time: string;
  tripType: string; passengers: string; luggage: string; notes: string;
};
export const EMPTY_DRAFT: BookingDraft = {
  name: "", phone: "", service: "", car: "", pickup: "", drop: "",
  date: "", time: "", tripType: "", passengers: "", luggage: "", notes: "",
};
let bookingDraft: BookingDraft = EMPTY_DRAFT;
const bookingListeners = new Set<() => void>();
export const bookingStore = {
  get: () => bookingDraft,
  set: (d: BookingDraft) => { bookingDraft = d; bookingListeners.forEach((l) => l()); },
  subscribe: (l: () => void) => { bookingListeners.add(l); return () => { bookingListeners.delete(l); }; },
};
export function useBookingDraft() {
  return useSyncExternalStore(bookingStore.subscribe, bookingStore.get, () => EMPTY_DRAFT);
}
export function hasBookingDetails(d: BookingDraft) {
  return !!(d.name || d.phone || d.pickup || d.drop || d.date || d.time || d.notes);
}
export function buildBookingMessage(d: BookingDraft) {
  const lines = ["Hi GM Cabs, I'd like to book a cab. Here are my trip details:", ""];
  if (d.name) lines.push(`• Name: ${d.name}`);
  if (d.phone) lines.push(`• Phone: ${d.phone}`);
  if (d.service) lines.push(`• Service: ${d.service}`);
  if (d.car) lines.push(`• Car type: ${d.car}`);
  if (d.tripType) lines.push(`• Trip type: ${d.tripType}`);
  if (d.pickup) lines.push(`• Pickup: ${d.pickup}`);
  if (d.drop) lines.push(`• Drop: ${d.drop}`);
  if (d.date) lines.push(`• Date: ${d.date}${d.time ? ` at ${d.time}` : ""}`);
  else if (d.time) lines.push(`• Time: ${d.time}`);
  if (d.passengers) lines.push(`• Passengers: ${d.passengers}`);
  if (d.luggage) lines.push(`• Luggage: ${d.luggage}`);
  if (d.notes.trim()) lines.push(`• Notes: ${d.notes.trim()}`);
  lines.push("", "Please share availability and fare. Thank you!");
  return lines.join("\n");
}
