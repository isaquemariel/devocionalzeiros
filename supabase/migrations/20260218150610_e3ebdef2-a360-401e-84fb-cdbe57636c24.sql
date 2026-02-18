
-- Add unique constraint so upsert works for caching
ALTER TABLE public.rpg_summaries_cache
ADD CONSTRAINT rpg_summaries_cache_unique_key UNIQUE (summary_type, book_name, chapter_number);
