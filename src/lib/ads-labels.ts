// Database-backed Google Ads conversion label mapping.
// Read by the analytics helper on every page load; edited from /admin/ads-labels.

import { supabase } from "@/integrations/supabase/client";

export type AdsLabelRow = {
  id: string;
  event_key: string;
  label: string | null;
  note: string | null;
  updated_at: string;
};

/**
 * Validate a Google Ads conversion label.
 * Ads labels are short opaque tokens: letters, digits, `-` and `_` only.
 * Returns an error message, a soft warning, or nothing.
 */
export function validateAdsLabel(raw: string): { error?: string; warning?: string } {
  const value = raw.trim();
  if (value === "") return {};
  if (value.includes("/") || /^AW-/i.test(value)) {
    return { error: "Enter only the label part — not the AW-… conversion ID or a full send_to value." };
  }
  if (/\s/.test(value)) return { error: "Labels cannot contain spaces." };
  if (!/^[A-Za-z0-9_-]+$/.test(value)) {
    return { error: "Only letters, numbers, hyphens and underscores are allowed." };
  }
  if (value.length < 10 || value.length > 40) {
    return { warning: "Most Google Ads labels are around 20 characters — double-check this value." };
  }
  return {};
}


/** Public read — any visitor can read the labels (they are not secret). */
export async function fetchAdsConversionLabels(): Promise<Record<string, string | undefined>> {
  const { data, error } = await supabase
    .from("ads_conversion_labels")
    .select("event_key, label");
  if (error || !data) return {};
  const out: Record<string, string | undefined> = {};
  for (const row of data) out[row.event_key] = row.label ?? undefined;
  return out;
}

/** Full rows for the admin table. */
export async function listAdsLabelRows(): Promise<AdsLabelRow[]> {
  const { data, error } = await supabase
    .from("ads_conversion_labels")
    .select("id, event_key, label, note, updated_at")
    .order("event_key", { ascending: true });
  if (error) throw error;
  return (data ?? []) as AdsLabelRow[];
}

/** Admin-only write (enforced by row level security). */
export async function updateAdsLabel(id: string, label: string | null) {
  const { error } = await supabase
    .from("ads_conversion_labels")
    .update({ label })
    .eq("id", id);
  if (error) throw error;
}
