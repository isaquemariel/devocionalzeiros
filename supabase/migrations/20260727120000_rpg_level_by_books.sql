-- ============================================================================
-- RPG: NÍVEL = livros da Bíblia concluídos (0–66); admin sempre 66.
-- Antes o nível era XP/100+1 (sem teto). Agora começa em 0 e sobe 1 por livro
-- concluído, até o teto 66 (Bíblia inteira). Já aplicado em produção.
-- ============================================================================

-- Capítulos por livro (fonte p/ decidir "livro concluído")
CREATE TABLE IF NOT EXISTS public.rpg_book_meta (
  book_index int PRIMARY KEY,
  total_chapters int NOT NULL
);
INSERT INTO public.rpg_book_meta (book_index, total_chapters) VALUES
(0,50),(1,40),(2,27),(3,36),(4,34),(5,24),(6,21),(7,4),(8,31),(9,24),
(10,22),(11,25),(12,29),(13,36),(14,10),(15,13),(16,10),(17,42),(18,150),(19,31),
(20,12),(21,8),(22,66),(23,52),(24,5),(25,48),(26,12),(27,14),(28,3),(29,9),
(30,1),(31,4),(32,7),(33,3),(34,3),(35,3),(36,2),(37,14),(38,4),(39,28),
(40,16),(41,24),(42,21),(43,28),(44,16),(45,16),(46,13),(47,6),(48,6),(49,4),
(50,4),(51,5),(52,3),(53,6),(54,4),(55,3),(56,1),(57,13),(58,5),(59,5),
(60,3),(61,5),(62,1),(63,1),(64,1),(65,22)
ON CONFLICT (book_index) DO UPDATE SET total_chapters = EXCLUDED.total_chapters;

ALTER TABLE public.rpg_book_meta ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "read_book_meta" ON public.rpg_book_meta;
CREATE POLICY "read_book_meta" ON public.rpg_book_meta FOR SELECT USING (true);

-- Controle do pop-up de comemoração (último nível já comemorado)
ALTER TABLE public.rpg_user_stats ADD COLUMN IF NOT EXISTS celebrated_level int NOT NULL DEFAULT 0;

-- Trigger de integridade: recalcula XP/estágio e o NÍVEL a partir do progresso
-- real (à prova de trapaça). Nível = nº de livros concluídos (teto 66); admin=66.
CREATE OR REPLACE FUNCTION public.enforce_rpg_user_stats()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_xp integer; v_completed integer; v_books integer; v_max_streak integer := 365;
BEGIN
  SELECT COALESCE(SUM(10 + quiz_correct * 5), 0)::int,
         COALESCE(COUNT(*) FILTER (WHERE is_completed), 0)::int
    INTO v_xp, v_completed
  FROM public.rpg_progress WHERE user_id = NEW.user_id;

  SELECT COUNT(*)::int INTO v_books FROM (
    SELECT rp.book_index
    FROM public.rpg_progress rp
    JOIN public.rpg_book_meta bm ON bm.book_index = rp.book_index
    WHERE rp.user_id = NEW.user_id AND rp.is_completed = true
    GROUP BY rp.book_index, bm.total_chapters
    HAVING COUNT(DISTINCT rp.chapter_number) >= bm.total_chapters
  ) done;

  NEW.total_xp := v_xp;
  NEW.current_stage := GREATEST(1, v_completed + 1);

  IF public.has_role(NEW.user_id, 'admin') THEN
    NEW.current_level := 66;
  ELSE
    NEW.current_level := LEAST(66, GREATEST(0, v_books));
  END IF;

  IF TG_OP = 'INSERT' THEN
    NEW.streak_days := COALESCE(NEW.streak_days, 0);
    IF NEW.streak_days < 0 OR NEW.streak_days > v_max_streak THEN NEW.streak_days := 0; END IF;
  ELSE
    IF NEW.streak_days IS NULL OR NEW.streak_days < 0 THEN NEW.streak_days := 0; END IF;
    IF NEW.streak_days > v_max_streak THEN NEW.streak_days := v_max_streak; END IF;
    IF NEW.streak_days <> 0 AND NEW.streak_days > COALESCE(OLD.streak_days, 0) + 1 THEN
      NEW.streak_days := COALESCE(OLD.streak_days, 0) + 1;
    END IF;
  END IF;

  NEW.locked_until := NULL;
  RETURN NEW;
END; $$;

-- Backfill (executado em produção): recalcula os níveis de todos e alinha o
-- "já comemorado" ao nível atual, para não disparar pop-up retroativo.
--   UPDATE public.rpg_user_stats SET last_played_at = last_played_at;
--   UPDATE public.rpg_user_stats SET celebrated_level = current_level;
