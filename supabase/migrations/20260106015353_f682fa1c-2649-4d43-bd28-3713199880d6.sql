-- Drop and recreate the function to include all users, even those without reading progress
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
    COALESCE(COUNT(DISTINCT rp.id), 0)::bigint as chapters_read,
    COALESCE(SUM(rp.reading_time_minutes), 0)::bigint as total_reading_time,
    COALESCE(COUNT(DISTINCT DATE(rp.completed_at)), 0)::bigint as active_days,
    ROW_NUMBER() OVER (
      ORDER BY 
        COALESCE(COUNT(DISTINCT rp.id), 0) DESC, 
        COALESCE(SUM(rp.reading_time_minutes), 0) DESC,
        p.created_at ASC
    )::bigint as rank
  FROM public.profiles p
  LEFT JOIN public.reading_progress rp ON p.user_id = rp.user_id
  GROUP BY p.user_id, p.full_name, p.avatar_url, p.created_at;
END;
$$;