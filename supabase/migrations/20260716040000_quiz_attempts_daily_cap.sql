-- Q4 (ranking integrity): quiz_attempts is client-inserted with is_correct set by
-- the client (per-row points are already clamped to 0-8 by enforce_quiz_attempt_points,
-- and rejected when is_correct<>true). But nothing bounded the NUMBER of attempts
-- per day, so a user could loop-insert "correct" rows to farm quiz_points.
-- Add a generous per-user daily cap. Legit heavy users (gold, all quiz modes) stay
-- well under 100/day; 200 is a safe ceiling. Applied live.
CREATE OR REPLACE FUNCTION public.enforce_quiz_attempt_daily_cap()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE cnt integer;
BEGIN
  SELECT count(*) INTO cnt FROM quiz_attempts
    WHERE user_id = NEW.user_id AND quiz_date = NEW.quiz_date;
  IF cnt >= 200 THEN
    RAISE EXCEPTION 'Daily quiz attempt cap reached' USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS enforce_quiz_attempt_daily_cap_trg ON public.quiz_attempts;
CREATE TRIGGER enforce_quiz_attempt_daily_cap_trg
  BEFORE INSERT ON public.quiz_attempts
  FOR EACH ROW EXECUTE FUNCTION public.enforce_quiz_attempt_daily_cap();
