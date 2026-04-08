
-- Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Hash the existing admin PIN
UPDATE public.settings 
SET value = crypt(value, gen_salt('bf'))
WHERE key = 'admin_pin';

-- Remove the public SELECT policy on settings
DROP POLICY IF EXISTS "Anyone can view settings" ON public.settings;

-- Restrict orders UPDATE to authenticated admins/staff only
DROP POLICY IF EXISTS "Anyone can update orders" ON public.orders;
CREATE POLICY "Staff can update orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff')
);

-- Restrict user_roles SELECT to own user only (admins can see all via the ALL policy)
DROP POLICY IF EXISTS "Authenticated users can view roles" ON public.user_roles;
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
