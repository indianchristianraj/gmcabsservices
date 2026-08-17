CREATE TABLE public.admin_access_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  email text,
  reason text,
  status text NOT NULL DEFAULT 'pending',
  decided_by uuid,
  decided_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT admin_access_requests_status_check CHECK (status IN ('pending','approved','rejected'))
);

GRANT SELECT, INSERT ON public.admin_access_requests TO authenticated;
GRANT UPDATE ON public.admin_access_requests TO authenticated;
GRANT ALL ON public.admin_access_requests TO service_role;

ALTER TABLE public.admin_access_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own admin request"
  ON public.admin_access_requests FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all admin requests"
  ON public.admin_access_requests FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can create their own admin request"
  ON public.admin_access_requests FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND status = 'pending');

CREATE POLICY "Admins can update admin requests"
  ON public.admin_access_requests FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER admin_access_requests_touch
  BEFORE UPDATE ON public.admin_access_requests
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Request access. Auto-grants admin only when the site has no admin yet.
CREATE OR REPLACE FUNCTION public.request_admin_access(_reason text DEFAULT NULL)
RETURNS public.admin_access_requests
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _email text;
  _has_admin boolean;
  _row public.admin_access_requests;
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT u.email INTO _email FROM auth.users u WHERE u.id = _uid;
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') INTO _has_admin;

  INSERT INTO public.admin_access_requests (user_id, email, reason, status)
  VALUES (_uid, _email, NULLIF(btrim(coalesce(_reason,'')), ''), 'pending')
  ON CONFLICT (user_id) DO UPDATE
    SET reason = COALESCE(EXCLUDED.reason, public.admin_access_requests.reason),
        email = EXCLUDED.email,
        status = CASE WHEN public.admin_access_requests.status = 'approved'
                      THEN 'approved' ELSE 'pending' END,
        updated_at = now()
  RETURNING * INTO _row;

  IF NOT _has_admin THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (_uid, 'admin') ON CONFLICT DO NOTHING;

    UPDATE public.admin_access_requests
      SET status = 'approved', decided_by = _uid, decided_at = now()
      WHERE id = _row.id
      RETURNING * INTO _row;
  END IF;

  RETURN _row;
END;
$$;

REVOKE ALL ON FUNCTION public.request_admin_access(text) FROM public;
GRANT EXECUTE ON FUNCTION public.request_admin_access(text) TO authenticated;

-- Approve or reject a pending request. Admin only.
CREATE OR REPLACE FUNCTION public.decide_admin_request(_request_id uuid, _approve boolean)
RETURNS public.admin_access_requests
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _row public.admin_access_requests;
BEGIN
  IF _uid IS NULL OR NOT public.has_role(_uid, 'admin') THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;

  SELECT * INTO _row FROM public.admin_access_requests WHERE id = _request_id;
  IF _row.id IS NULL THEN
    RAISE EXCEPTION 'Request not found';
  END IF;

  IF _approve THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (_row.user_id, 'admin') ON CONFLICT DO NOTHING;
  ELSE
    DELETE FROM public.user_roles WHERE user_id = _row.user_id AND role = 'admin';
  END IF;

  UPDATE public.admin_access_requests
    SET status = CASE WHEN _approve THEN 'approved' ELSE 'rejected' END,
        decided_by = _uid,
        decided_at = now()
    WHERE id = _request_id
    RETURNING * INTO _row;

  RETURN _row;
END;
$$;

REVOKE ALL ON FUNCTION public.decide_admin_request(uuid, boolean) FROM public;
GRANT EXECUTE ON FUNCTION public.decide_admin_request(uuid, boolean) TO authenticated;