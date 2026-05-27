
INSERT INTO storage.buckets (id, name, public)
VALUES ('aulas-covers', 'aulas-covers', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public read aulas-covers" ON storage.objects;
CREATE POLICY "Public read aulas-covers"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'aulas-covers');
