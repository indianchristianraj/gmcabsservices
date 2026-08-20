ALTER TABLE public.admin_access_requests ADD COLUMN IF NOT EXISTS decision_note text;

CREATE OR REPLACE FUNCTION public.decide_admin_request(_request_id uuid, _approve boolean, _note text DEFAULT NULL)
 RETURNS admin_access_requests
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
        decided_at = now(),
        decision_note = NULLIF(btrim(coalesce(_note, '')), '')
    WHERE id = _request_id
    RETURNING * INTO _row;

  RETURN _row;
END;
$function$;