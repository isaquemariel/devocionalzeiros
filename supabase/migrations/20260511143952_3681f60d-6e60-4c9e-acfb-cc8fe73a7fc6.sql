CREATE TABLE IF NOT EXISTS public.admin_push_announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL,
  url text,
  is_active boolean NOT NULL DEFAULT true,
  schedule_type text NOT NULL DEFAULT 'now', -- 'now' | 'once' | 'recurring'
  scheduled_at timestamptz,
  recurrence_time_brt text, -- 'HH:MM' formato 24h em America/Sao_Paulo
  recurrence_days int[] DEFAULT NULL, -- 0..6 (dom..sáb), NULL = diário
  next_run_at timestamptz,
  last_sent_at timestamptz,
  send_count integer NOT NULL DEFAULT 0,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_push_announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view announcements"
  ON public.admin_push_announcements FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert announcements"
  ON public.admin_push_announcements FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update announcements"
  ON public.admin_push_announcements FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete announcements"
  ON public.admin_push_announcements FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER admin_push_announcements_updated_at
  BEFORE UPDATE ON public.admin_push_announcements
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_admin_push_announcements_next_run
  ON public.admin_push_announcements (next_run_at)
  WHERE is_active = true AND next_run_at IS NOT NULL;