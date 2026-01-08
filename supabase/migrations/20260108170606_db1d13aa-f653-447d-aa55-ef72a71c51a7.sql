-- Create enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy: users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- RLS policy: only admins can manage roles
CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

-- Admin function to get all users with their data (security definer)
CREATE OR REPLACE FUNCTION public.admin_get_all_users()
RETURNS TABLE (
  user_id uuid,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz,
  last_sign_in_at timestamptz,
  plan_type text,
  plan_status text,
  total_points bigint,
  active_days bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow admins
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;

  RETURN QUERY
  SELECT 
    au.id as user_id,
    au.email::text,
    p.full_name,
    p.avatar_url,
    au.created_at,
    au.last_sign_in_at,
    COALESCE(ap.plan_type, 'none')::text as plan_type,
    COALESCE(ap.status, 'inactive')::text as plan_status,
    COALESCE((
      SELECT COUNT(DISTINCT rs.id) + COALESCE(SUM(qa.points_earned), 0) + COALESCE((SELECT COUNT(*) FROM devotional_completions dc WHERE dc.user_id = au.id), 0)
      FROM reading_schedule rs
      LEFT JOIN quiz_attempts qa ON qa.user_id = au.id
      WHERE rs.user_id = au.id AND rs.is_completed = true
    ), 0)::bigint as total_points,
    COALESCE((SELECT COUNT(DISTINCT login_date) FROM daily_logins dl WHERE dl.user_id = au.id), 0)::bigint as active_days
  FROM auth.users au
  LEFT JOIN profiles p ON p.user_id = au.id
  LEFT JOIN authorized_purchases ap ON ap.user_id = au.id OR ap.email = au.email
  ORDER BY au.created_at DESC;
END;
$$;

-- Admin function to update user plan
CREATE OR REPLACE FUNCTION public.admin_update_user_plan(
  target_email text,
  new_plan_type text,
  new_status text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow admins
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;

  -- Update or insert authorized_purchase
  INSERT INTO authorized_purchases (email, plan_type, status, updated_at)
  VALUES (lower(trim(target_email)), new_plan_type, new_status, now())
  ON CONFLICT (email) 
  DO UPDATE SET plan_type = new_plan_type, status = new_status, updated_at = now();

  RETURN true;
END;
$$;

-- Admin function to add authorized email
CREATE OR REPLACE FUNCTION public.admin_add_authorized_email(
  target_email text,
  plan text DEFAULT 'start'
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow admins
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;

  INSERT INTO authorized_purchases (email, plan_type, status)
  VALUES (lower(trim(target_email)), plan, 'active')
  ON CONFLICT (email) DO NOTHING;

  RETURN true;
END;
$$;

-- Admin function to get platform metrics
CREATE OR REPLACE FUNCTION public.admin_get_metrics()
RETURNS TABLE (
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
BEGIN
  -- Only allow admins
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;

  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM auth.users)::bigint as total_users,
    (SELECT COUNT(*) FROM authorized_purchases WHERE status = 'active')::bigint as active_users,
    (SELECT COUNT(*) FROM authorized_purchases WHERE plan_type = 'start' AND status = 'active')::bigint as start_plans,
    (SELECT COUNT(*) FROM authorized_purchases WHERE plan_type = 'gold' AND status = 'active')::bigint as gold_plans,
    (SELECT COUNT(*) FROM authorized_purchases WHERE plan_type = 'premium' AND status = 'active')::bigint as premium_plans,
    (SELECT COUNT(*) FROM daily_logins WHERE login_date = CURRENT_DATE)::bigint as total_logins_today,
    (SELECT COUNT(*) FROM daily_logins WHERE login_date >= CURRENT_DATE - INTERVAL '7 days')::bigint as total_logins_week,
    COALESCE((SELECT COUNT(*)::numeric / NULLIF(COUNT(DISTINCT login_date), 0) FROM daily_logins WHERE login_date >= CURRENT_DATE - INTERVAL '30 days'), 0) as avg_daily_logins,
    (SELECT COUNT(*) FROM reading_schedule WHERE is_completed = true)::bigint as total_chapters_read,
    (SELECT COUNT(*) FROM quiz_attempts)::bigint as total_quiz_attempts,
    (SELECT COUNT(*) FROM devotional_completions)::bigint as total_devotionals_completed;
END;
$$;

-- Admin function to get login history for chart
CREATE OR REPLACE FUNCTION public.admin_get_login_history(days_back integer DEFAULT 30)
RETURNS TABLE (
  login_date date,
  login_count bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow admins
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;

  RETURN QUERY
  SELECT 
    dl.login_date,
    COUNT(*)::bigint as login_count
  FROM daily_logins dl
  WHERE dl.login_date >= CURRENT_DATE - (days_back || ' days')::interval
  GROUP BY dl.login_date
  ORDER BY dl.login_date;
END;
$$;

-- Add unique constraint on email for authorized_purchases if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'authorized_purchases_email_key'
  ) THEN
    ALTER TABLE authorized_purchases ADD CONSTRAINT authorized_purchases_email_key UNIQUE (email);
  END IF;
END $$;