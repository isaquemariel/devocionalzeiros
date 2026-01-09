-- Fix all admin functions to use Brasília timezone instead of UTC
-- Also add phone and cpf columns to authorized_purchases

-- Add phone and cpf columns to authorized_purchases
ALTER TABLE public.authorized_purchases 
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS cpf TEXT;

-- Drop and recreate admin_get_metrics with Brasília timezone
DROP FUNCTION IF EXISTS public.admin_get_metrics();
CREATE OR REPLACE FUNCTION public.admin_get_metrics()
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
  total_devotionals_completed bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  brasilia_today DATE;
BEGIN
  -- Get current date in Brasília timezone
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
    (SELECT COUNT(*) FROM devotional_completions)::bigint as total_devotionals_completed;
END;
$$;

-- Drop and recreate admin_save_metrics_snapshot with Brasília timezone
DROP FUNCTION IF EXISTS public.admin_save_metrics_snapshot();
CREATE OR REPLACE FUNCTION public.admin_save_metrics_snapshot()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  brasilia_today DATE;
BEGIN
  -- Get current date in Brasília timezone
  brasilia_today := (now() AT TIME ZONE 'America/Sao_Paulo')::date;
  
  INSERT INTO admin_metrics_backup (
    snapshot_date,
    total_users,
    active_users,
    start_plans,
    gold_plans,
    premium_plans,
    total_logins_today,
    total_chapters_read,
    total_quiz_attempts,
    total_devotionals_completed
  )
  SELECT 
    brasilia_today,
    (SELECT COUNT(*) FROM auth.users)::bigint,
    (SELECT COUNT(*) FROM authorized_purchases WHERE status = 'active')::bigint,
    (SELECT COUNT(*) FROM authorized_purchases WHERE plan_type = 'start' AND status = 'active')::bigint,
    (SELECT COUNT(*) FROM authorized_purchases WHERE plan_type = 'gold' AND status = 'active')::bigint,
    (SELECT COUNT(*) FROM authorized_purchases WHERE plan_type = 'premium' AND status = 'active')::bigint,
    (SELECT COUNT(*) FROM daily_logins WHERE login_date = brasilia_today)::bigint,
    (SELECT COUNT(*) FROM reading_schedule WHERE is_completed = true)::bigint,
    (SELECT COUNT(*) FROM quiz_attempts)::bigint,
    (SELECT COUNT(*) FROM devotional_completions)::bigint
  ON CONFLICT (snapshot_date) DO UPDATE SET
    total_users = EXCLUDED.total_users,
    active_users = EXCLUDED.active_users,
    start_plans = EXCLUDED.start_plans,
    gold_plans = EXCLUDED.gold_plans,
    premium_plans = EXCLUDED.premium_plans,
    total_logins_today = EXCLUDED.total_logins_today,
    total_chapters_read = EXCLUDED.total_chapters_read,
    total_quiz_attempts = EXCLUDED.total_quiz_attempts,
    total_devotionals_completed = EXCLUDED.total_devotionals_completed,
    updated_at = now();
END;
$$;

-- Drop and recreate admin_get_login_history with Brasília timezone
DROP FUNCTION IF EXISTS public.admin_get_login_history(integer);
CREATE OR REPLACE FUNCTION public.admin_get_login_history(days_back integer DEFAULT 30)
RETURNS TABLE(login_date date, login_count bigint)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  brasilia_today DATE;
BEGIN
  brasilia_today := (now() AT TIME ZONE 'America/Sao_Paulo')::date;
  
  RETURN QUERY
  SELECT dl.login_date, COUNT(*)::bigint as login_count
  FROM daily_logins dl
  WHERE dl.login_date >= brasilia_today - (days_back || ' days')::interval
  GROUP BY dl.login_date
  ORDER BY dl.login_date DESC;
END;
$$;

