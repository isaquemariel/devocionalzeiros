-- Create table to cache generated verse devotionals
CREATE TABLE public.verse_devotionals_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id TEXT NOT NULL,
  chapter_number INTEGER NOT NULL,
  verse_number INTEGER NOT NULL,
  verse_text TEXT NOT NULL,
  devotional_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(book_id, chapter_number, verse_number)
);

-- Enable RLS
ALTER TABLE public.verse_devotionals_cache ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read cached devotionals
CREATE POLICY "Anyone can read cached devotionals"
ON public.verse_devotionals_cache
FOR SELECT
USING (true);

-- Allow authenticated users to insert cached devotionals
CREATE POLICY "Authenticated users can insert cached devotionals"
ON public.verse_devotionals_cache
FOR INSERT
WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX idx_verse_devotionals_cache_lookup 
ON public.verse_devotionals_cache (book_id, chapter_number, verse_number);

-- Create trigger for updated_at
CREATE TRIGGER update_verse_devotionals_cache_updated_at
BEFORE UPDATE ON public.verse_devotionals_cache
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();