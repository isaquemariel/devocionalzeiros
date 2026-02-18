
-- Drop functions whose return type changed
DROP FUNCTION IF EXISTS public.get_user_rankings();
DROP FUNCTION IF EXISTS public.admin_get_user_all_time_stats(uuid);

-- Recreate get_user_rankings with rpg_points column
CREATE OR REPLACE FUNCTION public.get_user_rankings()
 RETURNS TABLE(user_id uuid, full_name text, avatar_url text, chapters_read bigint, quiz_points bigint, devotional_points bigint, rpg_points bigint, total_points bigint, active_days bigint, rank bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  current_month_start date;
  current_month_end date;
BEGIN
  current_month_start := date_trunc('month', (now() AT TIME ZONE 'America/Sao_Paulo'))::date;
  current_month_end := (date_trunc('month', (now() AT TIME ZONE 'America/Sao_Paulo')) + interval '1 month' - interval '1 day')::date;

  RETURN QUERY
  WITH user_stats AS (
    SELECT 
      p.user_id,
      p.full_name,
      p.avatar_url,
      p.show_in_rankings,
      COALESCE(schedule_pts.schedule_count, 0)::bigint AS schedule_points,
      COALESCE(progress_pts.progress_count, 0)::bigint AS progress_points,
      COALESCE(quiz_pts.quiz_total, 0)::bigint AS quiz_points,
      COALESCE(dev_pts.devotional_count, 0)::bigint AS devotional_points,
      COALESCE(achievement_pts.achievement_total, 0)::bigint AS achievement_points,
      COALESCE(rpg_pts.rpg_xp, 0)::bigint AS rpg_points,
      COALESCE(login_stats.login_count, 0)::bigint AS active_days
    FROM profiles p
    LEFT JOIN (
      SELECT rs.user_id, COUNT(*)::bigint AS schedule_count
      FROM reading_schedule rs
      WHERE rs.is_completed = true
        AND rs.completed_at >= current_month_start
        AND rs.completed_at < current_month_end + interval '1 day'
      GROUP BY rs.user_id
    ) schedule_pts ON p.user_id = schedule_pts.user_id
    LEFT JOIN (
      SELECT rp.user_id, COUNT(DISTINCT (rp.book_name, rp.chapter_number))::bigint AS progress_count
      FROM reading_progress rp
      WHERE rp.completed_at >= current_month_start
        AND rp.completed_at < current_month_end + interval '1 day'
      GROUP BY rp.user_id
    ) progress_pts ON p.user_id = progress_pts.user_id
    LEFT JOIN (
      SELECT qa.user_id, SUM(qa.points_earned)::bigint AS quiz_total
      FROM quiz_attempts qa
      WHERE qa.quiz_date >= current_month_start
        AND qa.quiz_date <= current_month_end
      GROUP BY qa.user_id
    ) quiz_pts ON p.user_id = quiz_pts.user_id
    LEFT JOIN (
      SELECT dc.user_id, COUNT(DISTINCT dc.devotional_date)::bigint AS devotional_count
      FROM devotional_completions dc
      WHERE dc.devotional_date >= current_month_start
        AND dc.devotional_date <= current_month_end
      GROUP BY dc.user_id
    ) dev_pts ON p.user_id = dev_pts.user_id
    LEFT JOIN (
      SELECT ac.user_id, SUM(ac.points_awarded)::bigint AS achievement_total
      FROM achievement_claims ac
      WHERE ac.claimed_at >= current_month_start
        AND ac.claimed_at < current_month_end + interval '1 day'
      GROUP BY ac.user_id
    ) achievement_pts ON p.user_id = achievement_pts.user_id
    LEFT JOIN (
      SELECT rp.user_id, SUM(10 + rp.quiz_correct * 5)::bigint AS rpg_xp
      FROM rpg_progress rp
      WHERE rp.is_completed = true
        AND rp.completed_at >= current_month_start
        AND rp.completed_at < current_month_end + interval '1 day'
      GROUP BY rp.user_id
    ) rpg_pts ON p.user_id = rpg_pts.user_id
    LEFT JOIN (
      SELECT dl.user_id, COUNT(DISTINCT dl.login_date)::bigint AS login_count
      FROM daily_logins dl
      GROUP BY dl.user_id
    ) login_stats ON p.user_id = login_stats.user_id
  )
  SELECT 
    us.user_id,
    CASE WHEN us.show_in_rankings = true THEN us.full_name ELSE 'Usuário Anônimo' END AS full_name,
    CASE WHEN us.show_in_rankings = true THEN us.avatar_url ELSE NULL END AS avatar_url,
    (us.schedule_points + us.progress_points)::bigint AS chapters_read,
    us.quiz_points,
    us.devotional_points,
    us.rpg_points,
    (us.schedule_points + us.progress_points + us.quiz_points + us.devotional_points + us.achievement_points + us.rpg_points)::bigint AS total_points,
    us.active_days,
    ROW_NUMBER() OVER (ORDER BY (us.schedule_points + us.progress_points + us.quiz_points + us.devotional_points + us.achievement_points + us.rpg_points) DESC, us.active_days DESC)::bigint AS rank
  FROM user_stats us
  WHERE (us.schedule_points + us.progress_points + us.quiz_points + us.devotional_points + us.achievement_points + us.rpg_points) > 0
  ORDER BY rank;
END;
$function$;

-- Recreate admin_get_user_all_time_stats with rpg_points column
CREATE OR REPLACE FUNCTION public.admin_get_user_all_time_stats(target_user_id uuid)
 RETURNS TABLE(chapters_read bigint, quiz_points bigint, devotional_points bigint, achievement_points bigint, rpg_points bigint, active_days bigint, total_points bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_chapters bigint;
  v_quiz bigint;
  v_devotional bigint;
  v_achievements bigint;
  v_rpg bigint;
  v_active_days bigint;
BEGIN
  IF NOT has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;

  SELECT COUNT(*) INTO v_chapters
  FROM (
    SELECT DISTINCT book_name, chapter_number 
    FROM (
      SELECT book_name, chapter_number FROM reading_progress WHERE user_id = target_user_id
      UNION
      SELECT book_name, chapter_number FROM reading_schedule WHERE user_id = target_user_id AND is_completed = true
    ) all_chapters
  ) unique_chapters;

  SELECT COALESCE(SUM(points_earned), 0) INTO v_quiz FROM quiz_attempts WHERE user_id = target_user_id;
  SELECT COUNT(DISTINCT devotional_date) INTO v_devotional FROM devotional_completions WHERE user_id = target_user_id;
  SELECT COALESCE(SUM(points_awarded), 0) INTO v_achievements FROM achievement_claims WHERE user_id = target_user_id;
  SELECT COALESCE(SUM(10 + quiz_correct * 5), 0) INTO v_rpg FROM rpg_progress WHERE user_id = target_user_id AND is_completed = true;
  SELECT COUNT(DISTINCT login_date) INTO v_active_days FROM daily_logins WHERE user_id = target_user_id;

  RETURN QUERY SELECT v_chapters, v_quiz, v_devotional, v_achievements, v_rpg, v_active_days,
    (v_chapters + v_quiz + v_devotional + v_achievements + v_rpg) as total_points;
END;
$function$;

-- Update save_monthly_ranking_and_reset to include RPG points in total
CREATE OR REPLACE FUNCTION public.save_monthly_ranking_and_reset()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  prev_month TEXT;
  prev_month_start DATE;
  prev_month_end DATE;
  ranking_record RECORD;
BEGIN
  prev_month := to_char(now() - interval '1 month', 'YYYY-MM');
  prev_month_start := date_trunc('month', now() - interval '1 month')::date;
  prev_month_end := (date_trunc('month', now()) - interval '1 day')::date;
  
  FOR ranking_record IN
    WITH user_stats AS (
      SELECT 
        p.user_id, p.full_name, p.avatar_url, p.show_in_rankings,
        COALESCE((SELECT COUNT(*) FROM reading_schedule rs WHERE rs.user_id = p.user_id AND rs.is_completed = true AND rs.completed_at >= prev_month_start AND rs.completed_at < prev_month_end + interval '1 day'), 0)::bigint AS schedule_chapters,
        COALESCE((SELECT COUNT(DISTINCT (rp.book_name, rp.chapter_number)) FROM reading_progress rp WHERE rp.user_id = p.user_id AND rp.completed_at >= prev_month_start AND rp.completed_at < prev_month_end + interval '1 day'), 0)::bigint AS progress_chapters,
        COALESCE((SELECT SUM(qa.points_earned) FROM quiz_attempts qa WHERE qa.user_id = p.user_id AND qa.quiz_date >= prev_month_start AND qa.quiz_date <= prev_month_end), 0)::bigint AS quiz_pts,
        COALESCE((SELECT COUNT(DISTINCT dc.devotional_date) FROM devotional_completions dc WHERE dc.user_id = p.user_id AND dc.devotional_date >= prev_month_start AND dc.devotional_date <= prev_month_end), 0)::bigint AS devotional_pts,
        COALESCE((SELECT SUM(ac.points_awarded) FROM achievement_claims ac WHERE ac.user_id = p.user_id AND ac.claimed_at >= prev_month_start AND ac.claimed_at < prev_month_end + interval '1 day'), 0)::bigint AS achievement_pts,
        COALESCE((SELECT SUM(10 + rp.quiz_correct * 5) FROM rpg_progress rp WHERE rp.user_id = p.user_id AND rp.is_completed = true AND rp.completed_at >= prev_month_start AND rp.completed_at < prev_month_end + interval '1 day'), 0)::bigint AS rpg_pts
      FROM profiles p
    )
    SELECT 
      us.user_id,
      CASE WHEN us.show_in_rankings = true THEN us.full_name ELSE 'Usuário Anônimo' END AS full_name,
      CASE WHEN us.show_in_rankings = true THEN us.avatar_url ELSE NULL END AS avatar_url,
      (us.schedule_chapters + us.progress_chapters)::bigint AS chapters_read,
      us.quiz_pts AS quiz_points,
      us.devotional_pts AS devotional_points,
      (us.schedule_chapters + us.progress_chapters + us.quiz_pts + us.devotional_pts + us.achievement_pts + us.rpg_pts)::bigint AS total_points,
      ROW_NUMBER() OVER (ORDER BY (us.schedule_chapters + us.progress_chapters + us.quiz_pts + us.devotional_pts + us.achievement_pts + us.rpg_pts) DESC)::bigint AS rank
    FROM user_stats us
    WHERE (us.schedule_chapters + us.progress_chapters + us.quiz_pts + us.devotional_pts + us.achievement_pts + us.rpg_pts) > 0
    ORDER BY rank LIMIT 3
  LOOP
    INSERT INTO monthly_ranking_history (user_id, full_name, avatar_url, rank, total_points, chapters_read, quiz_points, devotional_points, month_year)
    VALUES (ranking_record.user_id, ranking_record.full_name, ranking_record.avatar_url, ranking_record.rank, ranking_record.total_points, ranking_record.chapters_read, ranking_record.quiz_points, ranking_record.devotional_points, prev_month)
    ON CONFLICT DO NOTHING;
  END LOOP;
END;
$function$;
