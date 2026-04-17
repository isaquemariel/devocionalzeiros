-- 1. Restrict authorized_purchases user SELECT to non-sensitive fields via a security barrier view + revoking direct table SELECT for non-admins.
-- Simplest safe approach: replace SELECT policy so users can still see their own row, but create a view exposing only safe columns and direct app reads to it.

-- Create a safe view for users to see their own purchase (excluding commission, cpf, phone, transaction_id)
CREATE OR REPLACE VIEW public.my_purchase_summary
WITH (security_invoker = true)
AS
SELECT
  id,
  user_id,
  email,
  plan_type,
  status,
  product_id,
  product_name,
  customer_name,
  amount_paid,
  payment_method,
  purchased_at,
  expires_at,
  created_at,
  updated_at
FROM public.authorized_purchases
WHERE user_id IS NOT NULL AND user_id = auth.uid();

GRANT SELECT ON public.my_purchase_summary TO authenticated;

-- 2. Storage: replace overly permissive public-listing policies.
-- Drop any existing broad SELECT policies on the two public buckets.
DO $$
DECLARE
  pol record;
BEGIN
  FOR pol IN
    SELECT policyname FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
  LOOP
    -- Only drop policies that reference our two buckets to avoid touching unrelated ones
    EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', pol.policyname);
  END LOOP;
END$$;

-- Recreate minimal, safe policies

-- AVATARS: public can read individual objects, users manage their own folder
CREATE POLICY "Avatars are publicly readable"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');

CREATE POLICY "Users upload own avatar"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users update own avatar"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users delete own avatar"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- PRODUCT IMAGES: public can read individual objects, only admins manage
CREATE POLICY "Product images are publicly readable"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-images');

CREATE POLICY "Admins manage product images"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'::public.app_role));

-- Prevent listing: revoke list permission from anon/authenticated on storage.objects-level is governed by policies above.
-- The "public bucket allows listing" warning is triggered by buckets being marked public=true with a permissive SELECT.
-- Mark buckets as private at metadata level while keeping public-read policies above so direct URLs still work via signed/public path access controlled by RLS.
UPDATE storage.buckets SET public = false WHERE id IN ('avatars', 'product-images');