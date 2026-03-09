
-- RPC leve: retorna apenas os pontos do usuário atual sem calcular ranking global
CREATE OR REPLACE FUNCTION public.get_my_points()
RETURNS TABLE(
  chapters_read bigint,
  quiz_points bigint,
  devotional_points bigint,
  achievement_points bigint,
  rpg_points bigint,
  active_days bigint,
  total_points bigint,
  rank bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid;
  current_month_start date;
  current_month_end date;
  v_schedule_pts bigint;
  v_progress_pts bigint;
  v_quiz_pts bigint;
  v_dev_pts bigint;
  v_ach_pts bigint;
  v_rpg_pts bigint;
  v_active_days bigint;
  v_total bigint;
  v_rank bigint;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN RETURN; END IF;

  current_month_start := date_trunc('month', (now() AT TIME ZONE 'America/Sao_Paulo'))::date;
  current_month_end := (date_trunc('month', (now() AT TIME ZONE 'America/Sao_Paulo')) + interval '1 month' - interval '1 day')::date;

  SELECT COUNT(*) INTO v_schedule_pts
  FROM reading_schedule rs
  WHERE rs.user_id = v_user_id
    AND rs.is_completed = true
    AND rs.completed_at >= current_month_start
    AND rs.completed_at < current_month_end + interval '1 day';

  SELECT COUNT(DISTINCT (book_name, chapter_number)) INTO v_progress_pts
  FROM reading_progress rp
  WHERE rp.user_id = v_user_id
    AND rp.completed_at >= current_month_start
    AND rp.completed_at < current_month_end + interval '1 day';

  SELECT COALESCE(SUM(points_earned), 0) INTO v_quiz_pts
  FROM quiz_attempts qa
  WHERE qa.user_id = v_user_id
    AND qa.quiz_date >= current_month_start
    AND qa.quiz_date <= current_month_end;

  SELECT COUNT(DISTINCT devotional_date) INTO v_dev_pts
  FROM devotional_completions dc
  WHERE dc.user_id = v_user_id
    AND dc.devotional_date >= current_month_start
    AND dc.devotional_date <= current_month_end;

  SELECT COALESCE(SUM(points_awarded), 0) INTO v_ach_pts
  FROM achievement_claims ac
  WHERE ac.user_id = v_user_id
    AND ac.claimed_at >= current_month_start
    AND ac.claimed_at < current_month_end + interval '1 day';

  SELECT COALESCE(SUM(10 + quiz_correct * 5), 0) INTO v_rpg_pts
  FROM rpg_progress rp
  WHERE rp.user_id = v_user_id
    AND rp.is_completed = true
    AND rp.completed_at >= current_month_start
    AND rp.completed_at < current_month_end + interval '1 day';

  SELECT COUNT(DISTINCT login_date) INTO v_active_days
  FROM daily_logins dl
  WHERE dl.user_id = v_user_id;

  v_total := COALESCE(v_schedule_pts,0) + COALESCE(v_progress_pts,0) + COALESCE(v_quiz_pts,0) + COALESCE(v_dev_pts,0) + COALESCE(v_ach_pts,0) + COALESCE(v_rpg_pts,0);

  SELECT COUNT(*) + 1 INTO v_rank
  FROM (
    SELECT p.user_id,
      COALESCE((SELECT COUNT(*) FROM reading_schedule rs WHERE rs.user_id = p.user_id AND rs.is_completed = true AND rs.completed_at >= current_month_start AND rs.completed_at < current_month_end + interval '1 day'), 0) +
      COALESCE((SELECT COUNT(DISTINCT (rp.book_name, rp.chapter_number)) FROM reading_progress rp WHERE rp.user_id = p.user_id AND rp.completed_at >= current_month_start AND rp.completed_at < current_month_end + interval '1 day'), 0) +
      COALESCE((SELECT SUM(qa.points_earned) FROM quiz_attempts qa WHERE qa.user_id = p.user_id AND qa.quiz_date >= current_month_start AND qa.quiz_date <= current_month_end), 0) +
      COALESCE((SELECT COUNT(DISTINCT dc.devotional_date) FROM devotional_completions dc WHERE dc.user_id = p.user_id AND dc.devotional_date >= current_month_start AND dc.devotional_date <= current_month_end), 0) +
      COALESCE((SELECT SUM(ac.points_awarded) FROM achievement_claims ac WHERE ac.user_id = p.user_id AND ac.claimed_at >= current_month_start AND ac.claimed_at < current_month_end + interval '1 day'), 0) +
      COALESCE((SELECT SUM(10 + rp2.quiz_correct * 5) FROM rpg_progress rp2 WHERE rp2.user_id = p.user_id AND rp2.is_completed = true AND rp2.completed_at >= current_month_start AND rp2.completed_at < current_month_end + interval '1 day'), 0)
      AS pts
    FROM profiles p
  ) ranked
  WHERE ranked.pts > v_total;

  RETURN QUERY SELECT
    (COALESCE(v_schedule_pts,0) + COALESCE(v_progress_pts,0))::bigint,
    COALESCE(v_quiz_pts,0)::bigint,
    COALESCE(v_dev_pts,0)::bigint,
    COALESCE(v_ach_pts,0)::bigint,
    COALESCE(v_rpg_pts,0)::bigint,
    COALESCE(v_active_days,0)::bigint,
    v_total::bigint,
    COALESCE(v_rank,1)::bigint;
END;
$$;
