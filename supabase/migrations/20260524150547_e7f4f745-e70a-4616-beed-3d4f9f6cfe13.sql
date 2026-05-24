CREATE OR REPLACE FUNCTION public.get_community_profiles(p_user_ids uuid[])
RETURNS TABLE(user_id uuid, full_name text, avatar_url text)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.user_id, p.full_name, p.avatar_url
  FROM public.profiles p
  WHERE p.user_id = ANY(p_user_ids);
$$;

GRANT EXECUTE ON FUNCTION public.get_community_profiles(uuid[]) TO authenticated;