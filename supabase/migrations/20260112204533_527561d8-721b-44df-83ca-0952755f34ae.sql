-- First, update existing authorized_purchases to link user_id where missing
UPDATE public.authorized_purchases ap
SET user_id = u.id
FROM auth.users u
WHERE lower(ap.email) = lower(u.email)
AND ap.user_id IS NULL;

-- Update admin_get_all_users to use email-based join as fallback
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
  cpf text,
  whatsapp_number text,
  inactive_days integer
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
  -- Join by user_id first, then fallback to email match
  LEFT JOIN authorized_purchases ap ON (ap.user_id = u.id OR lower(ap.email) = lower(u.email))
  ORDER BY u.created_at DESC;
END;
$$;

-- Also update admin_update_user_plan to link user_id when updating
CREATE OR REPLACE FUNCTION public.admin_update_user_plan(target_email text, new_plan_type text, new_status text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_user_id uuid;
BEGIN
  -- Only allow admins
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;

  -- Get the user_id from auth.users if exists
  SELECT id INTO target_user_id 
  FROM auth.users 
  WHERE lower(email) = lower(trim(target_email));

  -- Update or insert authorized_purchase with user_id linkage
  INSERT INTO authorized_purchases (email, plan_type, status, user_id, updated_at)
  VALUES (lower(trim(target_email)), new_plan_type, new_status, target_user_id, now())
  ON CONFLICT (email) 
  DO UPDATE SET 
    plan_type = new_plan_type, 
    status = new_status, 
    user_id = COALESCE(authorized_purchases.user_id, target_user_id),
    updated_at = now();

  RETURN true;
END;
$$;