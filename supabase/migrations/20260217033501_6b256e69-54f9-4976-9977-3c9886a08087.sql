
-- Add difficulty column to quiz_questions_cache
ALTER TABLE public.quiz_questions_cache ADD COLUMN difficulty text NOT NULL DEFAULT 'medium';

-- Drop old unique constraint and create new one with difficulty
ALTER TABLE public.quiz_questions_cache DROP CONSTRAINT IF EXISTS quiz_questions_cache_book_name_chapter_number_key;
ALTER TABLE public.quiz_questions_cache ADD CONSTRAINT quiz_questions_cache_book_chapter_difficulty_key UNIQUE (book_name, chapter_number, difficulty);

-- Clear all existing cached questions so they regenerate with the new prompt
DELETE FROM public.quiz_questions_cache;
