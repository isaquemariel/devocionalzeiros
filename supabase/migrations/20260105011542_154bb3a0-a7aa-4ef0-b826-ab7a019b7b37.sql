-- Create table to cache chapter explanations
CREATE TABLE public.chapter_explanations_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  book_name TEXT NOT NULL,
  chapter_number INTEGER NOT NULL,
  explanation TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(book_name, chapter_number)
);

-- Enable RLS
ALTER TABLE public.chapter_explanations_cache ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all authenticated users to read cache
CREATE POLICY "Anyone can read chapter explanations cache"
ON public.chapter_explanations_cache
FOR SELECT
USING (true);

-- Create policy to allow authenticated users to insert cache entries
CREATE POLICY "Authenticated users can insert cache entries"
ON public.chapter_explanations_cache
FOR INSERT
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_chapter_explanations_cache_updated_at
BEFORE UPDATE ON public.chapter_explanations_cache
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();