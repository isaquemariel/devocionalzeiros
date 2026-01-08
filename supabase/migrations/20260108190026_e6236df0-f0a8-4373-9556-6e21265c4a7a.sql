-- Fix admin_get_all_users to calculate points and active_days exactly like get_user_rankings
-- This ensures consistency between admin panel and the app

CREATE OR REPLACE FUNCTION public.admin_get_all_users()
RETURNS TABLE(
  user_id uuid, 
  email text, 
  full_name text, 
  avatar_url text, 
  created_at timestamp with time zone, 
  last_sign_in_at timestamp with time zone, 
  plan_type text, 
  plan_status text, 
  total_points bigint, 
  active_days bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow admins
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;

  RETURN QUERY
  SELECT 
    au.id as user_id,
    au.email::text,
    p.full_name,
    p.avatar_url,
    au.created_at,
    au.last_sign_in_at,
    COALESCE(ap.plan_type, 'none')::text as plan_type,
    COALESCE(ap.status, 'inactive')::text as plan_status,
    -- Calculate total_points exactly like get_user_rankings
    (
      COALESCE((SELECT COUNT(*) FROM reading_schedule rs WHERE rs.user_id = au.id AND rs.is_completed = true), 0) +
      COALESCE((SELECT SUM(qa.points_earned) FROM quiz_attempts qa WHERE qa.user_id = au.id), 0) +
      COALESCE((SELECT COUNT(*) FROM devotional_completions dc WHERE dc.user_id = au.id), 0)
    )::bigint as total_points,
    -- Calculate active_days exactly like get_user_rankings
    COALESCE((SELECT COUNT(DISTINCT dl.login_date) FROM daily_logins dl WHERE dl.user_id = au.id), 0)::bigint as active_days
  FROM auth.users au
  LEFT JOIN profiles p ON p.user_id = au.id
  LEFT JOIN authorized_purchases ap ON ap.user_id = au.id OR ap.email = au.email
  ORDER BY au.created_at DESC;
END;
$$;