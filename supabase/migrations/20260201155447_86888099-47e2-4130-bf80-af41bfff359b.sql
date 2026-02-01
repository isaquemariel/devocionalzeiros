
-- Fix the save_monthly_ranking_and_reset function to correctly calculate ALL points
-- Including: chapters (schedule + progress), quiz, devotional, and achievement points
CREATE OR REPLACE FUNCTION public.save_monthly_ranking_and_reset()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  prev_month TEXT;
  prev_month_start DATE;
  prev_month_end DATE;
  ranking_record RECORD;
BEGIN
  -- Calculate previous month in YYYY-MM format
  prev_month := to_char(now() - interval '1 month', 'YYYY-MM');
  prev_month_start := date_trunc('month', now() - interval '1 month')::date;
  prev_month_end := (date_trunc('month', now()) - interval '1 day')::date;
  
  -- Calculate and save complete ranking for previous month (Top 3)
  FOR ranking_record IN
    WITH user_stats AS (
      SELECT 
        p.user_id,
        p.full_name,
        p.avatar_url,
        p.show_in_rankings,
        -- Chapters from schedule
        COALESCE((
          SELECT COUNT(*) FROM reading_schedule rs
          WHERE rs.user_id = p.user_id
            AND rs.is_completed = true
            AND rs.completed_at >= prev_month_start
            AND rs.completed_at < prev_month_end + interval '1 day'
        ), 0)::bigint AS schedule_chapters,
        -- Chapters from progress
        COALESCE((
          SELECT COUNT(DISTINCT (rp.book_name, rp.chapter_number)) FROM reading_progress rp
          WHERE rp.user_id = p.user_id
            AND rp.completed_at >= prev_month_start
            AND rp.completed_at < prev_month_end + interval '1 day'
        ), 0)::bigint AS progress_chapters,
        -- Quiz points
        COALESCE((
          SELECT SUM(qa.points_earned) FROM quiz_attempts qa
          WHERE qa.user_id = p.user_id
            AND qa.quiz_date >= prev_month_start
            AND qa.quiz_date <= prev_month_end
        ), 0)::bigint AS quiz_pts,
        -- Devotional points
        COALESCE((
          SELECT COUNT(DISTINCT dc.devotional_date) FROM devotional_completions dc
          WHERE dc.user_id = p.user_id
            AND dc.devotional_date >= prev_month_start
            AND dc.devotional_date <= prev_month_end
        ), 0)::bigint AS devotional_pts,
        -- Achievement points
        COALESCE((
          SELECT SUM(ac.points_awarded) FROM achievement_claims ac
          WHERE ac.user_id = p.user_id
            AND ac.claimed_at >= prev_month_start
            AND ac.claimed_at < prev_month_end + interval '1 day'
        ), 0)::bigint AS achievement_pts
      FROM profiles p
    )
    SELECT 
      us.user_id,
      CASE WHEN us.show_in_rankings = true THEN us.full_name ELSE 'Usuário Anônimo' END AS full_name,
      CASE WHEN us.show_in_rankings = true THEN us.avatar_url ELSE NULL END AS avatar_url,
      (us.schedule_chapters + us.progress_chapters)::bigint AS chapters_read,
      us.quiz_pts AS quiz_points,
      us.devotional_pts AS devotional_points,
      (us.schedule_chapters + us.progress_chapters + us.quiz_pts + us.devotional_pts + us.achievement_pts)::bigint AS total_points,
      ROW_NUMBER() OVER (
        ORDER BY (us.schedule_chapters + us.progress_chapters + us.quiz_pts + us.devotional_pts + us.achievement_pts) DESC
      )::bigint AS rank
    FROM user_stats us
    WHERE (us.schedule_chapters + us.progress_chapters + us.quiz_pts + us.devotional_pts + us.achievement_pts) > 0
    ORDER BY rank
    LIMIT 3
  LOOP
    INSERT INTO monthly_ranking_history (
      user_id,
      full_name,
      avatar_url,
      rank,
      total_points,
      chapters_read,
      quiz_points,
      devotional_points,
      month_year
    ) VALUES (
      ranking_record.user_id,
      ranking_record.full_name,
      ranking_record.avatar_url,
      ranking_record.rank,
      ranking_record.total_points,
      ranking_record.chapters_read,
      ranking_record.quiz_points,
      ranking_record.devotional_points,
      prev_month
    )
    ON CONFLICT DO NOTHING;
  END LOOP;
END;
$$;

-- Create function to get ALL monthly ranking history (for history view)
CREATE OR REPLACE FUNCTION public.get_all_monthly_champions()
RETURNS TABLE(
  user_id uuid, 
  full_name text, 
  avatar_url text, 
  rank integer, 
  total_points integer, 
  chapters_read integer,
  quiz_points integer,
  devotional_points integer,
  month_year text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    mrh.user_id,
    mrh.full_name,
    mrh.avatar_url,
    mrh.rank,
    mrh.total_points,
    mrh.chapters_read,
    mrh.quiz_points,
    mrh.devotional_points,
    mrh.month_year
  FROM monthly_ranking_history mrh
  ORDER BY mrh.month_year DESC, mrh.rank ASC;
END;
$$;
