-- Recreate admin_get_all_users function with correct JOINs
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
    COALESCE(p.full_name, u.raw_user_meta_data->>'full_name', 'Sem nome')::text as full_name,
    p.avatar_url::text,
    u.created_at,
    u.last_sign_in_at,
    COALESCE(ap.plan_type, 'start')::text as plan_type,
    COALESCE(ap.status, 'inactive')::text as plan_status,
    COALESCE(
      (SELECT SUM(
        CASE 
          WHEN qa.is_correct THEN qa.points_earned 
          ELSE 0 
        END
      ) FROM quiz_attempts qa WHERE qa.user_id = u.id), 0
    ) + 
    COALESCE(
      (SELECT COUNT(*) * 10 FROM devotional_completions dc WHERE dc.user_id = u.id), 0
    ) + 
    COALESCE(
      (SELECT COUNT(*) * 5 FROM reading_progress rp WHERE rp.user_id = u.id), 0
    ) as total_points,
    COALESCE(
      (SELECT COUNT(DISTINCT dl.login_date) FROM daily_logins dl WHERE dl.user_id = u.id), 0
    ) as active_days,
    ap.phone::text,
    ap.cpf::text
  FROM auth.users u
  LEFT JOIN profiles p ON p.user_id = u.id
  LEFT JOIN authorized_purchases ap ON ap.user_id = u.id
  ORDER BY u.created_at DESC;
END;
$$;