DROP POLICY IF EXISTS "Admins manage arquivos" ON public.aulas_arquivos;

CREATE POLICY "Admins insert arquivos"
ON public.aulas_arquivos
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins update arquivos"
ON public.aulas_arquivos
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins delete arquivos"
ON public.aulas_arquivos
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));