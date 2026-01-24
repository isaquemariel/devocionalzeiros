-- Atualiza a função get_user_rankings para considerar apenas o mês atual
CREATE OR REPLACE FUNCTION public.get_user_rankings()
RETURNS TABLE (
  user_id uuid,
  full_name text,
  avatar_url text,
  chapters_read bigint,
  quiz_points bigint,
  devotional_points bigint,
  total_points bigint,
  active_days bigint,
  rank bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_month_start date;
  current_month_end date;
BEGIN
  -- Define o início e fim do mês atual (Brasília timezone)
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
      COALESCE(login_stats.login_count, 0)::bigint AS active_days
    FROM profiles p
    -- Capítulos lidos do schedule no mês atual
    LEFT JOIN (
      SELECT rs.user_id, COUNT(*)::bigint AS schedule_count
      FROM reading_schedule rs
      WHERE rs.is_completed = true
        AND rs.completed_at >= current_month_start
        AND rs.completed_at < current_month_end + interval '1 day'
      GROUP BY rs.user_id
    ) schedule_pts ON p.user_id = schedule_pts.user_id
    -- Capítulos lidos do progress no mês atual
    LEFT JOIN (
      SELECT rp.user_id, COUNT(DISTINCT (rp.book_name, rp.chapter_number))::bigint AS progress_count
      FROM reading_progress rp
      WHERE rp.completed_at >= current_month_start
        AND rp.completed_at < current_month_end + interval '1 day'
      GROUP BY rp.user_id
    ) progress_pts ON p.user_id = progress_pts.user_id
    -- Pontos do quiz no mês atual
    LEFT JOIN (
      SELECT qa.user_id, SUM(qa.points_earned)::bigint AS quiz_total
      FROM quiz_attempts qa
      WHERE qa.quiz_date >= current_month_start
        AND qa.quiz_date <= current_month_end
      GROUP BY qa.user_id
    ) quiz_pts ON p.user_id = quiz_pts.user_id
    -- Devocionais no mês atual
    LEFT JOIN (
      SELECT dc.user_id, COUNT(DISTINCT dc.devotional_date)::bigint AS devotional_count
      FROM devotional_completions dc
      WHERE dc.devotional_date >= current_month_start
        AND dc.devotional_date <= current_month_end
      GROUP BY dc.user_id
    ) dev_pts ON p.user_id = dev_pts.user_id
    -- Logins no mês atual
    LEFT JOIN (
      SELECT dl.user_id, COUNT(DISTINCT dl.login_date)::bigint AS login_count
      FROM daily_logins dl
      WHERE dl.login_date >= current_month_start
        AND dl.login_date <= current_month_end
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
    (us.schedule_points + us.progress_points + us.quiz_points + us.devotional_points)::bigint AS total_points,
    us.active_days,
    ROW_NUMBER() OVER (ORDER BY (us.schedule_points + us.progress_points + us.quiz_points + us.devotional_points) DESC, us.active_days DESC)::bigint AS rank
  FROM user_stats us
  WHERE (us.schedule_points + us.progress_points + us.quiz_points + us.devotional_points) > 0
  ORDER BY rank;
END;
$$;