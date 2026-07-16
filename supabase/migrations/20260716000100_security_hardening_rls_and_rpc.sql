-- Security hardening batch (MEDIUM findings M1, M4, M7).

-- ---------------------------------------------------------------------------
-- M1: daily_usage_limits — remove client INSERT/UPDATE policies.
-- The paywall/quota is enforced server-side by increment_daily_usage() (a
-- SECURITY DEFINER function that bypasses RLS). With direct client INSERT/UPDATE
-- policies, a user could `UPDATE daily_usage_limits SET usage_count = 0` on their
-- own row and consume paid AI features without limit. Only the definer function
-- should mutate this table; users keep SELECT to read their remaining quota.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can insert own usage" ON public.daily_usage_limits;
DROP POLICY IF EXISTS "Users can update own usage" ON public.daily_usage_limits;

-- ---------------------------------------------------------------------------
-- M4: get_community_profiles — stop arbitrary user enumeration.
-- The old definition returned full_name/avatar_url for ANY array of user_ids,
-- letting an authenticated user harvest names/avatars for arbitrary accounts.
-- Restrict results to users who actually authored community content (posts or
-- replies), which is the function's legitimate use.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_community_profiles(p_user_ids uuid[])
RETURNS TABLE(user_id uuid, full_name text, avatar_url text)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.user_id, p.full_name, p.avatar_url
  FROM public.profiles p
  WHERE p.user_id = ANY(p_user_ids)
    AND (
      EXISTS (SELECT 1 FROM public.community_posts cp WHERE cp.user_id = p.user_id)
      OR EXISTS (SELECT 1 FROM public.community_replies cr WHERE cr.user_id = p.user_id)
    );
$$;

GRANT EXECUTE ON FUNCTION public.get_community_profiles(uuid[]) TO authenticated;

-- ---------------------------------------------------------------------------
-- M7: admin_get_referral_metrics — add the missing admin guard.
-- Every other admin_* function enforces has_role(auth.uid(),'admin'); this one
-- was SECURITY DEFINER with default PUBLIC execute and no check, exposing
-- acquisition-channel metrics to any caller. Rewrite in plpgsql with the guard.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_get_referral_metrics()
RETURNS TABLE(
  referral_source text,
  user_count bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Not authorized' USING ERRCODE = '42501';
  END IF;

  RETURN QUERY
  SELECT
    COALESCE(p.referral_source, 'não informado') AS referral_source,
    COUNT(*) AS user_count
  FROM profiles p
  INNER JOIN auth.users u ON p.user_id = u.id
  LEFT JOIN authorized_purchases ap ON LOWER(u.email) = LOWER(ap.email) AND ap.status = 'active'
  WHERE ap.status IS NULL OR ap.status = 'active'
  GROUP BY COALESCE(p.referral_source, 'não informado')
  ORDER BY user_count DESC;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_get_referral_metrics() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_get_referral_metrics() TO authenticated;
