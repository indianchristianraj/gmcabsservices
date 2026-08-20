import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  fetchIsAdmin,
  fetchMyRequest,
  requestAdminAccess,
  type AdminAccessRequest,
} from "@/lib/admin-access";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_authenticated/admin/access")({
  head: () => ({
    meta: [
      { title: "Request Admin Access | GM Cabs Admin" },
      {
        name: "description",
        content: "Request admin access for the GM Cabs Services admin tools and track your request status.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Request Admin Access | GM Cabs Admin" },
      { property: "og:description", content: "Request and track admin access for GM Cabs admin tools." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminAccessPage,
});

const STATUS_TEXT: Record<string, string> = {
  pending: "Pending — an existing admin needs to approve your request.",
  approved: "Approved — you have admin access.",
  rejected: "Rejected — contact an existing admin if you think this is a mistake.",
};

function AdminAccessPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [request, setRequest] = useState<AdminAccessRequest | null>(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [admin, mine] = await Promise.all([fetchIsAdmin(), fetchMyRequest()]);
        if (!active) return;
        setIsAdmin(admin);
        setRequest(mine);
        setReason(mine?.reason ?? "");
      } catch {
        if (active) setError("Could not load your admin access status.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setStatus(null);
    try {
      const row = await requestAdminAccess(reason);
      setRequest(row);
      const admin = await fetchIsAdmin();
      setIsAdmin(admin);
      setStatus(
        admin
          ? "You now have admin access."
          : "Request submitted — an existing admin will review it.",
      );
    } catch {
      setError("Could not submit your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-foreground">Admin access</h1>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/">Back to site</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/admin/ads-labels">Ads labels</Link>
            </Button>
          </div>
        </div>

        {loading && <p className="mt-6 text-sm text-muted-foreground">Loading…</p>}

        {!loading && (
          <>
            {isAdmin ? (
              <p className="mt-6 rounded-lg border border-border bg-muted/40 p-4 text-sm text-foreground">
                You already have admin access. You can manage the{" "}
                <Link to="/admin/ads-labels" className="underline">
                  Google Ads conversion labels
                </Link>
                .
              </p>
            ) : (
              <>
                {request && (
                  <div className="mt-6 rounded-xl border border-border bg-card p-4">
                    <h2 className="font-semibold text-foreground">Your request</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {STATUS_TEXT[request.status] ?? request.status}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Submitted {new Date(request.created_at).toLocaleString()}
                    </p>
                  </div>
                )}

                <form onSubmit={submit} className="mt-6 rounded-xl border border-border bg-card p-4">
                  <label htmlFor="reason" className="font-semibold text-foreground">
                    {request ? "Update your reason" : "Request admin access"}
                  </label>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Tell existing admins why your account needs access.
                  </p>
                  <Textarea
                    id="reason"
                    className="mt-3"
                    rows={4}
                    placeholder="e.g. I manage the Google Ads account and need to update conversion labels."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                  <Button type="submit" className="mt-3" disabled={submitting}>
                    {submitting ? "Submitting…" : request ? "Update request" : "Submit request"}
                  </Button>
                </form>
              </>
            )}

            {status && <p className="mt-4 text-sm text-foreground">{status}</p>}
            {error && (
              <p role="alert" className="mt-4 text-sm text-destructive">
                {error}
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}
