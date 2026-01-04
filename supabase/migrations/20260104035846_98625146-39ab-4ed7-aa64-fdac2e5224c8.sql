-- Drop the insecure view and recreate as a security invoker function
DROP VIEW IF EXISTS public.user_rankings;

-- Create a function that respects RLS (SECURITY INVOKER is default)
CREATE OR REPLACE FUNCTION public.get_user_rankings()
RETURNS TABLE (
  user_id UUID,
  full_name TEXT,
  chapters_read BIGINT,
  total_reading_time NUMERIC,
  active_days BIGINT,
  last_activity TIMESTAMP WITH TIME ZONE,
  rank BIGINT
)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT 
    rp.user_id,
    p.full_name,
    COUNT(DISTINCT rp.id) as chapters_read,
    COALESCE(SUM(rp.reading_time_minutes), 0) as total_reading_time,
    COUNT(DISTINCT DATE(rp.completed_at)) as active_days,
    MAX(rp.completed_at) as last_activity,
    ROW_NUMBER() OVER (ORDER BY COUNT(DISTINCT rp.id) DESC, COALESCE(SUM(rp.reading_time_minutes), 0) DESC) as rank
  FROM public.reading_progress rp
  LEFT JOIN public.profiles p ON rp.user_id = p.user_id
  GROUP BY rp.user_id, p.full_name;
$$;