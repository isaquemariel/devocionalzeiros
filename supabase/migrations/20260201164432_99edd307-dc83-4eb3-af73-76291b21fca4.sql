
-- Drop old function first since return type is changing
DROP FUNCTION IF EXISTS public.admin_get_user_all_time_stats(uuid);

-- Recreate with achievement_points included
CREATE OR REPLACE FUNCTION public.admin_get_user_all_time_stats(target_user_id uuid)
RETURNS TABLE (
  chapters_read bigint,
  quiz_points bigint,
  devotional_points bigint,
  achievement_points bigint,
  active_days bigint,
  total_points bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_chapters bigint;
  v_quiz bigint;
  v_devotional bigint;
  v_achievements bigint;
  v_active_days bigint;
BEGIN
  -- Only allow admins to call this function
  IF NOT has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;

  -- Count chapters from both reading_progress AND reading_schedule (avoiding duplicates)
  SELECT COUNT(*) INTO v_chapters
  FROM (
    SELECT DISTINCT book_name, chapter_number 
    FROM (
      SELECT book_name, chapter_number FROM reading_progress WHERE user_id = target_user_id
      UNION
      SELECT book_name, chapter_number FROM reading_schedule WHERE user_id = target_user_id AND is_completed = true
    ) all_chapters
  ) unique_chapters;

  -- Sum quiz points
  SELECT COALESCE(SUM(points_earned), 0) INTO v_quiz
  FROM quiz_attempts WHERE user_id = target_user_id;

  -- Count unique devotional completions
  SELECT COUNT(DISTINCT devotional_date) INTO v_devotional
  FROM devotional_completions WHERE user_id = target_user_id;

  -- Sum achievement points
  SELECT COALESCE(SUM(points_awarded), 0) INTO v_achievements
  FROM achievement_claims WHERE user_id = target_user_id;

  -- Count active days
  SELECT COUNT(DISTINCT login_date) INTO v_active_days
  FROM daily_logins WHERE user_id = target_user_id;

  RETURN QUERY SELECT 
    v_chapters,
    v_quiz,
    v_devotional,
    v_achievements,
    v_active_days,
    (v_chapters + v_quiz + v_devotional + v_achievements) as total_points;
END;
$$;
