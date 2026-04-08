
-- Drop the restrictive staff-only update policy
DROP POLICY IF EXISTS "Staff can update orders" ON public.orders;

-- Allow anyone to update orders (PIN auth is handled at app level)
CREATE POLICY "Anyone can update orders"
ON public.orders
FOR UPDATE
USING (true)
WITH CHECK (true);
