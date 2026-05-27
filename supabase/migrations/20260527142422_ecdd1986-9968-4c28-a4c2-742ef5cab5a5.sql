INSERT INTO storage.buckets (id, name, public) VALUES ('enoque-audio', 'enoque-audio', true) ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY "Public read enoque-audio" ON storage.objects FOR SELECT USING (bucket_id = 'enoque-audio');
CREATE POLICY "Service role write enoque-audio" ON storage.objects FOR INSERT TO service_role WITH CHECK (bucket_id = 'enoque-audio');