-- Create table for user verse favorites
CREATE TABLE public.verse_favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  book_id TEXT NOT NULL,
  chapter_number INTEGER NOT NULL,
  verse_number INTEGER NOT NULL,
  verse_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, book_id, chapter_number, verse_number)
);

-- Create table for user verse highlights
CREATE TABLE public.verse_highlights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  book_id TEXT NOT NULL,
  chapter_number INTEGER NOT NULL,
  verse_number INTEGER NOT NULL,
  highlight_color TEXT NOT NULL DEFAULT 'yellow',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, book_id, chapter_number, verse_number)
);

-- Enable RLS
ALTER TABLE public.verse_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verse_highlights ENABLE ROW LEVEL SECURITY;

-- Policies for verse_favorites
CREATE POLICY "Users can view their own favorites"
ON public.verse_favorites FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own favorites"
ON public.verse_favorites FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
ON public.verse_favorites FOR DELETE
USING (auth.uid() = user_id);

-- Policies for verse_highlights
CREATE POLICY "Users can view their own highlights"
ON public.verse_highlights FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own highlights"
ON public.verse_highlights FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own highlights"
ON public.verse_highlights FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own highlights"
ON public.verse_highlights FOR DELETE
USING (auth.uid() = user_id);

-- Trigger for updated_at on highlights
CREATE TRIGGER update_verse_highlights_updated_at
BEFORE UPDATE ON public.verse_highlights
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();