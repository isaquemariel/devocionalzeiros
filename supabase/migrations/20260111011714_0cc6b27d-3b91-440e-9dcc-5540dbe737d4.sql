-- Update the get_user_rankings function to count chapters from BOTH tables:
-- 1. reading_schedule (current plan)
-- 2. reading_progress (historical completed chapters from previous plans)

CREATE OR REPLACE FUNCTION public.get_user_rankings()
 RETURNS TABLE(user_id uuid, full_name text, avatar_url text, chapters_read bigint, quiz_points bigint, devotional_points bigint, total_points bigint, active_days bigint, rank bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  current_user_id uuid;
BEGIN
  -- Authentication check: Only authenticated users can access rankings
  current_user_id := auth.uid();
  
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  RETURN QUERY
  SELECT 
    p.user_id,
    -- Only show full name if user opted in OR if it's the current user
    CASE 
      WHEN p.show_in_rankings = true OR p.user_id = current_user_id 
      THEN p.full_name 
      ELSE 'Usuário Anônimo' 
    END as full_name,
    -- Only show avatar if user opted in OR if it's the current user
    CASE 
      WHEN p.show_in_rankings = true OR p.user_id = current_user_id 
      THEN p.avatar_url 
      ELSE NULL 
    END as avatar_url,
    -- Count chapters from BOTH reading_schedule (current plan) AND reading_progress (historical)
    (
      COALESCE((SELECT COUNT(*) FROM public.reading_schedule rs2 WHERE rs2.user_id = p.user_id AND rs2.is_completed = true), 0) +
      COALESCE((SELECT COUNT(*) FROM public.reading_progress rp WHERE rp.user_id = p.user_id), 0)
    )::bigint as chapters_read,
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
      -- Total points = chapters from both tables + quiz + devotional
      COALESCE((SELECT COUNT(*) FROM public.reading_schedule rs2 WHERE rs2.user_id = p.user_id AND rs2.is_completed = true), 0) +
      COALESCE((SELECT COUNT(*) FROM public.reading_progress rp WHERE rp.user_id = p.user_id), 0) +
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
          COALESCE((SELECT COUNT(*) FROM public.reading_schedule rs3 WHERE rs3.user_id = p.user_id AND rs3.is_completed = true), 0) +
          COALESCE((SELECT COUNT(*) FROM public.reading_progress rp2 WHERE rp2.user_id = p.user_id), 0) +
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
  LEFT JOIN public.daily_logins dl ON p.user_id = dl.user_id
  GROUP BY p.user_id, p.full_name, p.avatar_url, p.created_at, p.show_in_rankings;
END;
$function$;