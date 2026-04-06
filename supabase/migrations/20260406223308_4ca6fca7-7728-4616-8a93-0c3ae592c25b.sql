
-- Orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_code TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  table_number TEXT NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('online', 'cash')),
  status TEXT NOT NULL DEFAULT 'received' CHECK (status IN ('received', 'preparing', 'almost-ready', 'ready')),
  total NUMERIC NOT NULL DEFAULT 0,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Everyone can insert orders (customers place orders without auth)
CREATE POLICY "Anyone can create orders" ON public.orders FOR INSERT WITH CHECK (true);

-- Everyone can view orders (needed for customer tracking and admin)
CREATE POLICY "Anyone can view orders" ON public.orders FOR SELECT USING (true);

-- Everyone can update order status (admin updates - will add proper auth later)
CREATE POLICY "Anyone can update orders" ON public.orders FOR UPDATE USING (true);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for orders table
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
