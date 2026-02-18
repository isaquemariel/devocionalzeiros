
CREATE TABLE public.rpg_summaries_cache (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  summary_type text NOT NULL, -- 'book' or 'chapter'
  book_name text NOT NULL,
  chapter_number integer, -- null for book summaries
  summary_data jsonb NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Unique constraint for lookups
CREATE UNIQUE INDEX idx_rpg_summaries_unique ON public.rpg_summaries_cache (summary_type, book_name, COALESCE(chapter_number, 0));

-- Enable RLS
ALTER TABLE public.rpg_summaries_cache ENABLE ROW LEVEL SECURITY;

-- Anyone can read cache
CREATE POLICY "Anyone can read rpg summaries cache" ON public.rpg_summaries_cache FOR SELECT USING (true);

-- Only service role can insert (edge function uses service role)
CREATE POLICY "Service role only can insert rpg summaries" ON public.rpg_summaries_cache FOR INSERT WITH CHECK (false);

-- Trigger for updated_at
CREATE TRIGGER update_rpg_summaries_cache_updated_at
BEFORE UPDATE ON public.rpg_summaries_cache
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
