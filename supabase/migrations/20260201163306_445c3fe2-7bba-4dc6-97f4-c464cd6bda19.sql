-- Create RPC function for admins to get all-time stats for any user
CREATE OR REPLACE FUNCTION public.admin_get_user_all_time_stats(target_user_id uuid)
RETURNS TABLE (
  chapters_read bigint,
  quiz_points bigint,
  devotional_points bigint,
  active_days bigint,
  total_points bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow admins to call this function
  IF NOT has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;

  RETURN QUERY
  SELECT 
    COALESCE((SELECT COUNT(*) FROM reading_progress WHERE user_id = target_user_id), 0) as chapters_read,
    COALESCE((SELECT SUM(points_earned) FROM quiz_attempts WHERE user_id = target_user_id), 0) as quiz_points,
    COALESCE((SELECT COUNT(DISTINCT devotional_date) FROM devotional_completions WHERE user_id = target_user_id), 0) as devotional_points,
    COALESCE((SELECT COUNT(DISTINCT login_date) FROM daily_logins WHERE user_id = target_user_id), 0) as active_days,
    (
      COALESCE((SELECT COUNT(*) FROM reading_progress WHERE user_id = target_user_id), 0) +
      COALESCE((SELECT SUM(points_earned) FROM quiz_attempts WHERE user_id = target_user_id), 0) +
      COALESCE((SELECT COUNT(DISTINCT devotional_date) FROM devotional_completions WHERE user_id = target_user_id), 0)
    ) as total_points;
END;
$$;