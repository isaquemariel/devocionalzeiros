-- Fix admin_get_metrics to count embaixador as gratuito
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
  total_devotionals_completed bigint,
  gratuito_users bigint,
  embaixador_plans bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  brasilia_today DATE;
  registered_users_count bigint;
  paying_users_count bigint;
BEGIN
  brasilia_today := (now() AT TIME ZONE 'America/Sao_Paulo')::date;
  
  -- Count only users who actually registered (have auth.users entry)
  SELECT COUNT(*) INTO registered_users_count FROM auth.users;
  
  -- Count paying users (those with active paid plans who registered, excluding embaixador)
  SELECT COUNT(DISTINCT ap.user_id) INTO paying_users_count 
  FROM authorized_purchases ap
  WHERE ap.status = 'active' 
    AND ap.user_id IS NOT NULL
    AND ap.plan_type IN ('start', 'gold', 'premium');
  
  RETURN QUERY SELECT
    registered_users_count as total_users,
    paying_users_count as active_users,
    (SELECT COUNT(*) FROM authorized_purchases WHERE plan_type = 'start' AND status = 'active' AND user_id IS NOT NULL)::bigint as start_plans,
    (SELECT COUNT(*) FROM authorized_purchases WHERE plan_type = 'gold' AND status = 'active' AND user_id IS NOT NULL)::bigint as gold_plans,
    (SELECT COUNT(*) FROM authorized_purchases WHERE plan_type = 'premium' AND status = 'active' AND user_id IS NOT NULL)::bigint as premium_plans,
    (SELECT COUNT(*) FROM daily_logins WHERE login_date = brasilia_today)::bigint as total_logins_today,
    (SELECT COUNT(*) FROM daily_logins WHERE login_date >= brasilia_today - INTERVAL '7 days')::bigint as total_logins_week,
    COALESCE((SELECT COUNT(*)::numeric / NULLIF(COUNT(DISTINCT login_date), 0) FROM daily_logins WHERE login_date >= brasilia_today - INTERVAL '30 days'), 0) as avg_daily_logins,
    (SELECT COUNT(*) FROM reading_schedule WHERE is_completed = true)::bigint as total_chapters_read,
    (SELECT COUNT(*) FROM quiz_attempts)::bigint as total_quiz_attempts,
    (SELECT COUNT(*) FROM devotional_completions)::bigint as total_devotionals_completed,
    -- Gratuito users = registered users minus paying users (embaixador counts as gratuito)
    (registered_users_count - paying_users_count)::bigint as gratuito_users,
    -- Embaixador count kept for reference but they are included in gratuito
    (SELECT COUNT(DISTINCT ap.user_id) FROM authorized_purchases ap WHERE ap.status = 'active' AND ap.user_id IS NOT NULL AND ap.plan_type = 'embaixador')::bigint as embaixador_plans;
END;
$function$;