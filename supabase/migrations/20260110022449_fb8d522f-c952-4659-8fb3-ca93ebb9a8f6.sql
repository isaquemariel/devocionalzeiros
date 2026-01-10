-- Drop and recreate admin_get_all_users with whatsapp_number
DROP FUNCTION IF EXISTS public.admin_get_all_users();

CREATE FUNCTION public.admin_get_all_users()
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
  cpf text,
  whatsapp_number text
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
    u.id as user_id,
    u.email::text,
    COALESCE(p.full_name, u.raw_user_meta_data->>'full_name', 'Sem nome')::text as full_name,
    p.avatar_url::text,
    u.created_at,
    u.last_sign_in_at,
    COALESCE(ap.plan_type, 'gratuito')::text as plan_type,
    COALESCE(ap.status, 'active')::text as plan_status,
    (
      COALESCE((SELECT COUNT(*) FROM reading_schedule rs WHERE rs.user_id = u.id AND rs.is_completed = true), 0) +
      COALESCE((SELECT SUM(qa.points_earned) FROM quiz_attempts qa WHERE qa.user_id = u.id), 0) +
      COALESCE((SELECT COUNT(*) FROM devotional_completions dc WHERE dc.user_id = u.id), 0)
    )::bigint as total_points,
    COALESCE((SELECT COUNT(DISTINCT dl.login_date) FROM daily_logins dl WHERE dl.user_id = u.id), 0)::bigint as active_days,
    COALESCE(ap.phone, p.whatsapp_number)::text as phone,
    ap.cpf::text,
    p.whatsapp_number::text
  FROM auth.users u
  LEFT JOIN profiles p ON p.user_id = u.id
  LEFT JOIN authorized_purchases ap ON ap.user_id = u.id
  ORDER BY u.created_at DESC;
END;
$$;

-- Drop and recreate admin_get_metrics with gratuito_users
DROP FUNCTION IF EXISTS public.admin_get_metrics();

CREATE FUNCTION public.admin_get_metrics()
RETURNS TABLE(
  total_users bigint, 
  active_users bigint, 
  start_plans bigint, 
  gold_plans bigint, 
  premium_plans bigint, 
  total_logins_today bigint, 
  total_logins_week bigint, 
  avg_daily_logins numeric, 
  total_chapters_read bigint, 
  total_quiz_attempts bigint, 
  total_devotionals_completed bigint,
  gratuito_users bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  brasilia_today DATE;
BEGIN
  brasilia_today := (now() AT TIME ZONE 'America/Sao_Paulo')::date;
  
  RETURN QUERY SELECT
    (SELECT COUNT(*) FROM auth.users)::bigint as total_users,
    (SELECT COUNT(*) FROM authorized_purchases WHERE status = 'active')::bigint as active_users,
    (SELECT COUNT(*) FROM authorized_purchases WHERE plan_type = 'start' AND status = 'active')::bigint as start_plans,
    (SELECT COUNT(*) FROM authorized_purchases WHERE plan_type = 'gold' AND status = 'active')::bigint as gold_plans,
    (SELECT COUNT(*) FROM authorized_purchases WHERE plan_type = 'premium' AND status = 'active')::bigint as premium_plans,
    (SELECT COUNT(*) FROM daily_logins WHERE login_date = brasilia_today)::bigint as total_logins_today,
    (SELECT COUNT(*) FROM daily_logins WHERE login_date >= brasilia_today - INTERVAL '7 days')::bigint as total_logins_week,
    COALESCE((SELECT COUNT(*)::numeric / NULLIF(COUNT(DISTINCT login_date), 0) FROM daily_logins WHERE login_date >= brasilia_today - INTERVAL '30 days'), 0) as avg_daily_logins,
    (SELECT COUNT(*) FROM reading_schedule WHERE is_completed = true)::bigint as total_chapters_read,
    (SELECT COUNT(*) FROM quiz_attempts)::bigint as total_quiz_attempts,
    (SELECT COUNT(*) FROM devotional_completions)::bigint as total_devotionals_completed,
    ((SELECT COUNT(*) FROM auth.users) - (SELECT COUNT(DISTINCT user_id) FROM authorized_purchases WHERE status = 'active'))::bigint as gratuito_users;
END;
$$;