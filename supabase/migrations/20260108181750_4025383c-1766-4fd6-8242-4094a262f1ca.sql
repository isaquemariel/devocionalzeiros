
-- Add revenue tracking columns to authorized_purchases
ALTER TABLE public.authorized_purchases 
ADD COLUMN IF NOT EXISTS amount_paid numeric(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS payment_method text DEFAULT 'pix';

-- Create table for manual sales
CREATE TABLE public.manual_sales (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name text NOT NULL,
  customer_email text,
  amount numeric(10,2) NOT NULL,
  payment_method text NOT NULL DEFAULT 'pix',
  plan_type text NOT NULL DEFAULT 'start',
  notes text,
  sale_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.manual_sales ENABLE ROW LEVEL SECURITY;

-- Admin-only policies
CREATE POLICY "Admins can view manual sales"
  ON public.manual_sales FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert manual sales"
  ON public.manual_sales FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update manual sales"
  ON public.manual_sales FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete manual sales"
  ON public.manual_sales FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Function to get revenue metrics
CREATE OR REPLACE FUNCTION public.admin_get_revenue_metrics(days_back integer DEFAULT 30)
RETURNS TABLE(
  total_revenue numeric,
  avg_ticket numeric,
  pix_count bigint,
  pix_revenue numeric,
  card_count bigint,
  card_revenue numeric,
  boleto_count bigint,
  boleto_revenue numeric,
  other_count bigint,
  other_revenue numeric
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;

  RETURN QUERY
  WITH all_sales AS (
    -- Sales from authorized_purchases
    SELECT 
      COALESCE(ap.amount_paid, 0) as amount,
      COALESCE(ap.payment_method, 'pix') as payment_method,
      ap.purchased_at as sale_date
    FROM authorized_purchases ap
    WHERE ap.purchased_at >= CURRENT_DATE - (days_back || ' days')::interval
      AND ap.status = 'active'
    
    UNION ALL
    
    -- Manual sales
    SELECT 
      ms.amount,
      ms.payment_method,
      ms.created_at as sale_date
    FROM manual_sales ms
    WHERE ms.sale_date >= CURRENT_DATE - (days_back || ' days')::interval
  )
  SELECT 
    COALESCE(SUM(amount), 0)::numeric as total_revenue,
    COALESCE(AVG(amount) FILTER (WHERE amount > 0), 0)::numeric as avg_ticket,
    COUNT(*) FILTER (WHERE lower(payment_method) = 'pix')::bigint as pix_count,
    COALESCE(SUM(amount) FILTER (WHERE lower(payment_method) = 'pix'), 0)::numeric as pix_revenue,
    COUNT(*) FILTER (WHERE lower(payment_method) IN ('card', 'cartao', 'credit_card', 'debit_card'))::bigint as card_count,
    COALESCE(SUM(amount) FILTER (WHERE lower(payment_method) IN ('card', 'cartao', 'credit_card', 'debit_card')), 0)::numeric as card_revenue,
    COUNT(*) FILTER (WHERE lower(payment_method) = 'boleto')::bigint as boleto_count,
    COALESCE(SUM(amount) FILTER (WHERE lower(payment_method) = 'boleto'), 0)::numeric as boleto_revenue,
    COUNT(*) FILTER (WHERE lower(payment_method) NOT IN ('pix', 'card', 'cartao', 'credit_card', 'debit_card', 'boleto'))::bigint as other_count,
    COALESCE(SUM(amount) FILTER (WHERE lower(payment_method) NOT IN ('pix', 'card', 'cartao', 'credit_card', 'debit_card', 'boleto')), 0)::numeric as other_revenue
  FROM all_sales;
END;
$$;

-- Function to get revenue history for charts
CREATE OR REPLACE FUNCTION public.admin_get_revenue_history(days_back integer DEFAULT 30)
RETURNS TABLE(
  sale_date date,
  daily_revenue numeric,
  sale_count bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;

  RETURN QUERY
  WITH all_sales AS (
    SELECT 
      COALESCE(ap.amount_paid, 0) as amount,
      DATE(ap.purchased_at) as sale_day
    FROM authorized_purchases ap
    WHERE ap.purchased_at >= CURRENT_DATE - (days_back || ' days')::interval
      AND ap.status = 'active'
    
    UNION ALL
    
    SELECT 
      ms.amount,
      ms.sale_date as sale_day
    FROM manual_sales ms
    WHERE ms.sale_date >= CURRENT_DATE - (days_back || ' days')::interval
  )
  SELECT 
    sale_day as sale_date,
    COALESCE(SUM(amount), 0)::numeric as daily_revenue,
    COUNT(*)::bigint as sale_count
  FROM all_sales
  GROUP BY sale_day
  ORDER BY sale_day;
END;
$$;
