-- Create daily_logins table
CREATE TABLE public.daily_logins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  login_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, login_date)
);

-- Enable RLS
ALTER TABLE public.daily_logins ENABLE ROW LEVEL SECURITY;

-- Create policies for daily_logins
CREATE POLICY "Users can view their own logins"
ON public.daily_logins
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own logins"
ON public.daily_logins
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create quiz_attempts table if not exists
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  book_name TEXT NOT NULL,
  chapter_number INTEGER NOT NULL,
  question_index INTEGER NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT false,
  points_earned INTEGER NOT NULL DEFAULT 0,
  quiz_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for quiz_attempts
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate
DROP POLICY IF EXISTS "Users can view their own attempts" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Users can insert their own attempts" ON public.quiz_attempts;

CREATE POLICY "Users can view their own attempts"
ON public.quiz_attempts
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own attempts"
ON public.quiz_attempts
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create quiz questions cache table if not exists
CREATE TABLE IF NOT EXISTS public.quiz_questions_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  book_name TEXT NOT NULL,
  chapter_number INTEGER NOT NULL,
  questions JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(book_name, chapter_number)
);

-- Enable RLS for cache (readable by all authenticated)
ALTER TABLE public.quiz_questions_cache ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can read cache" ON public.quiz_questions_cache;
DROP POLICY IF EXISTS "Authenticated users can insert cache" ON public.quiz_questions_cache;

CREATE POLICY "Authenticated users can read cache"
ON public.quiz_questions_cache
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert cache"
ON public.quiz_questions_cache
FOR INSERT
TO authenticated
WITH CHECK (true);