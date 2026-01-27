-- Create function to get referral source metrics
CREATE OR REPLACE FUNCTION public.admin_get_referral_metrics()
RETURNS TABLE(
  referral_source text,
  user_count bigint
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    COALESCE(p.referral_source, 'não informado') as referral_source,
    COUNT(*) as user_count
  FROM profiles p
  INNER JOIN auth.users u ON p.user_id = u.id
  LEFT JOIN authorized_purchases ap ON LOWER(u.email) = LOWER(ap.email) AND ap.status = 'active'
  WHERE ap.status IS NULL OR ap.status = 'active'
  GROUP BY COALESCE(p.referral_source, 'não informado')
  ORDER BY user_count DESC;
$$;