CREATE TABLE IF NOT EXISTS public.enoque_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  youtube_id TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.enoque_videos TO anon, authenticated;
GRANT ALL ON public.enoque_videos TO service_role;

ALTER TABLE public.enoque_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read enoque videos"
ON public.enoque_videos
FOR SELECT
USING (true);

CREATE TRIGGER update_enoque_videos_updated_at
BEFORE UPDATE ON public.enoque_videos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();