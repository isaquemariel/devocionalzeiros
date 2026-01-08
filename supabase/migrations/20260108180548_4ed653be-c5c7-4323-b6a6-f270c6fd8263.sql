-- Create table to store daily metrics snapshots (backup of growing numbers)
CREATE TABLE public.admin_metrics_backup (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  snapshot_date date NOT NULL DEFAULT CURRENT_DATE,
  total_users bigint NOT NULL DEFAULT 0,
  active_users bigint NOT NULL DEFAULT 0,
  start_plans bigint NOT NULL DEFAULT 0,
  gold_plans bigint NOT NULL DEFAULT 0,
  premium_plans bigint NOT NULL DEFAULT 0,
  total_logins_today bigint NOT NULL DEFAULT 0,
  total_chapters_read bigint NOT NULL DEFAULT 0,
  total_quiz_attempts bigint NOT NULL DEFAULT 0,
  total_devotionals_completed bigint NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(snapshot_date)
);

-- Enable RLS
ALTER TABLE public.admin_metrics_backup ENABLE ROW LEVEL SECURITY;

-- Only admins can view backup data
CREATE POLICY "Admins can view metrics backup"
ON public.admin_metrics_backup
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Service role can insert (for automated backups)
CREATE POLICY "Service role can manage metrics backup"
ON public.admin_metrics_backup
FOR ALL
USING (true)
WITH CHECK (true);

-- Function to save daily metrics snapshot
CREATE OR REPLACE FUNCTION public.admin_save_metrics_snapshot()
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

  INSERT INTO admin_metrics_backup (
    snapshot_date,
    total_users,
    active_users,
    start_plans,
    gold_plans,
    premium_plans,
    total_logins_today,
    total_chapters_read,
    total_quiz_attempts,
    total_devotionals_completed
  )
  SELECT 
    CURRENT_DATE,
    (SELECT COUNT(*) FROM auth.users)::bigint,
    (SELECT COUNT(*) FROM authorized_purchases WHERE status = 'active')::bigint,
    (SELECT COUNT(*) FROM authorized_purchases WHERE plan_type = 'start' AND status = 'active')::bigint,
    (SELECT COUNT(*) FROM authorized_purchases WHERE plan_type = 'gold' AND status = 'active')::bigint,
    (SELECT COUNT(*) FROM authorized_purchases WHERE plan_type = 'premium' AND status = 'active')::bigint,
    (SELECT COUNT(*) FROM daily_logins WHERE login_date = CURRENT_DATE)::bigint,
    (SELECT COUNT(*) FROM reading_schedule WHERE is_completed = true)::bigint,
    (SELECT COUNT(*) FROM quiz_attempts)::bigint,
    (SELECT COUNT(*) FROM devotional_completions)::bigint
  ON CONFLICT (snapshot_date) 
  DO UPDATE SET
    total_users = EXCLUDED.total_users,
    active_users = EXCLUDED.active_users,
    start_plans = EXCLUDED.start_plans,
    gold_plans = EXCLUDED.gold_plans,
    premium_plans = EXCLUDED.premium_plans,
    total_logins_today = EXCLUDED.total_logins_today,
    total_chapters_read = EXCLUDED.total_chapters_read,
    total_quiz_attempts = EXCLUDED.total_quiz_attempts,
    total_devotionals_completed = EXCLUDED.total_devotionals_completed;

  RETURN true;
END;
$$;

-- Function to get metrics history for charts
CREATE OR REPLACE FUNCTION public.admin_get_metrics_history(days_back integer DEFAULT 30)
RETURNS TABLE (
  snapshot_date date,
  total_users bigint,
  active_users bigint,
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
    amb.snapshot_date,
    amb.total_users,
    amb.active_users,
    amb.total_chapters_read,
    amb.total_quiz_attempts,
    amb.total_devotionals_completed
  FROM admin_metrics_backup amb
  WHERE amb.snapshot_date >= CURRENT_DATE - (days_back || ' days')::interval
  ORDER BY amb.snapshot_date;
END;
$$;