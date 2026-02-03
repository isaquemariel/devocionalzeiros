-- Add streak tracking to quiz attempts
ALTER TABLE public.quiz_attempts 
ADD COLUMN IF NOT EXISTS streak_count INTEGER DEFAULT 0;