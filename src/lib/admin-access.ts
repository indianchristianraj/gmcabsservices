import { supabase } from "@/integrations/supabase/client";

export type AdminRequestStatus = "pending" | "approved" | "rejected";

export type AdminAccessRequest = {
  id: string;
  user_id: string;
  email: string | null;
  reason: string | null;
  status: AdminRequestStatus;
  decided_by: string | null;
  decided_at: string | null;
  created_at: string;
  updated_at: string;
};

/** Does the signed-in user hold the admin role? */
export async function fetchIsAdmin(): Promise<boolean> {
  const { data: userData } = await supabase.auth.getUser();
  const uid = userData.user?.id;
  if (!uid) return false;
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", uid)
    .eq("role", "admin")
    .maybeSingle();
  return Boolean(data);
}

/** The signed-in user's own request, if any. RLS scopes this to them. */
export async function fetchMyRequest(): Promise<AdminAccessRequest | null> {
  const { data: userData } = await supabase.auth.getUser();
  const uid = userData.user?.id;
  if (!uid) return null;
  const { data, error } = await supabase
    .from("admin_access_requests")
    .select("*")
    .eq("user_id", uid)
    .maybeSingle();
  if (error) throw error;
  return (data as AdminAccessRequest | null) ?? null;
}

/**
 * Submit (or refresh) a request for admin access.
 * If the site has no admin yet, the database grants the first requester the
 * admin role automatically; otherwise it stays pending until an admin approves.
 */
export async function requestAdminAccess(reason: string): Promise<AdminAccessRequest> {
  const { data, error } = await supabase.rpc("request_admin_access", {
    _reason: reason.trim() === "" ? undefined : reason.trim(),
  });
  if (error) throw error;
  return data as unknown as AdminAccessRequest;
}

/** Admin-only: every request, newest first. RLS blocks non-admins. */
export async function listAdminRequests(): Promise<AdminAccessRequest[]> {
  const { data, error } = await supabase
    .from("admin_access_requests")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as AdminAccessRequest[];
}

/** Admin-only: approve or reject. The database re-checks the caller's role. */
export async function decideAdminRequest(
  requestId: string,
  approve: boolean,
): Promise<AdminAccessRequest> {
  const { data, error } = await supabase.rpc("decide_admin_request", {
    _request_id: requestId,
    _approve: approve,
  });
  if (error) throw error;
  return data as unknown as AdminAccessRequest;
}
