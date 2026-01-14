-- Create table for caching verse studies to save AI tokens
CREATE TABLE public.verse_studies_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id TEXT NOT NULL,
  chapter_number INTEGER NOT NULL,
  verse_number INTEGER NOT NULL,
  verse_text TEXT NOT NULL,
  commentary TEXT NOT NULL,
  key_words JSONB DEFAULT '[]'::jsonb,
  cross_references TEXT[] DEFAULT '{}',
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (book_id, chapter_number, verse_number)
);

-- Enable Row Level Security
ALTER TABLE public.verse_studies_cache ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (cache is shared between all users)
CREATE POLICY "Anyone can read verse studies cache"
ON public.verse_studies_cache
FOR SELECT
USING (true);

-- Only authenticated users can insert (via edge function)
CREATE POLICY "Authenticated users can insert verse studies cache"
ON public.verse_studies_cache
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX idx_verse_studies_cache_lookup ON public.verse_studies_cache (book_id, chapter_number, verse_number);

-- Trigger for updating updated_at
CREATE TRIGGER update_verse_studies_cache_updated_at
BEFORE UPDATE ON public.verse_studies_cache
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();