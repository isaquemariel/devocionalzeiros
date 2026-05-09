
-- 1. Remove user direct SELECT on authorized_purchases (sensitive fields exposure)
DROP POLICY IF EXISTS "Users can view their own purchase by user_id" ON public.authorized_purchases;

-- 2. Cap achievement_claims.points_awarded to prevent self-award abuse
CREATE OR REPLACE FUNCTION public.validate_achievement_claim()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.points_awarded IS NULL OR NEW.points_awarded < 0 OR NEW.points_awarded > 500 THEN
    RAISE EXCEPTION 'Invalid points_awarded value';
  END IF;
  IF NEW.achievement_id IS NULL OR length(trim(NEW.achievement_id)) = 0 OR length(NEW.achievement_id) > 100 THEN
    RAISE EXCEPTION 'Invalid achievement_id';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_achievement_claim_trg ON public.achievement_claims;
CREATE TRIGGER validate_achievement_claim_trg
BEFORE INSERT OR UPDATE ON public.achievement_claims
FOR EACH ROW EXECUTE FUNCTION public.validate_achievement_claim();

-- 3. Fix mutable search_path on email queue helpers
ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public, pgmq;
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public, pgmq;
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public, pgmq;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public, pgmq;
