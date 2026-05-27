GRANT SELECT ON public.aulas_cursos TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.aulas_cursos TO authenticated;
GRANT ALL ON public.aulas_cursos TO service_role;

GRANT SELECT ON public.aulas_modulos TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.aulas_modulos TO authenticated;
GRANT ALL ON public.aulas_modulos TO service_role;

GRANT SELECT ON public.aulas_aulas TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.aulas_aulas TO authenticated;
GRANT ALL ON public.aulas_aulas TO service_role;

GRANT SELECT ON public.aulas_arquivos TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.aulas_arquivos TO authenticated;
GRANT ALL ON public.aulas_arquivos TO service_role;

GRANT SELECT ON public.aulas_settings TO anon, authenticated;
GRANT ALL ON public.aulas_settings TO service_role;

GRANT ALL ON public.aulas_admins TO service_role;
GRANT ALL ON public.aulas_product_access TO service_role;
GRANT ALL ON public.aulas_sessions TO service_role;
GRANT ALL ON public.aulas_otp_codes TO service_role;