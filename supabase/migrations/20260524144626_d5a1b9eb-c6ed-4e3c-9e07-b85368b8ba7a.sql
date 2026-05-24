
-- 1) Linked prayer in thanks posts
ALTER TABLE public.community_posts
  ADD COLUMN IF NOT EXISTS linked_prayer_id uuid REFERENCES public.community_posts(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_community_posts_linked_prayer ON public.community_posts(linked_prayer_id);

-- 2) Community bans table
CREATE TABLE IF NOT EXISTS public.community_bans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  banned_until timestamptz NOT NULL,
  reason text NOT NULL,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_community_bans_user_active ON public.community_bans(user_id, banned_until);

ALTER TABLE public.community_bans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users see own bans" ON public.community_bans;
CREATE POLICY "Users see own bans" ON public.community_bans
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));

DROP POLICY IF EXISTS "Admins manage bans" ON public.community_bans;
CREATE POLICY "Admins manage bans" ON public.community_bans
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin'));

-- 3) Moderation actions (notices to users)
CREATE TABLE IF NOT EXISTS public.community_moderation_notices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  reason text NOT NULL,
  action text NOT NULL, -- 'post_deleted', 'reply_deleted', 'banned'
  acknowledged boolean NOT NULL DEFAULT false,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_community_notices_user ON public.community_moderation_notices(user_id, acknowledged);

ALTER TABLE public.community_moderation_notices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users see own notices" ON public.community_moderation_notices;
CREATE POLICY "Users see own notices" ON public.community_moderation_notices
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));

DROP POLICY IF EXISTS "Users ack own notices" ON public.community_moderation_notices;
CREATE POLICY "Users ack own notices" ON public.community_moderation_notices
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins manage notices" ON public.community_moderation_notices;
CREATE POLICY "Admins manage notices" ON public.community_moderation_notices
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin'));

-- 4) Profanity / sexual content filter trigger
CREATE OR REPLACE FUNCTION public.community_content_filter()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  blocked_pattern text := '\m(porra|caralho|merda|foda-?se|fdp|puta|puto|cuzao|cuz[aã]o|viado|vi[aá]do|arrombad[oa]|otari[oa]|imbecil|idiota|retardad[oa]|buceta|piroca|pinto|pau\s*duro|gozar|gozad[ao]|tes[aã]o|punheta|siririca|sexo|nudes?|pornografia|porn[oô]|xvideos|cunete|chupar|chupad[ao]|tarad[ao]|safad[ao]|gostosa|gostoso|peit[ãa]o|bunduda|fetiche|orgia|masturba|tran(s|sar|sou|sando))\M';
  banned boolean;
BEGIN
  -- Block if user has an active ban
  SELECT EXISTS(
    SELECT 1 FROM public.community_bans
    WHERE user_id = NEW.user_id AND banned_until > now()
  ) INTO banned;
  IF banned THEN
    RAISE EXCEPTION 'Você está temporariamente impedido de postar na comunidade.' USING ERRCODE='P0001';
  END IF;

  -- Content filter (case insensitive)
  IF NEW.content ~* blocked_pattern THEN
    RAISE EXCEPTION 'Conteúdo bloqueado pelas regras da comunidade (linguagem ofensiva ou inadequada).' USING ERRCODE='P0001';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_community_posts_filter ON public.community_posts;
CREATE TRIGGER trg_community_posts_filter
  BEFORE INSERT OR UPDATE OF content ON public.community_posts
  FOR EACH ROW EXECUTE FUNCTION public.community_content_filter();

DROP TRIGGER IF EXISTS trg_community_replies_filter ON public.community_replies;
CREATE TRIGGER trg_community_replies_filter
  BEFORE INSERT OR UPDATE OF content ON public.community_replies
  FOR EACH ROW EXECUTE FUNCTION public.community_content_filter();

