-- Add unique constraint to reading_progress to prevent duplicate entries
-- This ensures each user can only have one record per book/chapter combination
ALTER TABLE public.reading_progress 
ADD CONSTRAINT reading_progress_user_book_chapter_unique 
UNIQUE (user_id, book_name, chapter_number);