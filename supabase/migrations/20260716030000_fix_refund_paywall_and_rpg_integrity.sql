-- Production bug fixes (applied live via Lovable).
--
-- P1 (CRITICAL money leak): increment_daily_usage (the server-side paywall) read
-- the plan without filtering status, so refunded/canceled purchases (status
-- 'inactive', plan_type left unchanged) still granted full paid AI access. Add
-- AND ap.status='active' so inactive purchases fall through to the free tier.
CREATE OR REPLACE FUNCTION public.increment_daily_usage(p_feature_key text)
 RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  v_user_id uuid; v_today date; v_current_count integer;
  v_plan text; v_email text; v_limit integer; v_limits jsonb;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;
  v_today := (now() AT TIME ZONE 'America/Sao_Paulo')::date;
  SELECT email INTO v_email FROM auth.users WHERE id = v_user_id;
  IF lower(v_email) = 'devocionalzeiros@gmail.com' THEN
    v_plan := 'admin';
  ELSE
    SELECT CASE
        WHEN ap.plan_type IS NULL THEN 'free'
        WHEN ap.plan_type IN ('gratuito','free','none') THEN 'free'
        WHEN ap.plan_type = 'start' AND COALESCE(ap.amount_paid,0) = 0 THEN 'free'
        WHEN ap.plan_type = 'start' AND COALESCE(ap.amount_paid,0) > 0 THEN 'gold'
        ELSE ap.plan_type END INTO v_plan
    FROM authorized_purchases ap
    WHERE lower(ap.email) = lower(v_email) AND ap.status = 'active'
    ORDER BY ap.updated_at DESC LIMIT 1;
    v_plan := COALESCE(v_plan, 'free');
  END IF;
  v_limits := CASE v_plan
    WHEN 'admin' THEN '{}'::jsonb WHEN 'embaixador' THEN '{}'::jsonb WHEN 'premium' THEN '{}'::jsonb
    WHEN 'gold' THEN jsonb_build_object(
      'rpg_quiz',10,'rpg_verse_explanation',10,'quiz_free_choice',5,'quiz_random',5,
      'sermon',5,'chat_question',5,'reading_chapter_explanation',10,'reading_verse_explanation',10,
      'study_bible_verse_explanation',10,'study_bible_quiz',5,'custom_plan',-1,'rpg_book_summary',20,
      'community_post_prayer',-1,'community_post_thanks',-1,'community_reply',-1)
    ELSE jsonb_build_object(
      'rpg_quiz',2,'rpg_verse_explanation',2,'quiz_free_choice',1,'quiz_random',1,
      'sermon',0,'chat_question',0,'reading_chapter_explanation',4,'reading_verse_explanation',0,
      'study_bible_verse_explanation',2,'study_bible_quiz',1,'custom_plan',0,'rpg_book_summary',5,
      'community_post_prayer',1,'community_post_thanks',1,'community_reply',3) END;
  IF v_plan IN ('admin','embaixador','premium') THEN v_limit := -1;
  ELSE v_limit := COALESCE((v_limits ->> p_feature_key)::int, 0); END IF;
  IF v_limit = 0 THEN RAISE EXCEPTION 'Feature blocked for plan %', v_plan USING ERRCODE = 'P0001'; END IF;
  IF v_limit > 0 THEN
    SELECT usage_count INTO v_current_count FROM daily_usage_limits
    WHERE user_id = v_user_id AND feature_key = p_feature_key AND usage_date = v_today;
    IF COALESCE(v_current_count, 0) >= v_limit THEN
      RAISE EXCEPTION 'Daily limit reached for %', p_feature_key USING ERRCODE = 'P0001'; END IF;
  END IF;
  INSERT INTO daily_usage_limits (user_id, feature_key, usage_date, usage_count, last_used_at)
  VALUES (v_user_id, p_feature_key, v_today, 1, now())
  ON CONFLICT (user_id, feature_key, usage_date)
  DO UPDATE SET usage_count = daily_usage_limits.usage_count + 1, last_used_at = now()
  RETURNING usage_count INTO v_current_count;
  RETURN jsonb_build_object('usage_count', v_current_count, 'limit', v_limit, 'plan', v_plan);
END;
$function$;

-- Q1 (ranking integrity): rpg_progress is client-upserted with no validation, so
-- quiz_correct could be forged (rpg_points = 10 + quiz_correct*5) to top the
-- ranking. RPG quizzes have exactly 2 questions; clamp both fields.
CREATE OR REPLACE FUNCTION public.enforce_rpg_progress_bounds()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  NEW.quiz_total := GREATEST(0, LEAST(COALESCE(NEW.quiz_total, 0), 2));
  NEW.quiz_correct := GREATEST(0, LEAST(COALESCE(NEW.quiz_correct, 0), NEW.quiz_total));
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS enforce_rpg_progress_bounds_trg ON public.rpg_progress;
CREATE TRIGGER enforce_rpg_progress_bounds_trg
  BEFORE INSERT OR UPDATE ON public.rpg_progress
  FOR EACH ROW EXECUTE FUNCTION public.enforce_rpg_progress_bounds();
