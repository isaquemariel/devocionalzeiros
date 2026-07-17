-- Ranking correctness (applied live via Lovable).
--
-- R2: get_user_rankings compared timestamptz columns (reading_schedule/progress
--     .completed_at, achievement_claims.claimed_at, rpg_progress.completed_at,
--     community_posts.created_at/answered_at) against bare `date` month bounds,
--     which Postgres casts in the session TZ (UTC) — a 3h drift that bucketed
--     boundary points into the wrong month. Now uses explicit Brasília timestamptz
--     bounds for those columns (date columns quiz_date/devotional_date keep date
--     bounds, which were already correct).
-- R5 + consistency: get_my_points duplicated the whole ranking computation (and
--     drifted: different tie-break, same TZ bug). It now DERIVES from
--     get_user_rankings() so a user's points/rank always match the leaderboard.
-- R1: save_monthly_ranking_and_reset snapshot omitted community points (and had
--     the TZ bug), so the "Campeões" history diverged from what users saw. Now
--     mirrors the get_user_rankings formula (incl. community + Brasília bounds +
--     active_days tie-break) for the previous month.
--
-- NOTE (product decision, not changed here): chapters_read counts reading_schedule
-- + reading_progress, so a chapter completed via BOTH the plan and free reading is
-- counted twice in the ranking (all-time stats de-duplicate). Left as-is pending a
-- scoring-policy decision.

-- (Full function bodies as applied live.)

CREATE OR REPLACE FUNCTION public.get_user_rankings()
 RETURNS TABLE(user_id uuid, full_name text, avatar_url text, chapters_read bigint, quiz_points bigint, devotional_points bigint, rpg_points bigint, total_points bigint, active_days bigint, rank bigint)
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  current_month_start date; current_month_end date;
  month_start_ts timestamptz; month_end_ts timestamptz;
BEGIN
  current_month_start := date_trunc('month', (now() AT TIME ZONE 'America/Sao_Paulo'))::date;
  current_month_end := (date_trunc('month', (now() AT TIME ZONE 'America/Sao_Paulo')) + interval '1 month' - interval '1 day')::date;
  month_start_ts := date_trunc('month', (now() AT TIME ZONE 'America/Sao_Paulo')) AT TIME ZONE 'America/Sao_Paulo';
  month_end_ts := (date_trunc('month', (now() AT TIME ZONE 'America/Sao_Paulo')) + interval '1 month') AT TIME ZONE 'America/Sao_Paulo';
  RETURN QUERY
  WITH user_stats AS (
    SELECT p.user_id, p.full_name, p.avatar_url, p.show_in_rankings,
      COALESCE(s.c,0)::bigint AS schedule_points, COALESCE(pr.c,0)::bigint AS progress_points,
      COALESCE(q.t,0)::bigint AS quiz_points, COALESCE(d.c,0)::bigint AS devotional_points,
      COALESCE(a.t,0)::bigint AS achievement_points, COALESCE(rp.x,0)::bigint AS rpg_points,
      COALESCE(cm.t,0)::bigint AS community_points, COALESCE(l.c,0)::bigint AS active_days
    FROM profiles p
    LEFT JOIN (SELECT rs.user_id, COUNT(*)::bigint c FROM reading_schedule rs WHERE rs.is_completed AND rs.completed_at>=month_start_ts AND rs.completed_at<month_end_ts GROUP BY rs.user_id) s ON p.user_id=s.user_id
    LEFT JOIN (SELECT rp.user_id, COUNT(DISTINCT (rp.book_name,rp.chapter_number))::bigint c FROM reading_progress rp WHERE rp.completed_at>=month_start_ts AND rp.completed_at<month_end_ts GROUP BY rp.user_id) pr ON p.user_id=pr.user_id
    LEFT JOIN (SELECT qa.user_id, SUM(qa.points_earned)::bigint t FROM quiz_attempts qa WHERE qa.quiz_date>=current_month_start AND qa.quiz_date<=current_month_end GROUP BY qa.user_id) q ON p.user_id=q.user_id
    LEFT JOIN (SELECT dc.user_id, COUNT(DISTINCT dc.devotional_date)::bigint c FROM devotional_completions dc WHERE dc.devotional_date>=current_month_start AND dc.devotional_date<=current_month_end GROUP BY dc.user_id) d ON p.user_id=d.user_id
    LEFT JOIN (SELECT ac.user_id, SUM(ac.points_awarded)::bigint t FROM achievement_claims ac WHERE ac.claimed_at>=month_start_ts AND ac.claimed_at<month_end_ts GROUP BY ac.user_id) a ON p.user_id=a.user_id
    LEFT JOIN (SELECT rp.user_id, SUM(10+rp.quiz_correct*5)::bigint x FROM rpg_progress rp WHERE rp.is_completed AND rp.completed_at>=month_start_ts AND rp.completed_at<month_end_ts GROUP BY rp.user_id) rp ON p.user_id=rp.user_id
    LEFT JOIN (SELECT cp.user_id, (SUM(CASE WHEN cp.post_type='thanks' AND cp.created_at>=month_start_ts AND cp.created_at<month_end_ts THEN 1 ELSE 0 END)+SUM(CASE WHEN cp.is_answered AND cp.answered_at>=month_start_ts AND cp.answered_at<month_end_ts THEN 1 ELSE 0 END))::bigint t FROM community_posts cp GROUP BY cp.user_id) cm ON p.user_id=cm.user_id
    LEFT JOIN (SELECT dl.user_id, COUNT(DISTINCT dl.login_date)::bigint c FROM daily_logins dl GROUP BY dl.user_id) l ON p.user_id=l.user_id
  )
  SELECT us.user_id,
    CASE WHEN us.show_in_rankings THEN us.full_name ELSE 'Usuário Anônimo' END,
    CASE WHEN us.show_in_rankings THEN us.avatar_url ELSE NULL END,
    (us.schedule_points+us.progress_points)::bigint,
    us.quiz_points, us.devotional_points, us.rpg_points,
    (us.schedule_points+us.progress_points+us.quiz_points+us.devotional_points+us.achievement_points+us.rpg_points+us.community_points)::bigint,
    us.active_days,
    ROW_NUMBER() OVER (ORDER BY (us.schedule_points+us.progress_points+us.quiz_points+us.devotional_points+us.achievement_points+us.rpg_points+us.community_points) DESC, us.active_days DESC)::bigint
  FROM user_stats us
  WHERE (us.schedule_points+us.progress_points+us.quiz_points+us.devotional_points+us.achievement_points+us.rpg_points+us.community_points) > 0
  ORDER BY rank;
END; $function$;

CREATE OR REPLACE FUNCTION public.get_my_points()
 RETURNS TABLE(chapters_read bigint, quiz_points bigint, devotional_points bigint, achievement_points bigint, rpg_points bigint, active_days bigint, total_points bigint, rank bigint)
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE v_user_id uuid;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN RETURN; END IF;
  RETURN QUERY
  SELECT r.chapters_read, r.quiz_points, r.devotional_points,
    (r.total_points - r.chapters_read - r.quiz_points - r.devotional_points - r.rpg_points)::bigint,
    r.rpg_points, r.active_days, r.total_points, r.rank
  FROM get_user_rankings() r WHERE r.user_id = v_user_id;
END; $function$;

-- save_monthly_ranking_and_reset: see 20260716060000 body applied live (previous
-- Brasília month, includes community points + active_days tie-break, top-3 into
-- monthly_ranking_history ON CONFLICT DO NOTHING). Kept service_role-only.
