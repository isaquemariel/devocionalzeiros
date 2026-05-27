
-- =====================
-- AULAS — CURSOS
-- =====================
CREATE TABLE public.aulas_cursos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  cover_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.aulas_cursos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.aulas_cursos TO authenticated;
GRANT ALL ON public.aulas_cursos TO service_role;

ALTER TABLE public.aulas_cursos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published cursos"
ON public.aulas_cursos FOR SELECT
TO anon, authenticated
USING (is_published = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage cursos"
ON public.aulas_cursos FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_aulas_cursos_updated_at
BEFORE UPDATE ON public.aulas_cursos
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =====================
-- AULAS — MÓDULOS
-- =====================
CREATE TABLE public.aulas_modulos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  curso_id UUID NOT NULL REFERENCES public.aulas_cursos(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  cover_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_aulas_modulos_curso ON public.aulas_modulos(curso_id);

GRANT SELECT ON public.aulas_modulos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.aulas_modulos TO authenticated;
GRANT ALL ON public.aulas_modulos TO service_role;

ALTER TABLE public.aulas_modulos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view modulos of published cursos"
ON public.aulas_modulos FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.aulas_cursos c
    WHERE c.id = curso_id AND (c.is_published = true OR public.has_role(auth.uid(), 'admin'))
  )
);

CREATE POLICY "Admins manage modulos"
ON public.aulas_modulos FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_aulas_modulos_updated_at
BEFORE UPDATE ON public.aulas_modulos
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =====================
-- AULAS — AULAS
-- =====================
CREATE TABLE public.aulas_aulas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  modulo_id UUID NOT NULL REFERENCES public.aulas_modulos(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  youtube_url TEXT,
  duration_minutes INTEGER,
  cover_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_aulas_aulas_modulo ON public.aulas_aulas(modulo_id);

GRANT SELECT ON public.aulas_aulas TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.aulas_aulas TO authenticated;
GRANT ALL ON public.aulas_aulas TO service_role;

ALTER TABLE public.aulas_aulas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published aulas of published cursos"
ON public.aulas_aulas FOR SELECT
TO anon, authenticated
USING (
  (is_published = true AND EXISTS (
    SELECT 1 FROM public.aulas_modulos m
    JOIN public.aulas_cursos c ON c.id = m.curso_id
    WHERE m.id = modulo_id AND c.is_published = true
  ))
  OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins manage aulas"
ON public.aulas_aulas FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_aulas_aulas_updated_at
BEFORE UPDATE ON public.aulas_aulas
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =====================
-- AULAS — ARQUIVOS
-- =====================
CREATE TABLE public.aulas_arquivos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  aula_id UUID NOT NULL REFERENCES public.aulas_aulas(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size_kb INTEGER,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_aulas_arquivos_aula ON public.aulas_arquivos(aula_id);

GRANT SELECT ON public.aulas_arquivos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.aulas_arquivos TO authenticated;
GRANT ALL ON public.aulas_arquivos TO service_role;

ALTER TABLE public.aulas_arquivos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view arquivos of published aulas"
ON public.aulas_arquivos FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.aulas_aulas a
    JOIN public.aulas_modulos m ON m.id = a.modulo_id
    JOIN public.aulas_cursos c ON c.id = m.curso_id
    WHERE a.id = aula_id
      AND ((a.is_published = true AND c.is_published = true) OR public.has_role(auth.uid(), 'admin'))
  )
);

CREATE POLICY "Admins manage arquivos"
ON public.aulas_arquivos FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =====================
-- STORAGE BUCKET
-- =====================
INSERT INTO storage.buckets (id, name, public)
VALUES ('aulas-arquivos', 'aulas-arquivos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read aulas-arquivos"
ON storage.objects FOR SELECT
USING (bucket_id = 'aulas-arquivos');

CREATE POLICY "Admins upload aulas-arquivos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'aulas-arquivos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update aulas-arquivos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'aulas-arquivos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete aulas-arquivos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'aulas-arquivos' AND public.has_role(auth.uid(), 'admin'));
