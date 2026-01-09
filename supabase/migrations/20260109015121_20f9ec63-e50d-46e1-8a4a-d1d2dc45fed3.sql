-- Sync admin_get_all_users with get_user_rankings point calculation
-- Ranking: chapters_read (from reading_schedule) + quiz_points (sum of points_earned) + devotional_points (count * 10)
-- Admin should use SAME formula

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
  active_days bigint,
  phone text,
  cpf text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id as user_id,
    u.email::text,
    COALESCE(p.full_name, u.raw_user_meta_data->>'full_name', 'Sem nome')::text as full_name,
    p.avatar_url::text,
    u.created_at,
    u.last_sign_in_at,
    COALESCE(ap.plan_type, 'start')::text as plan_type,
    COALESCE(ap.status, 'inactive')::text as plan_status,
    -- SYNC with get_user_rankings: chapters_read + quiz_points + devotional_points
    (
      COALESCE((SELECT COUNT(*) FROM reading_schedule rs WHERE rs.user_id = u.id AND rs.is_completed = true), 0) +
      COALESCE((SELECT SUM(qa.points_earned) FROM quiz_attempts qa WHERE qa.user_id = u.id), 0) +
      COALESCE((SELECT COUNT(*) FROM devotional_completions dc WHERE dc.user_id = u.id), 0)
    )::bigint as total_points,
    -- active_days = distinct login dates
    COALESCE((SELECT COUNT(DISTINCT dl.login_date) FROM daily_logins dl WHERE dl.user_id = u.id), 0)::bigint as active_days,
    ap.phone::text,
    ap.cpf::text
  FROM auth.users u
  LEFT JOIN profiles p ON p.user_id = u.id
  LEFT JOIN authorized_purchases ap ON ap.user_id = u.id
  ORDER BY u.created_at DESC;
END;
$$;