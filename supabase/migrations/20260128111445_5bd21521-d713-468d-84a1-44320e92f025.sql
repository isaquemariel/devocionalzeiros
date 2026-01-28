-- Drop and recreate admin_get_all_users with whatsapp_phone instead of whatsapp_number
DROP FUNCTION IF EXISTS public.admin_get_all_users();

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
      WHEN ap.plan_type = 'gratuito' THEN 'start'
      ELSE COALESCE(ap.plan_type, 'start')
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