CREATE POLICY "Public can read aulas covers"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'aulas-arquivos' AND (storage.foldername(name))[1] = 'covers');