-- 5) Admin moderation RPC
CREATE OR REPLACE FUNCTION public.admin_delete_community_post(p_post_id uuid, p_reason text, p_ban_hours int DEFAULT 0)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_owner uuid;
BEGIN
  IF NOT public.has_role(auth.uid(),'admin') THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE='42501';
  END IF;
  SELECT user_id INTO v_owner FROM community_posts WHERE id = p_post_id;
  IF v_owner IS NULL THEN RETURN; END IF;

  DELETE FROM community_posts WHERE id = p_post_id;

  INSERT INTO community_moderation_notices(user_id, reason, action, created_by)
  VALUES (v_owner, p_reason, 'post_deleted', auth.uid());

  IF p_ban_hours > 0 THEN
    INSERT INTO community_bans(user_id, banned_until, reason, created_by)
    VALUES (v_owner, now() + (p_ban_hours || ' hours')::interval, p_reason, auth.uid());
    INSERT INTO community_moderation_notices(user_id, reason, action, created_by)
    VALUES (v_owner, p_reason || ' (bloqueio de ' || p_ban_hours || 'h)', 'banned', auth.uid());
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_delete_community_reply(p_reply_id uuid, p_reason text, p_ban_hours int DEFAULT 0)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_owner uuid;
BEGIN
  IF NOT public.has_role(auth.uid(),'admin') THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE='42501';
  END IF;
  SELECT user_id INTO v_owner FROM community_replies WHERE id = p_reply_id;
  IF v_owner IS NULL THEN RETURN; END IF;

  DELETE FROM community_replies WHERE id = p_reply_id;

  INSERT INTO community_moderation_notices(user_id, reason, action, created_by)
  VALUES (v_owner, p_reason, 'reply_deleted', auth.uid());

  IF p_ban_hours > 0 THEN
    INSERT INTO community_bans(user_id, banned_until, reason, created_by)
    VALUES (v_owner, now() + (p_ban_hours || ' hours')::interval, p_reason, auth.uid());
    INSERT INTO community_moderation_notices(user_id, reason, action, created_by)
    VALUES (v_owner, p_reason || ' (bloqueio de ' || p_ban_hours || 'h)', 'banned', auth.uid());
  END IF;
END;
$$;

