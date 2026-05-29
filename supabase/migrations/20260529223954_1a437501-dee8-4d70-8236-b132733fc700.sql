-- Revoke column-level SELECT on file_url from anon/authenticated so it can never
-- be read via the Data API (even by admins). Only service_role (edge functions) can read it.
REVOKE SELECT (file_url) ON public.aulas_arquivos FROM anon, authenticated, PUBLIC;

-- Re-grant SELECT on the safe columns to authenticated (in case any policy is added later)
GRANT SELECT (id, aula_id, title, file_size_kb, order_index, created_at)
  ON public.aulas_arquivos TO authenticated;

-- Ensure service_role retains full access
GRANT ALL ON public.aulas_arquivos TO service_role;