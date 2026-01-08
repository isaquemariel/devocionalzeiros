-- Update the revenue metrics function to exclude manually added users (those with no real payment)
-- Only count users who actually paid (amount_paid > 0)

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
    -- Sales from authorized_purchases (ONLY those with actual payment - amount_paid > 0)
    SELECT 
      COALESCE(ap.amount_paid, 0) as amount,
      COALESCE(ap.payment_method, 'pix') as payment_method,
      ap.purchased_at as sale_date
    FROM authorized_purchases ap
    WHERE ap.purchased_at >= CURRENT_DATE - (days_back || ' days')::interval
      AND ap.status = 'active'
      AND COALESCE(ap.amount_paid, 0) > 0  -- Exclude manually added users (no payment)
    
    UNION ALL
    
    -- Manual sales (always include - these are real sales)
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