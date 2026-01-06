-- Fix security vulnerability: Add authentication check to get_user_rankings function
-- This prevents unauthenticated users from accessing ranking data

CREATE OR REPLACE FUNCTION public.get_user_rankings()
 RETURNS TABLE(user_id uuid, full_name text, avatar_url text, chapters_read bigint, quiz_points bigint, devotional_points bigint, total_points bigint, active_days bigint, rank bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Authentication check: Only authenticated users can access rankings
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  RETURN QUERY
  SELECT 
    p.user_id,
    p.full_name,
    p.avatar_url,
    COALESCE(COUNT(DISTINCT rs.id) FILTER (WHERE rs.is_completed = true), 0)::bigint as chapters_read,
    COALESCE((
      SELECT SUM(qa.points_earned)::bigint 
      FROM public.quiz_attempts qa 
      WHERE qa.user_id = p.user_id
    ), 0)::bigint as quiz_points,
    COALESCE((
      SELECT COUNT(*)::bigint 
      FROM public.devotional_completions dc 
      WHERE dc.user_id = p.user_id
    ), 0)::bigint as devotional_points,
    (
      COALESCE(COUNT(DISTINCT rs.id) FILTER (WHERE rs.is_completed = true), 0) +
      COALESCE((
        SELECT SUM(qa.points_earned)::bigint 
        FROM public.quiz_attempts qa 
        WHERE qa.user_id = p.user_id
      ), 0) +
      COALESCE((
        SELECT COUNT(*)::bigint 
        FROM public.devotional_completions dc 
        WHERE dc.user_id = p.user_id
      ), 0)
    )::bigint as total_points,
    COALESCE(COUNT(DISTINCT dl.login_date), 0)::bigint as active_days,
    ROW_NUMBER() OVER (
      ORDER BY 
        (
          COALESCE(COUNT(DISTINCT rs.id) FILTER (WHERE rs.is_completed = true), 0) +
          COALESCE((
            SELECT SUM(qa2.points_earned)::bigint 
            FROM public.quiz_attempts qa2 
            WHERE qa2.user_id = p.user_id
          ), 0) +
          COALESCE((
            SELECT COUNT(*)::bigint 
            FROM public.devotional_completions dc2 
            WHERE dc2.user_id = p.user_id
          ), 0)
        ) DESC,
        p.created_at ASC
    )::bigint as rank
  FROM public.profiles p
  LEFT JOIN public.reading_schedule rs ON p.user_id = rs.user_id
  LEFT JOIN public.daily_logins dl ON p.user_id = dl.user_id
  GROUP BY p.user_id, p.full_name, p.avatar_url, p.created_at;
END;
$function$;