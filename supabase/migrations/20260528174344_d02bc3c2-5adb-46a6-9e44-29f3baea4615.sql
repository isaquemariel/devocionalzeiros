DROP POLICY IF EXISTS "Public can view arquivos of published aulas" ON public.aulas_arquivos;
REVOKE SELECT ON public.aulas_arquivos FROM anon, authenticated;