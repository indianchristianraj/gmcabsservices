import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { listAdsLabelRows, updateAdsLabel, type AdsLabelRow } from "@/lib/ads-labels";
import { ADS_CONVERSION_ID } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/admin/ads-labels")({
  head: () => ({
    meta: [
      { title: "Ads Conversion Labels | GM Cabs Admin" },
      {
        name: "description",
        content: "Manage Google Ads conversion label mappings for GM Cabs Services tracking events.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Ads Conversion Labels | GM Cabs Admin" },
      { property: "og:description", content: "Manage Google Ads conversion label mappings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdsLabelsAdmin,
});

const FRIENDLY: Record<string, string> = {
  booking_form_submit: "Booking form submitted",
  fare_estimate_calculated: "Fare estimate calculated",
  fare_estimate_whatsapp: "WhatsApp click (fare estimate page)",
  whatsapp_click: "WhatsApp click (any page)",
};

function AdsLabelsAdmin() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<AdsLabelRow[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const { data: userData } = await supabase.auth.getUser();
        const uid = userData.user?.id;
        if (uid) {
          const { data: roleRow } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", uid)
            .eq("role", "admin")
            .maybeSingle();
          if (active) setIsAdmin(Boolean(roleRow));
        }
        const list = await listAdsLabelRows();
        if (!active) return;
        setRows(list);
        setDrafts(Object.fromEntries(list.map((r) => [r.id, r.label ?? ""])));
      } catch {
        if (active) setError("Could not load the conversion labels.");
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    return () => {
      active = false;
    };
  }, []);

  async function save(row: AdsLabelRow) {
    setSavingId(row.id);
    setError(null);
    setStatus(null);
    const next = (drafts[row.id] ?? "").trim();
    try {
      await updateAdsLabel(row.id, next === "" ? null : next);
      setRows((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, label: next === "" ? null : next } : r)),
      );
      setStatus(`Saved “${FRIENDLY[row.event_key] ?? row.event_key}”.`);
    } catch {
      setError("Save failed — your account needs admin access to change these values.");
    } finally {
      setSavingId(null);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    void navigate({ to: "/auth", replace: true });
  }

  return (
    <main className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Google Ads conversion labels</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Conversion account <span className="font-mono">{ADS_CONVERSION_ID}</span>. Each event
              sends <span className="font-mono">{ADS_CONVERSION_ID}/&lt;label&gt;</span>.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/">Back to site</Link>
            </Button>
            <Button variant="ghost" onClick={signOut}>
              Sign out
            </Button>
          </div>
        </div>

        {!loading && !isAdmin && (
          <p className="mt-6 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
            You are signed in but do not have admin access, so the labels are read-only. Ask an
            existing admin to grant your account the admin role.
          </p>
        )}

        {status && <p className="mt-6 text-sm text-foreground">{status}</p>}
        {error && (
          <p role="alert" className="mt-6 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="mt-6 space-y-4">
          {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
          {rows.map((row) => (
            <div key={row.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-semibold text-foreground">
                  {FRIENDLY[row.event_key] ?? row.event_key}
                </h2>
                <span className="font-mono text-xs text-muted-foreground">{row.event_key}</span>
              </div>
              {row.note && <p className="mt-1 text-sm text-muted-foreground">{row.note}</p>}
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <Input
                  aria-label={`Conversion label for ${row.event_key}`}
                  placeholder="Conversion label, e.g. 9TdaCMud3N0cEJuU261E"
                  value={drafts[row.id] ?? ""}
                  disabled={!isAdmin}
                  onChange={(e) => setDrafts((d) => ({ ...d, [row.id]: e.target.value }))}
                />
                <Button
                  onClick={() => save(row)}
                  disabled={!isAdmin || savingId === row.id || (drafts[row.id] ?? "") === (row.label ?? "")}
                >
                  {savingId === row.id ? "Saving…" : "Save"}
                </Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Sends:{" "}
                <span className="font-mono">
                  {ADS_CONVERSION_ID}
                  {(drafts[row.id] ?? "").trim() ? `/${(drafts[row.id] ?? "").trim()}` : ""}
                </span>
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          Changes apply to every visitor on their next page load — no redeploy needed.
        </p>
      </div>
    </main>
  );
}
