-- Update the auto-deactivation function to only affect FREE (start/gratuito) users
-- Paid users (gold, premium, embaixador) are only deactivated via webhook (refund/cancellation)

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

  -- Only deactivate FREE users (start/gratuito) who haven't logged in for 30+ days
  -- Paid users (gold, premium, embaixador) are NEVER auto-deactivated - only via webhook
  WITH inactive_free_users AS (
    SELECT u.id as user_id
    FROM auth.users u
    LEFT JOIN authorized_purchases ap ON (ap.user_id = u.id OR lower(ap.email) = lower(u.email))
    WHERE (ap.status = 'active' OR ap.status IS NULL)
      -- Only target FREE users (start, gratuito, or no plan record)
      AND (ap.plan_type IS NULL OR ap.plan_type IN ('start', 'gratuito'))
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
  FROM inactive_free_users ifu
  WHERE (ap.user_id = ifu.user_id OR lower(ap.email) = lower((SELECT email FROM auth.users WHERE id = ifu.user_id)))
    AND ap.status = 'active'
    -- Double-check: only deactivate start/gratuito plans
    AND ap.plan_type IN ('start', 'gratuito');

  GET DIAGNOSTICS deactivated_count = ROW_COUNT;
  
  RETURN deactivated_count;
END;
$function$;