
-- 1. Remove the permissive UPDATE policy on daily_usage_limits
DROP POLICY IF EXISTS "Users can update own usage" ON public.daily_usage_limits;

-- 2. Create a secure RPC to increment usage (SECURITY DEFINER so it bypasses RLS)
CREATE OR REPLACE FUNCTION public.increment_daily_usage(
  p_feature_key text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid;
  v_today date;
  v_current_count integer;
  v_result jsonb;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Use Brazil timezone for date
  v_today := (now() AT TIME ZONE 'America/Sao_Paulo')::date;

  -- Try to insert or update atomically
  INSERT INTO daily_usage_limits (user_id, feature_key, usage_date, usage_count, last_used_at)
  VALUES (v_user_id, p_feature_key, v_today, 1, now())
  ON CONFLICT (user_id, feature_key, usage_date)
  DO UPDATE SET
    usage_count = daily_usage_limits.usage_count + 1,
    last_used_at = now()
  RETURNING usage_count INTO v_current_count;

  v_result := jsonb_build_object('usage_count', v_current_count);
  RETURN v_result;
END;
$$;

-- 3. Add unique constraint needed for ON CONFLICT (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'daily_usage_limits_user_feature_date_unique'
  ) THEN
    ALTER TABLE public.daily_usage_limits
    ADD CONSTRAINT daily_usage_limits_user_feature_date_unique
    UNIQUE (user_id, feature_key, usage_date);
  END IF;
END $$;

-- 4. Fix product-images storage policies - restrict to admins
DROP POLICY IF EXISTS "Authenticated users can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete product images" ON storage.objects;

CREATE POLICY "Only admins can upload product images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'product-images'
    AND public.has_role(auth.uid(), 'admin'::public.app_role)
  );

CREATE POLICY "Only admins can delete product images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'product-images'
    AND public.has_role(auth.uid(), 'admin'::public.app_role)
  );
