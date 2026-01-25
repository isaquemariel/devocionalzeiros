-- Update admin metrics to only count ACTIVE users
-- Inactive users (deactivated after 30 days or manually) are excluded from all counts

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
BEGIN
  brasilia_today := (now() AT TIME ZONE 'America/Sao_Paulo')::date;
  
  -- Count only ACTIVE registered users (exclude inactive/deactivated users)
  SELECT COUNT(*) INTO active_registered_users 
  FROM auth.users u
  LEFT JOIN authorized_purchases ap ON (ap.user_id = u.id OR lower(ap.email) = lower(u.email))
  WHERE ap.status IS NULL OR ap.status = 'active';
  
  -- Count paying users (active paid plans, excluding embaixador)
  SELECT COUNT(DISTINCT u.id) INTO paying_users_count 
  FROM auth.users u
  JOIN authorized_purchases ap ON (ap.user_id = u.id OR lower(ap.email) = lower(u.email))
  WHERE ap.status = 'active' 
    AND ap.plan_type IN ('gold', 'premium');
  
  RETURN QUERY SELECT
    active_registered_users as total_users,
    paying_users_count as active_users,
    (SELECT COUNT(DISTINCT u.id) FROM auth.users u 
     JOIN authorized_purchases ap ON (ap.user_id = u.id OR lower(ap.email) = lower(u.email))
     WHERE ap.plan_type = 'start' AND ap.status = 'active')::bigint as start_plans,
    (SELECT COUNT(DISTINCT u.id) FROM auth.users u 
     JOIN authorized_purchases ap ON (ap.user_id = u.id OR lower(ap.email) = lower(u.email))
     WHERE ap.plan_type = 'gold' AND ap.status = 'active')::bigint as gold_plans,
    (SELECT COUNT(DISTINCT u.id) FROM auth.users u 
     JOIN authorized_purchases ap ON (ap.user_id = u.id OR lower(ap.email) = lower(u.email))
     WHERE ap.plan_type = 'premium' AND ap.status = 'active')::bigint as premium_plans,
    (SELECT COUNT(*) FROM daily_logins WHERE login_date = brasilia_today)::bigint as total_logins_today,
    (SELECT COUNT(*) FROM daily_logins WHERE login_date >= brasilia_today - INTERVAL '7 days')::bigint as total_logins_week,
    COALESCE((SELECT COUNT(*)::numeric / NULLIF(COUNT(DISTINCT login_date), 0) FROM daily_logins WHERE login_date >= brasilia_today - INTERVAL '30 days'), 0) as avg_daily_logins,
    (SELECT COUNT(*) FROM reading_schedule WHERE is_completed = true)::bigint as total_chapters_read,
    (SELECT COUNT(*) FROM quiz_attempts)::bigint as total_quiz_attempts,
    (SELECT COUNT(*) FROM devotional_completions)::bigint as total_devotionals_completed,
    -- Gratuito = active users without paid plans (start or no plan record)
    (active_registered_users - paying_users_count)::bigint as gratuito_users,
    -- Embaixador count (active only)
    (SELECT COUNT(DISTINCT u.id) FROM auth.users u 
     JOIN authorized_purchases ap ON (ap.user_id = u.id OR lower(ap.email) = lower(u.email))
     WHERE ap.plan_type = 'embaixador' AND ap.status = 'active')::bigint as embaixador_plans;
END;
$function$;