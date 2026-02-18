-- Add unique constraint for RPG progress upsert
ALTER TABLE public.rpg_progress
ADD CONSTRAINT rpg_progress_user_book_chapter_unique 
UNIQUE (user_id, book_index, chapter_number);

-- Add unique constraint for reading_progress upsert (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'reading_progress_user_book_chapter_unique'
  ) THEN
    ALTER TABLE public.reading_progress
    ADD CONSTRAINT reading_progress_user_book_chapter_unique 
    UNIQUE (user_id, book_name, chapter_number);
  END IF;
END $$;