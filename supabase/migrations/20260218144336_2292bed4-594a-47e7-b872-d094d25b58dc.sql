
-- Cache for RPG quiz questions per chapter (shared across users)
CREATE TABLE public.rpg_quiz_cache (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  book_name text NOT NULL,
  chapter_number integer NOT NULL,
  question_set integer NOT NULL DEFAULT 1, -- allows multiple sets per chapter
  questions jsonb NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX idx_rpg_quiz_cache_unique ON public.rpg_quiz_cache (book_name, chapter_number, question_set);

ALTER TABLE public.rpg_quiz_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read rpg quiz cache" ON public.rpg_quiz_cache FOR SELECT USING (true);
CREATE POLICY "Service role only can insert rpg quiz cache" ON public.rpg_quiz_cache FOR INSERT WITH CHECK (false);

-- Track which question sets a user has already attempted per chapter
CREATE TABLE public.rpg_quiz_attempts_tracker (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  book_name text NOT NULL,
  chapter_number integer NOT NULL,
  question_set_used integer NOT NULL,
  failed boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_rpg_quiz_tracker_user ON public.rpg_quiz_attempts_tracker (user_id, book_name, chapter_number);

ALTER TABLE public.rpg_quiz_attempts_tracker ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own rpg quiz tracker" ON public.rpg_quiz_attempts_tracker FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own rpg quiz tracker" ON public.rpg_quiz_attempts_tracker FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own rpg quiz tracker" ON public.rpg_quiz_attempts_tracker FOR DELETE USING (auth.uid() = user_id);
