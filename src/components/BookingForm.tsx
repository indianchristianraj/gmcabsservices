import { useState, useEffect, useRef } from "react";
import { trackEvent, trackAdsConversion } from "@/lib/analytics";
import { WhatsAppIcon } from "@/components/FloatingWhatsApp";
import { PHONE_INTL, bookingStore, EMPTY_DRAFT } from "@/lib/whatsapp";
import { SERVICE_OPTIONS, resolveService } from "@/lib/booking-services";

export type BookingFields =
  | "name"
  | "phone"
  | "service"
  | "car"
  | "pickup"
  | "drop"
  | "date"
  | "time"
  | "tripType"
  | "passengers"
  | "luggage"
  | "notes";

export type Errors = Partial<Record<BookingFields, string>>;

export function todayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 10);
}

export function validateField(
  name: BookingFields,
  value: string,
  form: Record<BookingFields, string>,
): string | undefined {
  switch (name) {
    case "phone": {
      const digits = value.replace(/\D/g, "");
      if (!value.trim()) return "Mobile number is required.";
      if (!/^[0-9+ -]+$/.test(value)) return "Only digits, +, spaces and dashes are allowed.";
      if (digits.length < 10) return "Enter at least 10 digits.";
      if (digits.length > 13) return "Number is too long.";
      if (
        /^\+?91/.test(digits)
          ? !/^[6-9]/.test(digits.replace(/^\+?91/, ""))
          : !/^[6-9]/.test(digits)
      )
        return "Indian mobile numbers start with 6, 7, 8 or 9.";
      return undefined;
    }
    case "date": {
      if (!value) return "Travel date is required.";
      if (value < todayISO()) return "Date can't be in the past.";
      return undefined;
    }
    case "time": {
      if (!value) return undefined;
      if (form.date && form.date === todayISO()) {
        const now = new Date();
        const [h, m] = value.split(":").map(Number);
        if (h * 60 + m <= now.getHours() * 60 + now.getMinutes())
          return "Pickup time must be later than now.";
      }
      return undefined;
    }
    case "pickup":
    case "drop": {
      const other = name === "pickup" ? form.drop : form.pickup;
      const label = name === "pickup" ? "Pickup" : "Drop";
      const v = value.trim();
      if (!v) return `${label} location is required.`;
      if (v.length < 3) return `${label} location must be at least 3 characters.`;
      if (v.length > 120) return `${label} location is too long.`;
      if (!/[a-zA-Z\u0900-\u097F\u0C00-\u0C7F]/u.test(v))
        return `Enter a valid ${label.toLowerCase()} location.`;
      if (other.trim() && other.trim().toLowerCase() === v.toLowerCase())
        return "Pickup and drop can't be the same.";
      return undefined;
    }
    case "passengers": {
      if (!value) return "Select the number of passengers.";
      const n = value === "7+" ? 7 : parseInt(value, 10);
      if (Number.isNaN(n) || n < 1) return "At least 1 passenger.";
      if (n > 17) return "For 17+ people please call us.";
      return undefined;
    }
    default:
      return undefined;
  }
}

