
CREATE TABLE IF NOT EXISTS public.achievement_catalog (
  achievement_id text PRIMARY KEY,
  points integer NOT NULL CHECK (points >= 0 AND points <= 100),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.achievement_catalog ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Catalog readable by all" ON public.achievement_catalog;
CREATE POLICY "Catalog readable by all" ON public.achievement_catalog FOR SELECT USING (true);

INSERT INTO public.achievement_catalog (achievement_id, points) VALUES
  ('first_reading',5),('reader_10',5),('reader_50',10),('reader_100',15),('reader_260',20),
  ('streak_3',5),('streak_7',10),('streak_30',15),('streak_100',20),
  ('quiz_first',5),('quiz_10',10),('quiz_50',15),('quiz_100',20),
  ('quiz_hard_10',10),('quiz_hard_50',15),('quiz_hard_100',20),
  ('quiz_total_100',10),('quiz_total_500',20),
  ('quiz_streak_3',5),('quiz_streak_5',10),('quiz_streak_7',15),('quiz_streak_10',20),
  ('devocional_first',5),('devocional_7',10),('devocional_30',15),
  ('login_10',5),('login_50',10),('login_100',20),
  ('rpg_first',5),('rpg_10',10),('rpg_50',15),('rpg_100',20),
  ('rpg_perfect_5',10),('rpg_perfect_25',15),
  ('rpg_xp_100',10),('rpg_xp_500',20),
  ('community_first_prayer',5),('community_prayer_10',10),
  ('community_first_thanks',5),('community_thanks_10',10),('community_thanks_50',15),
  ('community_answered_1',10),('community_answered_10',15)
ON CONFLICT (achievement_id) DO UPDATE SET points = EXCLUDED.points, updated_at = now();

CREATE OR REPLACE FUNCTION public.enforce_achievement_points()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_pts integer;
BEGIN
  SELECT points INTO v_pts FROM public.achievement_catalog WHERE achievement_id = NEW.achievement_id;
  IF v_pts IS NULL THEN
    RAISE EXCEPTION 'Unknown achievement_id: %', NEW.achievement_id USING ERRCODE = 'P0001';
  END IF;
  NEW.points_awarded := v_pts;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enforce_achievement_points_trg ON public.achievement_claims;
CREATE TRIGGER enforce_achievement_points_trg
  BEFORE INSERT ON public.achievement_claims
  FOR EACH ROW EXECUTE FUNCTION public.enforce_achievement_points();
