-- Table to store FCM/APNs tokens from native mobile devices
CREATE TABLE public.native_push_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('ios', 'android')),
  device_id TEXT,
  app_version TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (token)
);

CREATE INDEX idx_native_push_tokens_user ON public.native_push_tokens(user_id);
CREATE INDEX idx_native_push_tokens_platform ON public.native_push_tokens(platform);

ALTER TABLE public.native_push_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own native tokens select"
  ON public.native_push_tokens FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users manage own native tokens insert"
  ON public.native_push_tokens FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users manage own native tokens update"
  ON public.native_push_tokens FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users manage own native tokens delete"
  ON public.native_push_tokens FOR DELETE
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_native_push_tokens_updated_at
  BEFORE UPDATE ON public.native_push_tokens
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();