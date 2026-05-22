
-- 1. rotina_google_calendar: add owner-scoped policies
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='rotina_google_calendar') THEN
    EXECUTE 'ALTER TABLE public.rotina_google_calendar ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "Users manage own google calendar" ON public.rotina_google_calendar';
    EXECUTE 'CREATE POLICY "Users select own google calendar" ON public.rotina_google_calendar FOR SELECT TO authenticated USING (auth.uid() = user_id)';
    EXECUTE 'CREATE POLICY "Users insert own google calendar" ON public.rotina_google_calendar FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id)';
    EXECUTE 'CREATE POLICY "Users update own google calendar" ON public.rotina_google_calendar FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id)';
    EXECUTE 'CREATE POLICY "Users delete own google calendar" ON public.rotina_google_calendar FOR DELETE TO authenticated USING (auth.uid() = user_id)';
  END IF;
END $$;

-- 2. quiz_attempts: cap points_earned
CREATE OR REPLACE FUNCTION public.validate_quiz_attempt()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.points_earned IS NULL OR NEW.points_earned < 0 OR NEW.points_earned > 100 THEN
    RAISE EXCEPTION 'Invalid points_earned: must be between 0 and 100';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_quiz_attempt_trg ON public.quiz_attempts;
CREATE TRIGGER validate_quiz_attempt_trg
  BEFORE INSERT OR UPDATE ON public.quiz_attempts
  FOR EACH ROW EXECUTE FUNCTION public.validate_quiz_attempt();

-- 3. plan_completions: cap bonus_points at 10
CREATE OR REPLACE FUNCTION public.validate_plan_completion()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.bonus_points IS NULL OR NEW.bonus_points < 0 OR NEW.bonus_points > 10 THEN
    RAISE EXCEPTION 'Invalid bonus_points: must be between 0 and 10';
  END IF;
  RETURN NEW;
END;
$$;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='plan_completions') THEN
    EXECUTE 'DROP TRIGGER IF EXISTS validate_plan_completion_trg ON public.plan_completions';
    EXECUTE 'CREATE TRIGGER validate_plan_completion_trg BEFORE INSERT OR UPDATE ON public.plan_completions FOR EACH ROW EXECUTE FUNCTION public.validate_plan_completion()';
  END IF;
END $$;

-- 4. Server-side enforcement of daily AI usage limits
CREATE OR REPLACE FUNCTION public.increment_daily_usage(p_feature_key text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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

  -- Resolve plan
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

  -- Plan limit map (mirrors src/hooks/useUsageLimits.ts). -1 = unlimited.
  v_limits := CASE v_plan
    WHEN 'admin' THEN '{}'::jsonb
    WHEN 'embaixador' THEN '{}'::jsonb
    WHEN 'premium' THEN '{}'::jsonb
    WHEN 'gold' THEN jsonb_build_object(
      'rpg_quiz',10,'rpg_verse_explanation',10,'quiz_free_choice',5,'quiz_random',5,
      'sermon',5,'chat_question',5,'reading_chapter_explanation',10,'reading_verse_explanation',10,
      'study_bible_verse_explanation',10,'study_bible_quiz',5,'custom_plan',-1
    )
    ELSE jsonb_build_object(
      'rpg_quiz',2,'rpg_verse_explanation',2,'quiz_free_choice',1,'quiz_random',1,
      'sermon',0,'chat_question',0,'reading_chapter_explanation',4,'reading_verse_explanation',0,
      'study_bible_verse_explanation',2,'study_bible_quiz',1,'custom_plan',0
    )
  END;

  IF v_plan IN ('admin','embaixador','premium') THEN
    v_limit := -1;
  ELSE
    v_limit := COALESCE((v_limits ->> p_feature_key)::int, 0);
  END IF;

  -- Enforce limit (0 = blocked, -1 = unlimited)
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
$$;
