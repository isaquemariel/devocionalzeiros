
UPDATE storage.buckets SET public = false WHERE id = 'aulas-arquivos';

DROP POLICY IF EXISTS "Public read aulas-arquivos" ON storage.objects;

-- Admins can read directly (for the admin panel)
CREATE POLICY "Admins read aulas-arquivos"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'aulas-arquivos' AND public.has_role(auth.uid(), 'admin'));
