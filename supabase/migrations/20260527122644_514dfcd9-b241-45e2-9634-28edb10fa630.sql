
-- aulas_settings: admins manage; public can already read
GRANT SELECT, INSERT, UPDATE, DELETE ON public.aulas_settings TO authenticated;
GRANT ALL ON public.aulas_settings TO service_role;

DROP POLICY IF EXISTS "Admins manage aulas_settings" ON public.aulas_settings;
CREATE POLICY "Admins manage aulas_settings" ON public.aulas_settings
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- ensure singleton row exists
INSERT INTO public.aulas_settings (id, banner_enabled)
VALUES (1, false)
ON CONFLICT (id) DO NOTHING;

-- aulas_product_access
GRANT SELECT, INSERT, UPDATE, DELETE ON public.aulas_product_access TO authenticated;
GRANT ALL ON public.aulas_product_access TO service_role;

ALTER TABLE public.aulas_product_access ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins manage aulas_product_access" ON public.aulas_product_access;
CREATE POLICY "Admins manage aulas_product_access" ON public.aulas_product_access
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- unique constraint for upsert
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'aulas_product_access_email_curso_unique'
  ) THEN
    ALTER TABLE public.aulas_product_access
      ADD CONSTRAINT aulas_product_access_email_curso_unique UNIQUE (email, curso_id);
  END IF;
END $$;

-- aulas_admins
GRANT SELECT, INSERT, UPDATE, DELETE ON public.aulas_admins TO authenticated;
GRANT ALL ON public.aulas_admins TO service_role;

ALTER TABLE public.aulas_admins ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins manage aulas_admins" ON public.aulas_admins;
CREATE POLICY "Admins manage aulas_admins" ON public.aulas_admins
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- seed the primary admin email (idempotent)
INSERT INTO public.aulas_admins (email)
VALUES ('devocionalzeiro@gmail.com')
ON CONFLICT DO NOTHING;
