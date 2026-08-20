REVOKE EXECUTE ON FUNCTION public.decide_admin_request(uuid, boolean, text) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.request_admin_access(text) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.decide_admin_request(uuid, boolean, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.request_admin_access(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;