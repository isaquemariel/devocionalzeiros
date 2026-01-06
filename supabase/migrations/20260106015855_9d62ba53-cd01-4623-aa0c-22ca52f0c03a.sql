-- Update the ranking function to use reading_schedule instead of reading_progress
-- Since reading_schedule is what gets updated when users mark chapters as complete

DROP FUNCTION IF EXISTS public.get_user_rankings();

CREATE OR REPLACE FUNCTION public.get_user_rankings()
RETURNS TABLE(
  user_id uuid,
  full_name text,
  avatar_url text,
  chapters_read bigint,
  total_reading_time bigint,
  active_days bigint,
  rank bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.user_id,
    p.full_name,
    p.avatar_url,
    COALESCE(COUNT(DISTINCT rs.id) FILTER (WHERE rs.is_completed = true), 0)::bigint as chapters_read,
    0::bigint as total_reading_time,
    COALESCE(COUNT(DISTINCT DATE(rs.completed_at)) FILTER (WHERE rs.is_completed = true), 0)::bigint as active_days,
    ROW_NUMBER() OVER (
      ORDER BY 
        COALESCE(COUNT(DISTINCT rs.id) FILTER (WHERE rs.is_completed = true), 0) DESC,
        COALESCE(COUNT(DISTINCT DATE(rs.completed_at)) FILTER (WHERE rs.is_completed = true), 0) DESC,
        p.created_at ASC
    )::bigint as rank
  FROM public.profiles p
  LEFT JOIN public.reading_schedule rs ON p.user_id = rs.user_id
  GROUP BY p.user_id, p.full_name, p.avatar_url, p.created_at;
END;
$$;