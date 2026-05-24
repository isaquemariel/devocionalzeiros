
-- =====================================================
-- COMMUNITY MODULE TABLES
-- =====================================================

CREATE TABLE public.community_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  post_type TEXT NOT NULL CHECK (post_type IN ('prayer', 'thanks')),
  content TEXT NOT NULL CHECK (length(trim(content)) > 0 AND length(content) <= 2000),
  is_answered BOOLEAN NOT NULL DEFAULT false,
  answered_at TIMESTAMP WITH TIME ZONE,
  reply_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_community_posts_type_created ON public.community_posts(post_type, created_at DESC);
CREATE INDEX idx_community_posts_user ON public.community_posts(user_id);

ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view posts"
  ON public.community_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own posts"
  ON public.community_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts"
  ON public.community_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts"
  ON public.community_posts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TRIGGER trg_community_posts_updated_at
  BEFORE UPDATE ON public.community_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
CREATE TABLE public.community_replies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  content TEXT NOT NULL CHECK (length(trim(content)) > 0 AND length(content) <= 1000),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_community_replies_post ON public.community_replies(post_id, created_at);
CREATE INDEX idx_community_replies_user ON public.community_replies(user_id);

ALTER TABLE public.community_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view replies"
  ON public.community_replies FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own replies"
  ON public.community_replies FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own replies"
  ON public.community_replies FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own replies"
  ON public.community_replies FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TRIGGER trg_community_replies_updated_at
  BEFORE UPDATE ON public.community_replies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Maintain reply_count on parent post
CREATE OR REPLACE FUNCTION public.community_reply_count_trg()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE community_posts SET reply_count = reply_count + 1 WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE community_posts SET reply_count = GREATEST(reply_count - 1, 0) WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

CREATE TRIGGER trg_community_replies_count
  AFTER INSERT OR DELETE ON public.community_replies
  FOR EACH ROW EXECUTE FUNCTION public.community_reply_count_trg();

-- =====================================================
-- Realtime
-- =====================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_replies;

-- =====================================================
-- Update daily usage limits to include community keys
-- =====================================================
CREATE OR REPLACE FUNCTION public.increment_daily_usage(p_feature_key text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_user_id uuid;
  v_today date;
  v_current_count integer;
  v_plan text;
  v_email text;
  v_limit integer;
  v_limits jsonb;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  v_today := (now() AT TIME ZONE 'America/Sao_Paulo')::date;

  SELECT email INTO v_email FROM auth.users WHERE id = v_user_id;
  IF lower(v_email) = 'devocionalzeiros@gmail.com' THEN
    v_plan := 'admin';
  ELSE
    SELECT
      CASE
        WHEN ap.plan_type IS NULL THEN 'free'
        WHEN ap.plan_type IN ('gratuito','free','none') THEN 'free'
        WHEN ap.plan_type = 'start' AND COALESCE(ap.amount_paid,0) = 0 THEN 'free'
        WHEN ap.plan_type = 'start' AND COALESCE(ap.amount_paid,0) > 0 THEN 'gold'
        ELSE ap.plan_type
      END INTO v_plan
    FROM authorized_purchases ap
    WHERE lower(ap.email) = lower(v_email)
    ORDER BY ap.updated_at DESC
    LIMIT 1;
    v_plan := COALESCE(v_plan, 'free');
  END IF;

  v_limits := CASE v_plan
    WHEN 'admin' THEN '{}'::jsonb
    WHEN 'embaixador' THEN '{}'::jsonb
    WHEN 'premium' THEN '{}'::jsonb
    WHEN 'gold' THEN jsonb_build_object(
      'rpg_quiz',10,'rpg_verse_explanation',10,'quiz_free_choice',5,'quiz_random',5,
      'sermon',5,'chat_question',5,'reading_chapter_explanation',10,'reading_verse_explanation',10,
      'study_bible_verse_explanation',10,'study_bible_quiz',5,'custom_plan',-1,
      'community_post_prayer',-1,'community_post_thanks',-1,'community_reply',-1
    )
    ELSE jsonb_build_object(
      'rpg_quiz',2,'rpg_verse_explanation',2,'quiz_free_choice',1,'quiz_random',1,
      'sermon',0,'chat_question',0,'reading_chapter_explanation',4,'reading_verse_explanation',0,
      'study_bible_verse_explanation',2,'study_bible_quiz',1,'custom_plan',0,
      'community_post_prayer',1,'community_post_thanks',1,'community_reply',3
    )
  END;

  IF v_plan IN ('admin','embaixador','premium') THEN
    v_limit := -1;
  ELSE
    v_limit := COALESCE((v_limits ->> p_feature_key)::int, 0);
  END IF;

  IF v_limit = 0 THEN
    RAISE EXCEPTION 'Feature blocked for plan %', v_plan USING ERRCODE = 'P0001';
  END IF;

  IF v_limit > 0 THEN
    SELECT usage_count INTO v_current_count
    FROM daily_usage_limits
    WHERE user_id = v_user_id AND feature_key = p_feature_key AND usage_date = v_today;
    IF COALESCE(v_current_count, 0) >= v_limit THEN
      RAISE EXCEPTION 'Daily limit reached for %', p_feature_key USING ERRCODE = 'P0001';
    END IF;
  END IF;

  INSERT INTO daily_usage_limits (user_id, feature_key, usage_date, usage_count, last_used_at)
  VALUES (v_user_id, p_feature_key, v_today, 1, now())
  ON CONFLICT (user_id, feature_key, usage_date)
  DO UPDATE SET
    usage_count = daily_usage_limits.usage_count + 1,
    last_used_at = now()
  RETURNING usage_count INTO v_current_count;

  RETURN jsonb_build_object('usage_count', v_current_count, 'limit', v_limit, 'plan', v_plan);
END;
$function$;

-- =====================================================
-- Update get_my_points to include community points
-- =====================================================
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

  -- Community: 5 pts per thanks post + 5 pts per answered prayer (own)
  SELECT
    COALESCE((SELECT COUNT(*) * 5 FROM community_posts cp
      WHERE cp.user_id = v_user_id AND cp.post_type = 'thanks'
        AND cp.created_at >= current_month_start AND cp.created_at < current_month_end + interval '1 day'), 0)
    +
    COALESCE((SELECT COUNT(*) * 5 FROM community_posts cp
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
      COALESCE((SELECT COUNT(*) * 5 FROM community_posts cp WHERE cp.user_id = p.user_id AND cp.post_type = 'thanks' AND cp.created_at >= current_month_start AND cp.created_at < current_month_end + interval '1 day'), 0) +
      COALESCE((SELECT COUNT(*) * 5 FROM community_posts cp WHERE cp.user_id = p.user_id AND cp.is_answered = true AND cp.answered_at >= current_month_start AND cp.answered_at < current_month_end + interval '1 day'), 0)
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

-- =====================================================
-- Update get_user_rankings to include community points
-- =====================================================
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
        SUM(CASE WHEN cp.post_type = 'thanks' AND cp.created_at >= current_month_start AND cp.created_at < current_month_end + interval '1 day' THEN 5 ELSE 0 END)
        + SUM(CASE WHEN cp.is_answered = true AND cp.answered_at >= current_month_start AND cp.answered_at < current_month_end + interval '1 day' THEN 5 ELSE 0 END)
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
