CREATE TABLE IF NOT EXISTS public.enoque_verse_explanations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chapter_number integer NOT NULL,
  verse_number integer NOT NULL,
  explanation text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (chapter_number, verse_number)
);

GRANT SELECT ON public.enoque_verse_explanations TO anon, authenticated;
GRANT ALL ON public.enoque_verse_explanations TO service_role;

ALTER TABLE public.enoque_verse_explanations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read enoque explanations"
ON public.enoque_verse_explanations FOR SELECT
USING (true);

CREATE POLICY "Service role only writes enoque explanations"
ON public.enoque_verse_explanations FOR INSERT
WITH CHECK (false);