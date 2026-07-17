-- Community anti-farming (applied live via Lovable).
--
-- C-F1: the daily post/reply limit was client-only and bypassable by a direct
-- table insert (each "thanks"/answered prayer is worth ranking points). Enforce
-- it server-side by counting the user's ACTUAL rows created today (Brasília).
-- Free tier: 1 prayer/day, 1 thanks/day, 3 replies/day. Paid/admin: unlimited.
-- Row-counting (not counter-based) so it is compatible with the client's usage
-- increment and can never double-count or block the first legit post.
CREATE OR REPLACE FUNCTION public.enforce_community_post_limit()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE v_email text; v_plan text; v_count int; v_today date;
BEGIN
  v_today := (now() AT TIME ZONE 'America/Sao_Paulo')::date;
  SELECT email INTO v_email FROM auth.users WHERE id = NEW.user_id;
  IF lower(coalesce(v_email,'')) = 'devocionalzeiros@gmail.com' THEN RETURN NEW; END IF;
  SELECT CASE
      WHEN ap.plan_type IS NULL THEN 'free'
      WHEN ap.plan_type IN ('gratuito','free','none') THEN 'free'
      WHEN ap.plan_type = 'start' AND COALESCE(ap.amount_paid,0) = 0 THEN 'free'
      ELSE 'paid' END INTO v_plan
    FROM authorized_purchases ap
    WHERE lower(ap.email) = lower(v_email) AND ap.status = 'active'
    ORDER BY ap.updated_at DESC LIMIT 1;
  IF COALESCE(v_plan,'free') <> 'free' THEN RETURN NEW; END IF;
  SELECT count(*) INTO v_count FROM community_posts
    WHERE user_id = NEW.user_id AND post_type = NEW.post_type
      AND (created_at AT TIME ZONE 'America/Sao_Paulo')::date = v_today;
  IF v_count >= 1 THEN
    RAISE EXCEPTION 'Daily limit reached for community_post_%', NEW.post_type USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS trg_community_posts_limit ON public.community_posts;
CREATE TRIGGER trg_community_posts_limit BEFORE INSERT ON public.community_posts
  FOR EACH ROW EXECUTE FUNCTION public.enforce_community_post_limit();

CREATE OR REPLACE FUNCTION public.enforce_community_reply_limit()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE v_email text; v_plan text; v_count int; v_today date;
BEGIN
  v_today := (now() AT TIME ZONE 'America/Sao_Paulo')::date;
  SELECT email INTO v_email FROM auth.users WHERE id = NEW.user_id;
  IF lower(coalesce(v_email,'')) = 'devocionalzeiros@gmail.com' THEN RETURN NEW; END IF;
  SELECT CASE
      WHEN ap.plan_type IS NULL THEN 'free'
      WHEN ap.plan_type IN ('gratuito','free','none') THEN 'free'
      WHEN ap.plan_type = 'start' AND COALESCE(ap.amount_paid,0) = 0 THEN 'free'
      ELSE 'paid' END INTO v_plan
    FROM authorized_purchases ap
    WHERE lower(ap.email) = lower(v_email) AND ap.status = 'active'
    ORDER BY ap.updated_at DESC LIMIT 1;
  IF COALESCE(v_plan,'free') <> 'free' THEN RETURN NEW; END IF;
  SELECT count(*) INTO v_count FROM community_replies
    WHERE user_id = NEW.user_id
      AND (created_at AT TIME ZONE 'America/Sao_Paulo')::date = v_today;
  IF v_count >= 3 THEN
    RAISE EXCEPTION 'Daily limit reached for community_reply' USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS trg_community_replies_limit ON public.community_replies;
CREATE TRIGGER trg_community_replies_limit BEFORE INSERT ON public.community_replies
  FOR EACH ROW EXECUTE FUNCTION public.enforce_community_reply_limit();

-- C-F2: clients could UPDATE arbitrary columns on their own posts (post_type,
-- reply_count) to farm ranking points. Restrict client UPDATE to the columns the
-- app legitimately edits. The SECURITY DEFINER reply-count trigger runs as owner
-- and is unaffected; RLS (auth.uid()=user_id) still applies.
REVOKE UPDATE ON public.community_posts FROM authenticated;
GRANT UPDATE (content, is_answered, answered_at, updated_at) ON public.community_posts TO authenticated;