export function BookingForm({
  title = "Booking request",
  description = "All fields marked * are required.",
  className = "",
  onSubmitSuccess,
  initialService,
}: {
  title?: string;
  description?: string;
  className?: string;
  onSubmitSuccess?: () => void;
  /** Slug (e.g. "airport-pickup") or label (e.g. "Airport Pickup") to preselect. */
  initialService?: string;
}) {
  const preselected = resolveService(initialService);
  const [form, setForm] = useState<Record<BookingFields, string>>({
    name: "",
    phone: "",
    service: preselected ?? "Airport Pickup",
    car: "Sedan (City/Verna)",
    pickup: "",
    drop: "",
    date: "",
    time: "",
    tripType: "One-way",
    passengers: "2",
    luggage: "1",
    notes: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<BookingFields, boolean>>>({});
  const startedRef = useRef(false);

  useEffect(() => {
    if (preselected) setForm((f) => (f.service === preselected ? f : { ...f, service: preselected }));
  }, [preselected]);

  useEffect(() => {
    bookingStore.set(form);
  }, [form]);

  useEffect(() => {
    return () => {
      bookingStore.set(EMPTY_DRAFT);
    };
  }, []);

  const validated: BookingFields[] = ["phone", "pickup", "drop", "date", "time", "passengers"];

  function runValidation(next: Record<BookingFields, string>): Errors {
    const errs: Errors = {};
    for (const f of validated) {
      const msg = validateField(f, next[f], next);
      if (msg) errs[f] = msg;
    }
    return errs;
  }

  const update =
    (k: BookingFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const next = { ...form, [k]: e.target.value };
      setForm(next);
      if (!startedRef.current) {
        startedRef.current = true;
        trackEvent("booking_started", { source: "booking_form", first_field: k });
      }
      if (touched[k] || errors[k]) setErrors(runValidation(next));
    };

  const blur = (k: BookingFields) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(runValidation(form));
  };

  const canSubmit =
    form.name && form.phone && form.pickup && form.drop && form.date && Object.keys(runValidation(form)).length === 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = runValidation(form);
    setErrors(errs);
    setTouched({ phone: true, pickup: true, drop: true, date: true, time: true, passengers: true });
    if (Object.keys(errs).length > 0 || !form.name || !form.pickup || !form.drop) return;

    const lines = [
      "Hi GM Cabs, I'd like to book a cab. Here are my trip details:",
      "",
      `• Name: ${form.name}`,
      `• Phone: ${form.phone}`,
      `• Service: ${form.service}`,
      `• Car type: ${form.car}`,
      `• Trip type: ${form.tripType}`,
      `• Pickup: ${form.pickup}`,
      `• Drop: ${form.drop}`,
      `• Date: ${form.date}${form.time ? ` at ${form.time}` : ""}`,
      `• Passengers: ${form.passengers}`,
      `• Luggage: ${form.luggage}`,
    ];
    if (form.notes.trim()) lines.push(`• Notes: ${form.notes.trim()}`);
    lines.push("", "Please share availability and fare. Thank you!");

    const url = `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(lines.join("\n"))}`;
    // `submissionId` is stable per unique submission payload, so a double
    // click / re-submit of identical data never counts twice — it guards the
    // GA4 events AND the Ads conversion below.
    const submissionId = `booking-${btoa(
      unescape(encodeURIComponent([form.phone, form.pickup, form.drop, form.date, form.time].join("|"))),
    ).replace(/=+$/, "")}`;
    trackAdsConversion(
      "booking_form_submit",
      {
        event_category: "booking",
        service_type: form.service,
        vehicle_category: form.car,
        trip_type: form.tripType,
      },
      submissionId,
    );
    window.open(url, "_blank", "noopener,noreferrer");
    onSubmitSuccess?.();
  }


  const baseInput =
    "w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2";
  const okInput = "border-border focus:border-orange focus:ring-orange/30";
  const errInput = "border-destructive focus:border-destructive focus:ring-destructive/30";
  const inputCls = (k: BookingFields) => `${baseInput} ${errors[k] ? errInput : okInput}`;
  const labelCls = "text-xs font-semibold uppercase tracking-wider text-muted-foreground";
  const errMsg = (k: BookingFields) =>
    errors[k] ? (
      <p role="alert" className="mt-1 flex items-start gap-1 text-xs font-medium text-destructive">
        <span aria-hidden>⚠</span>
        <span>{errors[k]}</span>
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className={`rounded-2xl border border-border bg-card p-6 shadow-card md:p-8 ${className}`}>
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gradient text-xl text-white shadow-gold">📝</span>
        <div>
          <h3 className="font-display text-xl font-bold text-primary">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1.5">
          <span className={labelCls}>Full name *</span>
          <input
            required
            value={form.name}
            onChange={update("name")}
            className={`${baseInput} ${okInput}`}
            placeholder="Your name"
          />
        </label>
        <label className="space-y-1.5">
          <span className={labelCls}>Mobile number *</span>
          <input
            required
            type="tel"
            inputMode="tel"
            value={form.phone}
            onChange={update("phone")}
            onBlur={blur("phone")}
            aria-invalid={!!errors.phone}
            className={inputCls("phone")}
            placeholder="10-digit mobile"
          />
          {errMsg("phone")}
        </label>
        <label className="space-y-1.5">
          <span className={labelCls}>Preferred service *</span>
          <select value={form.service} onChange={update("service")} className={`${baseInput} ${okInput}`}>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>

        <label className="space-y-1.5">
          <span className={labelCls}>Car type</span>
          <select value={form.car} onChange={update("car")} className={`${baseInput} ${okInput}`}>
            {[
              "Economy (Dzire/Amaze)",
              "Sedan (City/Verna)",
              "SUV (Innova/Crysta)",
              "Premium (Hycross)",
              "Luxury (Fortuner/Camry)",
              "Kia Carnival",
            ].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label className="space-y-1.5 sm:col-span-2">
          <span className={labelCls}>Pickup location *</span>
          <input
            required
            value={form.pickup}
            onChange={update("pickup")}
            onBlur={blur("pickup")}
            aria-invalid={!!errors.pickup}
            className={inputCls("pickup")}
            placeholder="e.g. Nacharam, Hyderabad"
          />
          {errMsg("pickup")}
        </label>
        <label className="space-y-1.5 sm:col-span-2">
          <span className={labelCls}>Drop location *</span>
          <input
            required
            value={form.drop}
            onChange={update("drop")}
            onBlur={blur("drop")}
            aria-invalid={!!errors.drop}
            className={inputCls("drop")}
            placeholder="e.g. RGIA Airport / Tirupati"
          />
          {errMsg("drop")}
        </label>
        <label className="space-y-1.5">
          <span className={labelCls}>Travel date *</span>
          <input
            required
            type="date"
            min={todayISO()}
            value={form.date}
            onChange={update("date")}
            onBlur={blur("date")}
            aria-invalid={!!errors.date}
            className={inputCls("date")}
          />
          {errMsg("date")}
        </label>
        <label className="space-y-1.5">
          <span className={labelCls}>Pickup time</span>
          <input
            type="time"
            value={form.time}
            onChange={update("time")}
            onBlur={blur("time")}
            aria-invalid={!!errors.time}
            className={inputCls("time")}
          />
          {errMsg("time")}
        </label>
        <label className="space-y-1.5">
          <span className={labelCls}>Trip type</span>
          <select value={form.tripType} onChange={update("tripType")} className={`${baseInput} ${okInput}`}>
            {["One-way", "Round trip", "Multi-day"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="space-y-1.5">
            <span className={labelCls}>Passengers *</span>
            <select
              value={form.passengers}
              onChange={update("passengers")}
              onBlur={blur("passengers")}
              aria-invalid={!!errors.passengers}
              className={inputCls("passengers")}
            >
              {["1", "2", "3", "4", "5", "6", "7+"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            {errMsg("passengers")}
          </label>
          <label className="space-y-1.5">
            <span className={labelCls}>Luggage</span>
            <select value={form.luggage} onChange={update("luggage")} className={`${baseInput} ${okInput}`}>
              {["0", "1", "2", "3", "4+"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="space-y-1.5 sm:col-span-2">
          <span className={labelCls}>Additional notes</span>
          <textarea
            rows={3}
            value={form.notes}
            onChange={update("notes")}
            className={`${baseInput} ${okInput}`}
            placeholder="Flight number, child seat, stops on the way…"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--whatsapp-ink)] px-6 py-3.5 text-sm font-semibold text-white shadow-elegant transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <WhatsAppIcon className="h-5 w-5" /> Send booking on WhatsApp
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Your details open in WhatsApp so you can review before sending.
      </p>
    </form>
  );
}
