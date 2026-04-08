
CREATE OR REPLACE FUNCTION public.verify_pin(_pin text, _hash text)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, extensions
AS $$
BEGIN
  RETURN _hash = extensions.crypt(_pin, _hash);
END;
$$;
