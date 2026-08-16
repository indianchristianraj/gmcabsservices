CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE TABLE public.ads_conversion_labels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_key text NOT NULL UNIQUE,
  label text,
  note text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.ads_conversion_labels TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ads_conversion_labels TO authenticated;
GRANT ALL ON public.ads_conversion_labels TO service_role;
ALTER TABLE public.ads_conversion_labels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read conversion labels"
ON public.ads_conversion_labels FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Admins can insert conversion labels"
ON public.ads_conversion_labels FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update conversion labels"
ON public.ads_conversion_labels FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete conversion labels"
ON public.ads_conversion_labels FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER ads_conversion_labels_touch
BEFORE UPDATE ON public.ads_conversion_labels
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

INSERT INTO public.ads_conversion_labels (event_key, label, note) VALUES
  ('booking_form_submit', '9TdaCMud3N0cEJuU261E', 'Booking form successfully submitted'),
  ('fare_estimate_calculated', NULL, 'User calculated a fare estimate'),
  ('fare_estimate_whatsapp', NULL, 'WhatsApp click from the fare estimate page'),
  ('whatsapp_click', NULL, 'Any WhatsApp button click');