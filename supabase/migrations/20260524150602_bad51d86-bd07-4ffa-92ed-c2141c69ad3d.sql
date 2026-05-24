REVOKE EXECUTE ON FUNCTION public.get_community_profiles(uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_community_profiles(uuid[]) TO authenticated;