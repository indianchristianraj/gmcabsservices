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
