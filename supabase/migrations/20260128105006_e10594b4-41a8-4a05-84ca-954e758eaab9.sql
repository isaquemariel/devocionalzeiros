
-- Fix admin_get_metrics to count ALL start users (including those without authorized_purchases record)
CREATE OR REPLACE FUNCTION public.admin_get_metrics()
 RETURNS TABLE(total_users bigint, active_users bigint, start_plans bigint, gold_plans bigint, premium_plans bigint, total_logins_today bigint, total_logins_week bigint, avg_daily_logins numeric, total_chapters_read bigint, total_quiz_attempts bigint, total_devotionals_completed bigint, gratuito_users bigint, embaixador_plans bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  brasilia_today DATE;
  active_registered_users bigint;
  paying_users_count bigint;
  gold_count bigint;
  premium_count bigint;
  embaixador_count bigint;
  start_count bigint;
BEGIN
  brasilia_today := (now() AT TIME ZONE 'America/Sao_Paulo')::date;
  
  -- Count only ACTIVE registered users (exclude inactive/deactivated users)
  SELECT COUNT(*) INTO active_registered_users 
  FROM auth.users u
  LEFT JOIN authorized_purchases ap ON (ap.user_id = u.id OR lower(ap.email) = lower(u.email))
  WHERE ap.status IS NULL OR ap.status = 'active';
  
  -- Count GOLD users
  SELECT COUNT(DISTINCT u.id) INTO gold_count
  FROM auth.users u
  JOIN authorized_purchases ap ON (ap.user_id = u.id OR lower(ap.email) = lower(u.email))
  WHERE ap.plan_type = 'gold' AND ap.status = 'active';
  
  -- Count PREMIUM users
  SELECT COUNT(DISTINCT u.id) INTO premium_count
  FROM auth.users u
  JOIN authorized_purchases ap ON (ap.user_id = u.id OR lower(ap.email) = lower(u.email))
  WHERE ap.plan_type = 'premium' AND ap.status = 'active';
  
  -- Count EMBAIXADOR users
  SELECT COUNT(DISTINCT u.id) INTO embaixador_count
  FROM auth.users u
  JOIN authorized_purchases ap ON (ap.user_id = u.id OR lower(ap.email) = lower(u.email))
  WHERE ap.plan_type = 'embaixador' AND ap.status = 'active';
  
  -- Count paying users (gold + premium, excluding embaixador)
  paying_users_count := gold_count + premium_count;
  
  -- START = Total active users - paid users (gold, premium, embaixador)
  -- This includes users with no authorized_purchases record AND users with start plan
  start_count := active_registered_users - gold_count - premium_count - embaixador_count;
  
  RETURN QUERY SELECT
    active_registered_users as total_users,
    paying_users_count as active_users,
    start_count as start_plans,
    gold_count as gold_plans,
    premium_count as premium_plans,
    (SELECT COUNT(*) FROM daily_logins WHERE login_date = brasilia_today)::bigint as total_logins_today,
    (SELECT COUNT(*) FROM daily_logins WHERE login_date >= brasilia_today - INTERVAL '7 days')::bigint as total_logins_week,
    COALESCE((SELECT COUNT(*)::numeric / NULLIF(COUNT(DISTINCT login_date), 0) FROM daily_logins WHERE login_date >= brasilia_today - INTERVAL '30 days'), 0) as avg_daily_logins,
    (SELECT COUNT(*) FROM reading_schedule WHERE is_completed = true)::bigint as total_chapters_read,
    (SELECT COUNT(*) FROM quiz_attempts)::bigint as total_quiz_attempts,
    (SELECT COUNT(*) FROM devotional_completions)::bigint as total_devotionals_completed,
    -- Gratuito = start users (same as start_count)
    start_count as gratuito_users,
    embaixador_count as embaixador_plans;
END;
$function$;
