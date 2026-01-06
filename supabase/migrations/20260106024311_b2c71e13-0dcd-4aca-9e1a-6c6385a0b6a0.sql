-- Drop the existing function first to change return type
DROP FUNCTION IF EXISTS public.get_user_rankings();

-- Recreate with new return type including points
CREATE OR REPLACE FUNCTION public.get_user_rankings()
RETURNS TABLE(
  user_id uuid, 
  full_name text, 
  avatar_url text, 
  chapters_read bigint, 
  quiz_points bigint,
  total_points bigint,
  active_days bigint, 
  rank bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
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
    (
      COALESCE(COUNT(DISTINCT rs.id) FILTER (WHERE rs.is_completed = true), 0) +
      COALESCE((
        SELECT SUM(qa.points_earned)::bigint 
        FROM public.quiz_attempts qa 
        WHERE qa.user_id = p.user_id
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