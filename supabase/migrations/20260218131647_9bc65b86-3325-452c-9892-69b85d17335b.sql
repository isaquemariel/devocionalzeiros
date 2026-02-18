
-- RPG Progress table: tracks user progress through Bible books/chapters
CREATE TABLE public.rpg_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  book_index INTEGER NOT NULL, -- 0-65 (Genesis to Revelation)
  chapter_number INTEGER NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE,
  reading_time_seconds INTEGER NOT NULL DEFAULT 0,
  quiz_correct INTEGER NOT NULL DEFAULT 0,
  quiz_total INTEGER NOT NULL DEFAULT 0,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, book_index, chapter_number)
);

-- RPG User Stats table: overall RPG stats per user
CREATE TABLE public.rpg_user_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  total_xp INTEGER NOT NULL DEFAULT 0,
  current_level INTEGER NOT NULL DEFAULT 1, -- 1-66
  current_stage INTEGER NOT NULL DEFAULT 1, -- current chapter within level
  streak_days INTEGER NOT NULL DEFAULT 0,
  last_played_at TIMESTAMP WITH TIME ZONE,
  locked_until TIMESTAMP WITH TIME ZONE, -- 24h lock on double fail
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.rpg_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rpg_user_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for rpg_progress
CREATE POLICY "Users can view own rpg progress" ON public.rpg_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own rpg progress" ON public.rpg_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own rpg progress" ON public.rpg_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own rpg progress" ON public.rpg_progress FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for rpg_user_stats
CREATE POLICY "Users can view own rpg stats" ON public.rpg_user_stats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own rpg stats" ON public.rpg_user_stats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own rpg stats" ON public.rpg_user_stats FOR UPDATE USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_rpg_progress_updated_at BEFORE UPDATE ON public.rpg_progress FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_rpg_user_stats_updated_at BEFORE UPDATE ON public.rpg_user_stats FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
