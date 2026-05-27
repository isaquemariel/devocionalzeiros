
-- 1. aulas_cursos: novos campos
ALTER TABLE public.aulas_cursos
  ADD COLUMN IF NOT EXISTS kiwify_product_id text,
  ADD COLUMN IF NOT EXISTS purchase_url text;

-- 2. aulas_settings (singleton row id=1)
CREATE TABLE IF NOT EXISTS public.aulas_settings (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  banner_enabled boolean NOT NULL DEFAULT false,
  banner_image_url text,
  banner_curso_id uuid REFERENCES public.aulas_cursos(id) ON DELETE SET NULL,
  banner_title_override text,
  banner_subtitle_override text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.aulas_settings TO anon, authenticated;
GRANT ALL ON public.aulas_settings TO service_role;

ALTER TABLE public.aulas_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read aulas_settings"
ON public.aulas_settings FOR SELECT
TO anon, authenticated
USING (true);

-- seed singleton
INSERT INTO public.aulas_settings (id) VALUES (1) ON CONFLICT DO NOTHING;

-- 3. aulas_admins
CREATE TABLE IF NOT EXISTS public.aulas_admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.aulas_admins TO service_role;
ALTER TABLE public.aulas_admins ENABLE ROW LEVEL SECURITY;
-- no public policies: only service_role via edge functions

INSERT INTO public.aulas_admins (email) VALUES ('devocionalzeiro@gmail.com') ON CONFLICT DO NOTHING;

-- 4. aulas_product_access
CREATE TABLE IF NOT EXISTS public.aulas_product_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  curso_id uuid NOT NULL REFERENCES public.aulas_cursos(id) ON DELETE CASCADE,
  source text NOT NULL DEFAULT 'manual_admin',
  kiwify_product_id text,
  granted_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (email, curso_id)
);

CREATE INDEX IF NOT EXISTS aulas_product_access_email_idx ON public.aulas_product_access (email);

GRANT ALL ON public.aulas_product_access TO service_role;
ALTER TABLE public.aulas_product_access ENABLE ROW LEVEL SECURITY;
-- no public policies: only service_role via edge functions

-- 5. aulas_otp_codes
CREATE TABLE IF NOT EXISTS public.aulas_otp_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  code_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  consumed_at timestamptz,
  attempts integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS aulas_otp_codes_email_idx ON public.aulas_otp_codes (email, expires_at DESC);

GRANT ALL ON public.aulas_otp_codes TO service_role;
ALTER TABLE public.aulas_otp_codes ENABLE ROW LEVEL SECURITY;
-- no public policies

-- 6. aulas_sessions
CREATE TABLE IF NOT EXISTS public.aulas_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  token_hash text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  user_agent text,
  ip text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS aulas_sessions_token_idx ON public.aulas_sessions (token_hash);

GRANT ALL ON public.aulas_sessions TO service_role;
ALTER TABLE public.aulas_sessions ENABLE ROW LEVEL SECURITY;
-- no public policies
