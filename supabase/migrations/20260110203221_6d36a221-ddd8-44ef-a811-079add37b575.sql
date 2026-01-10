-- Drop and recreate admin_get_all_users with inactive_days column
DROP FUNCTION IF EXISTS public.admin_get_all_users();

CREATE OR REPLACE FUNCTION public.admin_get_all_users()
 RETURNS TABLE(user_id uuid, email text, full_name text, avatar_url text, created_at timestamp with time zone, last_sign_in_at timestamp with time zone, plan_type text, plan_status text, total_points bigint, active_days bigint, phone text, cpf text, whatsapp_number text, inactive_days integer)
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
    COALESCE(ap.phone, p.whatsapp_number)::text as phone,
    ap.cpf::text,
    p.whatsapp_number::text,
    -- Calculate inactive days: days since last login
    COALESCE(
      (brasilia_today - (SELECT MAX(dl.login_date) FROM daily_logins dl WHERE dl.user_id = u.id)),
      -- If never logged in, calculate from account creation
      (brasilia_today - (u.created_at AT TIME ZONE 'America/Sao_Paulo')::date)
    )::integer as inactive_days
  FROM auth.users u
  LEFT JOIN profiles p ON p.user_id = u.id
  LEFT JOIN authorized_purchases ap ON ap.user_id = u.id
  ORDER BY u.created_at DESC;
END;
$function$;

-- Create function to automatically deactivate users inactive for 30+ days
CREATE OR REPLACE FUNCTION public.admin_deactivate_inactive_users()
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  brasilia_today DATE;
  deactivated_count integer := 0;
BEGIN
  brasilia_today := (now() AT TIME ZONE 'America/Sao_Paulo')::date;

  -- Deactivate users who haven't logged in for 30+ days
  WITH inactive_users AS (
    SELECT u.id as user_id
    FROM auth.users u
    LEFT JOIN authorized_purchases ap ON ap.user_id = u.id
    WHERE ap.status = 'active'
      AND (
        -- Check last login from daily_logins
        (SELECT MAX(dl.login_date) FROM daily_logins dl WHERE dl.user_id = u.id) < brasilia_today - INTERVAL '30 days'
        OR (
          -- If never logged in, check account creation date
          NOT EXISTS (SELECT 1 FROM daily_logins dl WHERE dl.user_id = u.id)
          AND (u.created_at AT TIME ZONE 'America/Sao_Paulo')::date < brasilia_today - INTERVAL '30 days'
        )
      )
  )
  UPDATE authorized_purchases ap
  SET status = 'inactive', updated_at = now()
  FROM inactive_users iu
  WHERE ap.user_id = iu.user_id
    AND ap.status = 'active';

  GET DIAGNOSTICS deactivated_count = ROW_COUNT;
  
  RETURN deactivated_count;
END;
$function$;

-- Create a scheduled job trigger function that can be called via cron
CREATE OR REPLACE FUNCTION public.run_daily_deactivation()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  count integer;
BEGIN
  SELECT public.admin_deactivate_inactive_users() INTO count;
  
  -- Log the deactivation (optional - for monitoring)
  IF count > 0 THEN
    RAISE NOTICE 'Deactivated % inactive users', count;
  END IF;
END;
$function$;