-- 6) Update ranking and points functions: 5 -> 1
CREATE OR REPLACE FUNCTION public.get_my_points()
 RETURNS TABLE(chapters_read bigint, quiz_points bigint, devotional_points bigint, achievement_points bigint, rpg_points bigint, active_days bigint, total_points bigint, rank bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_user_id uuid;
  current_month_start date;
  current_month_end date;
  v_schedule_pts bigint;
  v_progress_pts bigint;
  v_quiz_pts bigint;
  v_dev_pts bigint;
  v_ach_pts bigint;
  v_rpg_pts bigint;
  v_community_pts bigint;
  v_active_days bigint;
  v_total bigint;
  v_rank bigint;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN RETURN; END IF;

  current_month_start := date_trunc('month', (now() AT TIME ZONE 'America/Sao_Paulo'))::date;
  current_month_end := (date_trunc('month', (now() AT TIME ZONE 'America/Sao_Paulo')) + interval '1 month' - interval '1 day')::date;

  SELECT COUNT(*) INTO v_schedule_pts FROM reading_schedule rs
  WHERE rs.user_id = v_user_id AND rs.is_completed = true
    AND rs.completed_at >= current_month_start AND rs.completed_at < current_month_end + interval '1 day';

  SELECT COUNT(DISTINCT (book_name, chapter_number)) INTO v_progress_pts FROM reading_progress rp
  WHERE rp.user_id = v_user_id
    AND rp.completed_at >= current_month_start AND rp.completed_at < current_month_end + interval '1 day';

  SELECT COALESCE(SUM(points_earned), 0) INTO v_quiz_pts FROM quiz_attempts qa
  WHERE qa.user_id = v_user_id AND qa.quiz_date >= current_month_start AND qa.quiz_date <= current_month_end;

  SELECT COUNT(DISTINCT devotional_date) INTO v_dev_pts FROM devotional_completions dc
  WHERE dc.user_id = v_user_id AND dc.devotional_date >= current_month_start AND dc.devotional_date <= current_month_end;

  SELECT COALESCE(SUM(points_awarded), 0) INTO v_ach_pts FROM achievement_claims ac
  WHERE ac.user_id = v_user_id AND ac.claimed_at >= current_month_start AND ac.claimed_at < current_month_end + interval '1 day';

  SELECT COALESCE(SUM(10 + quiz_correct * 5), 0) INTO v_rpg_pts FROM rpg_progress rp
  WHERE rp.user_id = v_user_id AND rp.is_completed = true
    AND rp.completed_at >= current_month_start AND rp.completed_at < current_month_end + interval '1 day';

  SELECT
    COALESCE((SELECT COUNT(*) FROM community_posts cp
      WHERE cp.user_id = v_user_id AND cp.post_type = 'thanks'
        AND cp.created_at >= current_month_start AND cp.created_at < current_month_end + interval '1 day'), 0)
    +
    COALESCE((SELECT COUNT(*) FROM community_posts cp
      WHERE cp.user_id = v_user_id AND cp.is_answered = true
        AND cp.answered_at >= current_month_start AND cp.answered_at < current_month_end + interval '1 day'), 0)
  INTO v_community_pts;

  SELECT COUNT(DISTINCT login_date) INTO v_active_days FROM daily_logins dl WHERE dl.user_id = v_user_id;

  v_total := COALESCE(v_schedule_pts,0) + COALESCE(v_progress_pts,0) + COALESCE(v_quiz_pts,0)
           + COALESCE(v_dev_pts,0) + COALESCE(v_ach_pts,0) + COALESCE(v_rpg_pts,0) + COALESCE(v_community_pts,0);

  SELECT COUNT(*) + 1 INTO v_rank
  FROM (
    SELECT p.user_id,
      COALESCE((SELECT COUNT(*) FROM reading_schedule rs WHERE rs.user_id = p.user_id AND rs.is_completed = true AND rs.completed_at >= current_month_start AND rs.completed_at < current_month_end + interval '1 day'), 0) +
      COALESCE((SELECT COUNT(DISTINCT (rp.book_name, rp.chapter_number)) FROM reading_progress rp WHERE rp.user_id = p.user_id AND rp.completed_at >= current_month_start AND rp.completed_at < current_month_end + interval '1 day'), 0) +
      COALESCE((SELECT SUM(qa.points_earned) FROM quiz_attempts qa WHERE qa.user_id = p.user_id AND qa.quiz_date >= current_month_start AND qa.quiz_date <= current_month_end), 0) +
      COALESCE((SELECT COUNT(DISTINCT dc.devotional_date) FROM devotional_completions dc WHERE dc.user_id = p.user_id AND dc.devotional_date >= current_month_start AND dc.devotional_date <= current_month_end), 0) +
      COALESCE((SELECT SUM(ac.points_awarded) FROM achievement_claims ac WHERE ac.user_id = p.user_id AND ac.claimed_at >= current_month_start AND ac.claimed_at < current_month_end + interval '1 day'), 0) +
      COALESCE((SELECT SUM(10 + rp2.quiz_correct * 5) FROM rpg_progress rp2 WHERE rp2.user_id = p.user_id AND rp2.is_completed = true AND rp2.completed_at >= current_month_start AND rp2.completed_at < current_month_end + interval '1 day'), 0) +
      COALESCE((SELECT COUNT(*) FROM community_posts cp WHERE cp.user_id = p.user_id AND cp.post_type = 'thanks' AND cp.created_at >= current_month_start AND cp.created_at < current_month_end + interval '1 day'), 0) +
      COALESCE((SELECT COUNT(*) FROM community_posts cp WHERE cp.user_id = p.user_id AND cp.is_answered = true AND cp.answered_at >= current_month_start AND cp.answered_at < current_month_end + interval '1 day'), 0)
      AS pts
    FROM profiles p
  ) ranked
  WHERE ranked.pts > v_total;

  RETURN QUERY SELECT
    (COALESCE(v_schedule_pts,0) + COALESCE(v_progress_pts,0))::bigint,
    COALESCE(v_quiz_pts,0)::bigint,
    COALESCE(v_dev_pts,0)::bigint,
    (COALESCE(v_ach_pts,0) + COALESCE(v_community_pts,0))::bigint,
    COALESCE(v_rpg_pts,0)::bigint,
    COALESCE(v_active_days,0)::bigint,
    v_total::bigint,
    COALESCE(v_rank,1)::bigint;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_user_rankings()
 RETURNS TABLE(user_id uuid, full_name text, avatar_url text, chapters_read bigint, quiz_points bigint, devotional_points bigint, rpg_points bigint, total_points bigint, active_days bigint, rank bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  current_month_start date;
  current_month_end date;
BEGIN
  current_month_start := date_trunc('month', (now() AT TIME ZONE 'America/Sao_Paulo'))::date;
  current_month_end := (date_trunc('month', (now() AT TIME ZONE 'America/Sao_Paulo')) + interval '1 month' - interval '1 day')::date;

  RETURN QUERY
  WITH user_stats AS (
    SELECT 
      p.user_id, p.full_name, p.avatar_url, p.show_in_rankings,
      COALESCE(schedule_pts.schedule_count, 0)::bigint AS schedule_points,
      COALESCE(progress_pts.progress_count, 0)::bigint AS progress_points,
      COALESCE(quiz_pts.quiz_total, 0)::bigint AS quiz_points,
      COALESCE(dev_pts.devotional_count, 0)::bigint AS devotional_points,
      COALESCE(achievement_pts.achievement_total, 0)::bigint AS achievement_points,
      COALESCE(rpg_pts.rpg_xp, 0)::bigint AS rpg_points,
      COALESCE(community_pts.community_total, 0)::bigint AS community_points,
      COALESCE(login_stats.login_count, 0)::bigint AS active_days
    FROM profiles p
    LEFT JOIN (SELECT rs.user_id, COUNT(*)::bigint AS schedule_count FROM reading_schedule rs
      WHERE rs.is_completed = true AND rs.completed_at >= current_month_start AND rs.completed_at < current_month_end + interval '1 day' GROUP BY rs.user_id) schedule_pts ON p.user_id = schedule_pts.user_id
    LEFT JOIN (SELECT rp.user_id, COUNT(DISTINCT (rp.book_name, rp.chapter_number))::bigint AS progress_count FROM reading_progress rp
      WHERE rp.completed_at >= current_month_start AND rp.completed_at < current_month_end + interval '1 day' GROUP BY rp.user_id) progress_pts ON p.user_id = progress_pts.user_id
    LEFT JOIN (SELECT qa.user_id, SUM(qa.points_earned)::bigint AS quiz_total FROM quiz_attempts qa
      WHERE qa.quiz_date >= current_month_start AND qa.quiz_date <= current_month_end GROUP BY qa.user_id) quiz_pts ON p.user_id = quiz_pts.user_id
    LEFT JOIN (SELECT dc.user_id, COUNT(DISTINCT dc.devotional_date)::bigint AS devotional_count FROM devotional_completions dc
      WHERE dc.devotional_date >= current_month_start AND dc.devotional_date <= current_month_end GROUP BY dc.user_id) dev_pts ON p.user_id = dev_pts.user_id
    LEFT JOIN (SELECT ac.user_id, SUM(ac.points_awarded)::bigint AS achievement_total FROM achievement_claims ac
      WHERE ac.claimed_at >= current_month_start AND ac.claimed_at < current_month_end + interval '1 day' GROUP BY ac.user_id) achievement_pts ON p.user_id = achievement_pts.user_id
    LEFT JOIN (SELECT rp.user_id, SUM(10 + rp.quiz_correct * 5)::bigint AS rpg_xp FROM rpg_progress rp
      WHERE rp.is_completed = true AND rp.completed_at >= current_month_start AND rp.completed_at < current_month_end + interval '1 day' GROUP BY rp.user_id) rpg_pts ON p.user_id = rpg_pts.user_id
    LEFT JOIN (
      SELECT cp.user_id, (
        SUM(CASE WHEN cp.post_type = 'thanks' AND cp.created_at >= current_month_start AND cp.created_at < current_month_end + interval '1 day' THEN 1 ELSE 0 END)
        + SUM(CASE WHEN cp.is_answered = true AND cp.answered_at >= current_month_start AND cp.answered_at < current_month_end + interval '1 day' THEN 1 ELSE 0 END)
      )::bigint AS community_total
      FROM community_posts cp GROUP BY cp.user_id
    ) community_pts ON p.user_id = community_pts.user_id
    LEFT JOIN (SELECT dl.user_id, COUNT(DISTINCT dl.login_date)::bigint AS login_count FROM daily_logins dl GROUP BY dl.user_id) login_stats ON p.user_id = login_stats.user_id
  )
  SELECT 
    us.user_id,
    CASE WHEN us.show_in_rankings = true THEN us.full_name ELSE 'Usuário Anônimo' END AS full_name,
    CASE WHEN us.show_in_rankings = true THEN us.avatar_url ELSE NULL END AS avatar_url,
    (us.schedule_points + us.progress_points)::bigint AS chapters_read,
    us.quiz_points,
    us.devotional_points,
    us.rpg_points,
    (us.schedule_points + us.progress_points + us.quiz_points + us.devotional_points + us.achievement_points + us.rpg_points + us.community_points)::bigint AS total_points,
    us.active_days,
    ROW_NUMBER() OVER (ORDER BY (us.schedule_points + us.progress_points + us.quiz_points + us.devotional_points + us.achievement_points + us.rpg_points + us.community_points) DESC, us.active_days DESC)::bigint AS rank
  FROM user_stats us
  WHERE (us.schedule_points + us.progress_points + us.quiz_points + us.devotional_points + us.achievement_points + us.rpg_points + us.community_points) > 0
  ORDER BY rank;
END;
$function$;