-- Drop and recreate admin_get_metrics_history with Brasília timezone
DROP FUNCTION IF EXISTS public.admin_get_metrics_history(integer);
CREATE OR REPLACE FUNCTION public.admin_get_metrics_history(days_back integer DEFAULT 30)
RETURNS TABLE(
  snapshot_date date,
  total_users bigint,
  active_users bigint,
  total_chapters_read bigint,
  total_quiz_attempts bigint,
  total_devotionals_completed bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  brasilia_today DATE;
BEGIN
  brasilia_today := (now() AT TIME ZONE 'America/Sao_Paulo')::date;
  
  RETURN QUERY
  SELECT 
    amb.snapshot_date,
    amb.total_users,
    amb.active_users,
    amb.total_chapters_read,
    amb.total_quiz_attempts,
    amb.total_devotionals_completed
  FROM admin_metrics_backup amb
  WHERE amb.snapshot_date >= brasilia_today - (days_back || ' days')::interval
  ORDER BY amb.snapshot_date DESC;
END;
$$;

-- Drop and recreate admin_get_revenue_history with Brasília timezone
DROP FUNCTION IF EXISTS public.admin_get_revenue_history(integer);
CREATE OR REPLACE FUNCTION public.admin_get_revenue_history(days_back integer DEFAULT 30)
RETURNS TABLE(sale_date date, daily_revenue numeric, sale_count bigint)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  brasilia_today DATE;
BEGIN
  brasilia_today := (now() AT TIME ZONE 'America/Sao_Paulo')::date;
  
  RETURN QUERY
  WITH all_sales AS (
    SELECT 
      ((ap.purchased_at AT TIME ZONE 'America/Sao_Paulo')::date) as sale_date,
      ap.amount_paid as amount
    FROM authorized_purchases ap
    WHERE ap.amount_paid > 0
      AND ((ap.purchased_at AT TIME ZONE 'America/Sao_Paulo')::date) >= brasilia_today - (days_back || ' days')::interval
    UNION ALL
    SELECT 
      ms.sale_date,
      ms.amount
    FROM manual_sales ms
    WHERE ms.sale_date >= brasilia_today - (days_back || ' days')::interval
  )
  SELECT 
    all_sales.sale_date,
    COALESCE(SUM(all_sales.amount), 0)::numeric as daily_revenue,
    COUNT(*)::bigint as sale_count
  FROM all_sales
  GROUP BY all_sales.sale_date
  ORDER BY all_sales.sale_date DESC;
END;
$$;

-- Update admin_get_all_users to include phone and cpf
DROP FUNCTION IF EXISTS public.admin_get_all_users();
CREATE OR REPLACE FUNCTION public.admin_get_all_users()
RETURNS TABLE(
  user_id uuid,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz,
  last_sign_in_at timestamptz,
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
    p.full_name::text,
    p.avatar_url::text,
    u.created_at,
    u.last_sign_in_at,
    COALESCE(ap.plan_type, 'none')::text as plan_type,
    COALESCE(ap.status, 'inactive')::text as plan_status,
    COALESCE(
      (
        SELECT 
          (COALESCE(SUM(CASE WHEN qa.is_correct THEN 10 ELSE 2 END), 0) +
           (SELECT COUNT(*) * 5 FROM reading_schedule rs WHERE rs.user_id = u.id AND rs.is_completed = true) +
           (SELECT COUNT(*) * 3 FROM daily_logins dl WHERE dl.user_id = u.id) +
           (SELECT COUNT(*) * 5 FROM devotional_completions dc WHERE dc.user_id = u.id))
        FROM quiz_attempts qa 
        WHERE qa.user_id = u.id
      ),
      (
        (SELECT COUNT(*) * 5 FROM reading_schedule rs WHERE rs.user_id = u.id AND rs.is_completed = true) +
        (SELECT COUNT(*) * 3 FROM daily_logins dl WHERE dl.user_id = u.id) +
        (SELECT COUNT(*) * 5 FROM devotional_completions dc WHERE dc.user_id = u.id)
      )
    )::bigint as total_points,
    (SELECT COUNT(*) FROM reading_schedule rs WHERE rs.user_id = u.id AND rs.is_completed = true)::bigint as active_days,
    ap.phone::text,
    ap.cpf::text
  FROM auth.users u
  LEFT JOIN profiles p ON p.id = u.id
  LEFT JOIN authorized_purchases ap ON LOWER(ap.email) = LOWER(u.email)
  ORDER BY u.created_at DESC;
END;
$$;