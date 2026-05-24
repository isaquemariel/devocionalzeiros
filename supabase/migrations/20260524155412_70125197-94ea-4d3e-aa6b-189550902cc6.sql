
-- 1) plan_completions: force bonus_points = 10 server-side
CREATE OR REPLACE FUNCTION public.enforce_plan_completion_bonus()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  NEW.bonus_points := 10;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enforce_plan_completion_bonus_trg ON public.plan_completions;
CREATE TRIGGER enforce_plan_completion_bonus_trg
BEFORE INSERT OR UPDATE ON public.plan_completions
FOR EACH ROW EXECUTE FUNCTION public.enforce_plan_completion_bonus();

-- 2) quiz_attempts: cap points_earned server-side (max 8/question; 0 if not correct)
CREATE OR REPLACE FUNCTION public.enforce_quiz_attempt_points()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.is_correct IS NOT TRUE THEN
    NEW.points_earned := 0;
  ELSE
    NEW.points_earned := LEAST(GREATEST(COALESCE(NEW.points_earned, 0), 0), 8);
  END IF;
  IF NEW.streak_count IS NOT NULL THEN
    NEW.streak_count := LEAST(GREATEST(NEW.streak_count, 0), 200);
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enforce_quiz_attempt_points_trg ON public.quiz_attempts;
CREATE TRIGGER enforce_quiz_attempt_points_trg
BEFORE INSERT OR UPDATE ON public.quiz_attempts
FOR EACH ROW EXECUTE FUNCTION public.enforce_quiz_attempt_points();

-- 3) rpg_user_stats: recompute XP/level/stage from rpg_progress; ignore client values
CREATE OR REPLACE FUNCTION public.enforce_rpg_user_stats()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_xp integer;
  v_completed integer;
  v_max_streak integer := 365;
BEGIN
  SELECT COALESCE(SUM(10 + quiz_correct * 5), 0)::int,
         COALESCE(COUNT(*) FILTER (WHERE is_completed), 0)::int
    INTO v_xp, v_completed
  FROM public.rpg_progress
  WHERE user_id = NEW.user_id;

  NEW.total_xp := v_xp;
  NEW.current_level := GREATEST(1, (v_xp / 100) + 1);
  NEW.current_stage := GREATEST(1, v_completed + 1);

  IF TG_OP = 'INSERT' THEN
    NEW.streak_days := COALESCE(NEW.streak_days, 0);
    IF NEW.streak_days < 0 OR NEW.streak_days > v_max_streak THEN NEW.streak_days := 0; END IF;
  ELSE
    -- allow streak_days to change but clamp to a sane range
    IF NEW.streak_days IS NULL OR NEW.streak_days < 0 THEN NEW.streak_days := 0; END IF;
    IF NEW.streak_days > v_max_streak THEN NEW.streak_days := v_max_streak; END IF;
    -- only allow incrementing by 1 or resetting
    IF NEW.streak_days <> 0 AND NEW.streak_days > COALESCE(OLD.streak_days, 0) + 1 THEN
      NEW.streak_days := COALESCE(OLD.streak_days, 0) + 1;
    END IF;
  END IF;

  NEW.locked_until := NULL; -- never set lock from client
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enforce_rpg_user_stats_trg ON public.rpg_user_stats;
CREATE TRIGGER enforce_rpg_user_stats_trg
BEFORE INSERT OR UPDATE ON public.rpg_user_stats
FOR EACH ROW EXECUTE FUNCTION public.enforce_rpg_user_stats();

-- 4) authorized_purchases: explicit deny on client INSERT/UPDATE/DELETE; add email fallback SELECT
DROP POLICY IF EXISTS "Deny client inserts on authorized_purchases" ON public.authorized_purchases;
CREATE POLICY "Deny client inserts on authorized_purchases"
ON public.authorized_purchases FOR INSERT TO authenticated, anon
WITH CHECK (false);

DROP POLICY IF EXISTS "Deny client updates on authorized_purchases" ON public.authorized_purchases;
CREATE POLICY "Deny client updates on authorized_purchases"
ON public.authorized_purchases FOR UPDATE TO authenticated, anon
USING (false) WITH CHECK (false);

DROP POLICY IF EXISTS "Deny client deletes on authorized_purchases" ON public.authorized_purchases;
CREATE POLICY "Deny client deletes on authorized_purchases"
ON public.authorized_purchases FOR DELETE TO authenticated, anon
USING (false);

DROP POLICY IF EXISTS "Users can view their purchases by email" ON public.authorized_purchases;
CREATE POLICY "Users can view their purchases by email"
ON public.authorized_purchases FOR SELECT TO authenticated
USING (
  user_id = auth.uid()
  OR lower(email) = lower((SELECT u.email FROM auth.users u WHERE u.id = auth.uid()))
);

-- 5) daily_usage_limits: remove permissive client INSERT/UPDATE (RPC uses SECURITY DEFINER)
DO $$
DECLARE p record;
BEGIN
  FOR p IN SELECT policyname FROM pg_policies
    WHERE schemaname='public' AND tablename='daily_usage_limits' AND cmd IN ('INSERT','UPDATE')
  LOOP
    EXECUTE format('DROP POLICY %I ON public.daily_usage_limits', p.policyname);
  END LOOP;
END$$;

CREATE POLICY "Deny client writes on daily_usage_limits_insert"
ON public.daily_usage_limits FOR INSERT TO authenticated, anon
WITH CHECK (false);

CREATE POLICY "Deny client writes on daily_usage_limits_update"
ON public.daily_usage_limits FOR UPDATE TO authenticated, anon
USING (false) WITH CHECK (false);

-- 6) whatsapp_reminders_sent: explicit deny on client INSERT
DROP POLICY IF EXISTS "Deny client inserts on whatsapp_reminders_sent" ON public.whatsapp_reminders_sent;
CREATE POLICY "Deny client inserts on whatsapp_reminders_sent"
ON public.whatsapp_reminders_sent FOR INSERT TO authenticated, anon
WITH CHECK (false);
