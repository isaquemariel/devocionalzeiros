-- Update admin_get_metrics to properly count FREE users separately from paid START users
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
  free_count bigint;
BEGIN
  brasilia_today := (now() AT TIME ZONE 'America/Sao_Paulo')::date;
  
  -- Count only ACTIVE registered users (exclude inactive/deactivated users)
  SELECT COUNT(*) INTO active_registered_users 
  FROM auth.users u
  LEFT JOIN authorized_purchases ap ON (ap.user_id = u.id OR lower(ap.email) = lower(u.email))
  WHERE ap.status IS NULL OR ap.status = 'active';
  
  -- Count PAID START users (those with explicit 'start' plan type who paid)
  SELECT COUNT(DISTINCT u.id) INTO start_count
  FROM auth.users u
  JOIN authorized_purchases ap ON (ap.user_id = u.id OR lower(ap.email) = lower(u.email))
  WHERE ap.plan_type = 'start' AND ap.status = 'active' AND COALESCE(ap.amount_paid, 0) > 0;
  
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
  
  -- Count paying users (start + gold + premium, excluding embaixador)
  paying_users_count := start_count + gold_count + premium_count;
  
  -- FREE users = Total active users - all paid users (start, gold, premium, embaixador)
  -- This includes users with no authorized_purchases record OR those with 'free'/'gratuito' plan OR start without payment
  free_count := active_registered_users - start_count - gold_count - premium_count - embaixador_count;
  
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
    free_count as gratuito_users,
    embaixador_count as embaixador_plans;
END;
$function$;

-- Update admin_get_all_users to return 'free' for users without a paid plan
CREATE OR REPLACE FUNCTION public.admin_get_all_users()
 RETURNS TABLE(user_id uuid, email text, full_name text, avatar_url text, created_at timestamp with time zone, last_sign_in_at timestamp with time zone, plan_type text, plan_status text, total_points bigint, active_days bigint, phone text, cpf text, whatsapp_phone text, inactive_days integer, referral_source text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  brasilia_today DATE;
BEGIN
  -- Only allow admins
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;

  brasilia_today := (now() AT TIME ZONE 'America/Sao_Paulo')::date;

  RETURN QUERY
  SELECT 
    u.id as user_id,
    u.email::text,
    COALESCE(p.full_name, u.raw_user_meta_data->>'full_name', 'Sem nome')::text as full_name,
    p.avatar_url::text,
    u.created_at,
    u.last_sign_in_at,
    CASE 
      -- User has no purchase record = FREE
      WHEN ap.plan_type IS NULL THEN 'free'
      -- User has 'gratuito' or 'free' = FREE
      WHEN ap.plan_type IN ('gratuito', 'free') THEN 'free'
      -- User has 'start' but no payment = FREE
      WHEN ap.plan_type = 'start' AND COALESCE(ap.amount_paid, 0) = 0 THEN 'free'
      -- Otherwise use the actual plan type
      ELSE ap.plan_type
    END::text as plan_type,
    COALESCE(ap.status, 'active')::text as plan_status,
    (
      COALESCE((SELECT COUNT(*) FROM reading_schedule rs WHERE rs.user_id = u.id AND rs.is_completed = true), 0) +
      COALESCE((SELECT SUM(qa.points_earned) FROM quiz_attempts qa WHERE qa.user_id = u.id), 0) +
      COALESCE((SELECT COUNT(*) FROM devotional_completions dc WHERE dc.user_id = u.id), 0)
    )::bigint as total_points,
    COALESCE((SELECT COUNT(DISTINCT dl.login_date) FROM daily_logins dl WHERE dl.user_id = u.id), 0)::bigint as active_days,
    COALESCE(ap.phone, p.whatsapp_phone)::text as phone,
    ap.cpf::text,
    p.whatsapp_phone::text,
    COALESCE(
      (brasilia_today - (SELECT MAX(dl.login_date) FROM daily_logins dl WHERE dl.user_id = u.id)),
      (brasilia_today - (u.created_at AT TIME ZONE 'America/Sao_Paulo')::date)
    )::integer as inactive_days,
    p.referral_source::text
  FROM auth.users u
  LEFT JOIN profiles p ON p.user_id = u.id
  LEFT JOIN authorized_purchases ap ON (ap.user_id = u.id OR lower(ap.email) = lower(u.email))
  ORDER BY u.created_at DESC;
END;
$function$;